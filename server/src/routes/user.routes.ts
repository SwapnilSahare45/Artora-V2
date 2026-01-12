import { Router } from "express";
import { protect } from "../middleware/auth";
import multer from "multer";
import { updateProfile } from "../controllers/user.controller";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.patch("/update", protect, upload.single("avatar"), updateProfile);

export default router;
