import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser)

export default router;
