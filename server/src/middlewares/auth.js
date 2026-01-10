import { clerkMiddleware, getAuth } from "@clerk/express";
import { createClerkClient } from "@clerk/backend";
import prisma from "../prismaClient.js";
import { log } from "../utils/logger.js";

/**
 * Clerk backend client (lazy init)
 */
let clerkClient = null;
const getClerk = () => {
  if (!clerkClient) {
    clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });
  }
  return clerkClient;
};

/**
 * 🔐 Initialize Clerk middleware
 * Must be mounted BEFORE protected routes
 */
export const initClerk = clerkMiddleware();

/**
 * 🔐 Require authenticated user
 * - Validates Clerk JWT / session
 * - Auto-creates user in DB
 * - Attaches `req.user`
 */
export const requireAuth = async (req, res, next) => {
  try {
    const auth = getAuth(req);

    if (!auth || !auth.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const clerkId = auth.userId;

    // Defaults
    let email = `${clerkId}@no-email.clerk`;
    let name = "User";

    // Fetch full user info from Clerk
    try {
      const clerkUser = await getClerk().users.getUser(clerkId);
      email =
        clerkUser.emailAddresses?.[0]?.emailAddress ?? email;
      name = clerkUser.firstName
        ? `${clerkUser.firstName}${clerkUser.lastName ? " " + clerkUser.lastName : ""}`
        : name;
    } catch (err) {
      log("Clerk user fetch failed:", err);
    }

    // Upsert user in DB
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        ...(email && { email }),
        ...(name && { name }),
      },
      create: {
        clerkId,
        email,
        name,
        active: true,
      },
    });

    if (!user.active) {
      return res.status(403).json({ message: "Account disabled" });
    }

    req.user = user;
    next();
  } catch (error) {
    log("Auth middleware error:", error);
    return res.status(500).json({ message: "Authentication error" });
  }
};

/**
 * 🔓 Optional auth (does NOT block)
 */
export const optionalAuth = (req, _res, next) => {
  const auth = getAuth(req);
  if (auth?.userId) {
    req.clerkUserId = auth.userId;
  }
  next();
};

/**
 * 🔑 Internal API key auth (cron/admin)
 */
export const requireApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ message: "Invalid API key" });
  }

  next();
};
