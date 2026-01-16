import { Router } from "express";
import { protect } from "../middleware/auth";
import {
  createAuction,
  getArtworksForAuction,
  getCurationPool,
  getScheduledAuctions,
  getUnverifiedArtworks,
  rejectArtwork,
  verifyArtwork,
} from "../controllers/admin.controller";

const router = Router();

// Artworks
router.get("/artworks/pending", protect, getUnverifiedArtworks);
router.get("/artworks/inAuction", protect, getArtworksForAuction);
router.get("/artworks/curationPool", protect, getCurationPool);
router.patch("/artworks/:id/verify", protect, verifyArtwork);
router.patch("/artworks/:id/reject", protect, rejectArtwork);

// Auction
router.post("/auction/create", protect, createAuction);
router.get("/auctions/scheduled", protect, getScheduledAuctions);

export default router;
