import Razorpay from "razorpay";
import crypto from "crypto";
import prisma from "../prismaClient.js";

/**
 * 🔒 UI → DB plan mapping (PLAN IS FIXED)
 */
const PLAN_TYPE_MAP = {
  STARTER: "ONE_MONTH",
  GROWTH: "THREE_MONTH",
  PRO: "SIX_MONTH",
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

/**
 * Helper: get membership end date
 */
const getMembershipEndDate = (planType) => {
  const daysMap = {
    ONE_MONTH: 30,
    THREE_MONTH: 90,
    SIX_MONTH: 180,
  };

  const days = daysMap[planType];
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};

/**
 * =========================
 * CREATE ORDER (NO AUTH)
 * =========================
 */
export const createOrder = async (req, res) => {
  console.log("\n🟡 CREATE ORDER HIT");
  console.log("📥 Body:", req.body);

  try {
    const { email, amount, planType, referralCode } = req.body;

    // 1️⃣ Basic validation
    if (!email || !planType || amount == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const dbPlanType = PLAN_TYPE_MAP[planType];
    if (!dbPlanType) {
      return res.status(400).json({ error: "Invalid plan type" });
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // 2️⃣ Idempotency (reuse pending payment)
    const existingPayment = await prisma.payment.findFirst({
      where: {
        email,
        planType: dbPlanType,
        status: "PENDING",
      },
    });

    if (existingPayment) {
      return res.json({
        orderId: existingPayment.orderId,
        amountInPaise: Math.round(existingPayment.amount * 100),
        key: process.env.RAZORPAY_KEY_ID,
      });
    }

    // 3️⃣ Create Razorpay order
    const amountInPaise = Math.round(numericAmount * 100);
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `hb_${Date.now()}`,
    });

    // 4️⃣ Save payment (PENDING)
    await prisma.payment.create({
      data: {
        orderId: order.id,
        amount: numericAmount,
        planType: dbPlanType,
        email,
        referralCode: referralCode || null,
        referralApplied: Boolean(referralCode),
        status: "PENDING",
      },
    });

    return res.json({
      orderId: order.id,
      amountInPaise: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("🔥 CREATE ORDER ERROR:", err);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

/**
 * =========================
 * VERIFY PAYMENT (NO AUTH)
 * =========================
 */
export const verifyPayment = async (req, res) => {
  console.log("\n🟢 VERIFY PAYMENT HIT");
  console.log("📥 Body:", req.body);

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    // 1️⃣ Fetch payment
    const payment = await prisma.payment.findUnique({
      where: { orderId: razorpay_order_id },
    });

    if (!payment) {
      return res.status(404).json({ success: false });
    }

    // 2️⃣ Idempotency
    if (payment.status === "SUCCESS") {
      return res.json({ success: true });
    }

    // 3️⃣ Verify Razorpay signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED" },
      });

      return res.status(400).json({ success: false });
    }

    // 4️⃣ SUCCESS → update payment + activate membership (atomic)
    await prisma.$transaction(async (tx) => {
      // update payment
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: "SUCCESS",
        },
      });

      // activate membership
      await tx.membershipApplication.update({
        where: { email: payment.email },
        data: {
          paymentStatus: "SUCCESS",
          paidAt: new Date(),
          planType: payment.planType,
          membershipStart: new Date(),
          membershipEnd: getMembershipEndDate(payment.planType),
          status: "ACTIVE",
        },
      });
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("🔥 VERIFY PAYMENT ERROR:", err);
    return res.status(500).json({ success: false });
  }
};
