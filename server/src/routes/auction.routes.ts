import { Router } from "express";
import { protect } from "../middleware/auth";
import { getAuctionById, getAuctions } from "../controllers/auction.controller";

const router = Router();

router.get("/all", protect, getAuctions);
router.get("/:id", protect, getAuctionById);

export default router;
