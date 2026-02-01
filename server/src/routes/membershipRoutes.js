import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

/**
 * POST /api/membership
 * Create membership application (pre-payment intent)
 */
router.post("/", async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      social_profile,
      reason,
    } = req.body;

    if (!full_name || !email || !social_profile || !reason) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    const application = await prisma.membershipApplication.create({
      data: {
        full_name,
        email,
        phone: phone || null,
        social_profile,
        reason,
      },
    });

    return res.status(201).json({
      status: "ok",
      data: application,
    });
  } catch (err) {
    // Unique email constraint
    if (err.code === "P2002") {
      return res.status(409).json({
        status: "error",
        message: "Membership application already exists for this email",
      });
    }

    console.error("❌ Create membership error:", err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

/**
 * GET /api/membership/:email
 * Fetch full membership record by email
 */
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const membership = await prisma.membershipApplication.findUnique({
      where: { email },
    });

    if (!membership) {
      return res.status(404).json({
        status: "error",
        message: "Membership not found",
      });
    }

    return res.json({
      status: "ok",
      data: membership,
    });
  } catch (err) {
    console.error("❌ Fetch membership error:", err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

/**
 * GET /api/membership/active/:email
 * Check if membership is currently active (true / false)
 */
router.get("/active/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const now = new Date();

    const membership = await prisma.membershipApplication.findUnique({
      where: { email },
      select: {
        status: true,
        membershipStart: true,
        membershipEnd: true,
      },
    });

    if (!membership) {
      return res.json({
        active: false,
        reason: "NO_MEMBERSHIP",
      });
    }

    const active =
      membership.status === "ACTIVE" &&
      membership.membershipStart &&
      membership.membershipEnd &&
      membership.membershipStart <= now &&
      membership.membershipEnd >= now;

    return res.json({
      active,
      membershipStart: membership.membershipStart,
      membershipEnd: membership.membershipEnd,
    });
  } catch (err) {
    console.error("❌ Membership active check error:", err);
    return res.status(500).json({
      active: false,
      error: "Internal server error",
    });
  }
});

export default router;
