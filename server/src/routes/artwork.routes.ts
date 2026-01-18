import { Router } from "express";
import {
  artistArtworks,
  depositArtwork,
  getAllVerifiedArtworks,
  getArtworkById,
  getFeaturedArtworks,
} from "../controllers/artwork.controller";
import multer from "multer";
import { protect } from "../middleware/auth";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getAllVerifiedArtworks);
router.get("/featured", getFeaturedArtworks);
router.get("/artistArtworks", protect, artistArtworks);
router.post("/deposit", protect, upload.single("imageURL"), depositArtwork);
router.get("/:id", getArtworkById);

export default router;
