import express from "express";
import prisma from "../prismaClient.js"; // ✅ ADD THIS

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    mode: "TESTING",
    message: "Application route is running!",
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
      is_experienced,
      current_company,
      college_name,
      field_of_study,
      passout_year,
      why_membership,
      tried_alternatives,
      reason,
    } = req.body;

    // minimal required fields check
    if (!full_name || !email || !social_profile || !why_membership || !reason) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    const application = await prisma.application.create({
      data: {
        full_name,
        email,
        phone,
        social_profile,
        is_experienced: Boolean(is_experienced),
        current_company,
        college_name,
        field_of_study,
        passout_year: passout_year ? Number(passout_year) : null,
        why_membership,
        tried_alternatives,
        reason,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      status: "ok",
      message: "Application submitted successfully!",
      data: application,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Prisma unique constraint (email)
    if (error.code === "P2002") {
      return res.status(409).json({
        status: "error",
        message: "An application with this email already exists",
      });
    }

    console.error("Application create error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

export default router;