import { Router } from "express";
import { register, resendOTP, verifyOTP } from "../controllers/auth.controller";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/verifyOTP", verifyOTP);
router.post("/resendOTP", resendOTP);
// router.post("/login", login);
// router.post("/logout", protect, logout);

export default router;
