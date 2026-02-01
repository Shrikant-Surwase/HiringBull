import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Application route is running",
    timestamp: new Date().toISOString(),
  });
});

router.post("/", async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      social_profile,
      reason,
    } = req.body;

    // ✅ Minimal required fields
    if (!full_name || !email || !social_profile || !reason) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    const application = await prisma.application.create({
      data: {
        full_name,
        email,
        phone: phone || null,
        social_profile,
        reason,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      status: "ok",
      message: "Application submitted successfully",
      data: application,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // ✅ Unique email constraint
    if (error.code === "P2002") {
      return res.status(409).json({
        status: "error",
        message: "An application with this email already exists",
      });
    }

    console.error("❌ Application create error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

export default router;
