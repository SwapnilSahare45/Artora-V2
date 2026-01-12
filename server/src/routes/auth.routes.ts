import { Router } from "express";
import {
  authenticatedUser,
  getLoggedInUser,
  login,
  logout,
  register,
  resendOTP,
  verifyOTP,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/verifyOTP", verifyOTP);
router.post("/resendOTP", resendOTP);
router.post("/login", login);
router.post("/logout", logout);
router.post("/authenticatedUser", protect, authenticatedUser);
router.get("/loggedInUser", protect, getLoggedInUser);

export default router;
