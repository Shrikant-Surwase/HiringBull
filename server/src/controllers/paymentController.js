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
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    const dbPlanType = PLAN_TYPE_MAP[planType];
    if (!dbPlanType) {
      console.log("❌ Invalid planType:", planType);
      return res.status(400).json({ error: "Invalid plan type" });
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      console.log("❌ Invalid amount:", amount);
      return res.status(400).json({ error: "Invalid amount" });
    }

    console.log("✅ Parsed values:", {
      email,
      numericAmount,
      planType,
      dbPlanType,
      referralCode,
    });

    // 2️⃣ Idempotency check
    console.log("🔍 Checking existing PENDING payment...");
    const existingPayment = await prisma.payment.findFirst({
      where: {
        referredByEmail: email,
        planType: dbPlanType,
        status: "PENDING",
      },
    });

    if (existingPayment) {
      console.log("♻️ Reusing existing order:", existingPayment.orderId);
      return res.json({
        orderId: existingPayment.orderId,
        amountInPaise: Math.round(existingPayment.amount * 100),
        key: process.env.RAZORPAY_KEY_ID,
      });
    }

    // 3️⃣ Create Razorpay order (PAISE)
    const amountInPaise = Math.round(numericAmount * 100);
    console.log("🧾 Creating Razorpay order for:", amountInPaise, "paise");

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `hb_${Date.now()}`,
    });

    console.log("✅ Razorpay order created:", order.id);

    // 4️⃣ Save to DB (RUPEES)
    await prisma.payment.create({
      data: {
        orderId: order.id,
        amount: numericAmount, // RUPEES
        planType: dbPlanType,
        referredByEmail: email,
        referralCode: referralCode || null,
        referralApplied: Boolean(referralCode),
        status: "PENDING",
      },
    });

    console.log("💾 Payment saved to DB (PENDING)");

    return res.json({
      orderId: order.id,
      amountInPaise: order.amount, // Razorpay expects paise
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

    // 1️⃣ Validate body
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      console.log("❌ Missing Razorpay fields");
      return res.status(400).json({ success: false });
    }

    // 2️⃣ Fetch payment from DB
    console.log("🔍 Fetching payment for orderId:", razorpay_order_id);
    const payment = await prisma.payment.findFirst({
      where: { orderId: razorpay_order_id },
    });

    if (!payment) {
      console.log("❌ Payment not found in DB");
      return res.status(404).json({ success: false });
    }

    console.log("📄 Payment found:", {
      id: payment.id,
      status: payment.status,
      amount: payment.amount,
    });

    // 3️⃣ Idempotency
    if (payment.status === "SUCCESS") {
      console.log("♻️ Payment already SUCCESS");
      return res.json({ success: true });
    }

    // 4️⃣ Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    console.log("🔐 Expected signature:", expectedSignature);
    console.log("🔐 Received signature:", razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
      console.log("❌ Signature mismatch — marking FAILED");

      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED" },
      });

      return res.status(400).json({ success: false });
    }

    // 5️⃣ Mark SUCCESS
    console.log("✅ Signature verified — marking SUCCESS");

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: "SUCCESS",
      },
    });

    console.log("🎉 Payment marked SUCCESS");

    return res.json({ success: true });
  } catch (err) {
    console.error("🔥 VERIFY PAYMENT ERROR:", err);
    return res.status(500).json({ success: false });
  }
};
