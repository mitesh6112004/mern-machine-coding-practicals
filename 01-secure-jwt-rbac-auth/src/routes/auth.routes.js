import { Router } from "express";
import { getAdminDashboard, getMe, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/authController.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/refresh", authLimiter,refreshAccessToken);

router.get("/me", verifyAuth, getMe); 
router.post("/logout",verifyAuth, logoutUser);
router.get("/admin-dashboard", verifyAuth, isAdmin, getAdminDashboard);


export default router;
