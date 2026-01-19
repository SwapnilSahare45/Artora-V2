import { Router } from "express";
import { protect } from "../middleware/auth";
import { getAuctionById, getAuctions } from "../controllers/auction.controller";
import { placeBid } from "../controllers/bid.controller";

const router = Router();

router.post("/bid", protect, placeBid);
router.get("/all", protect, getAuctions);
router.get("/:id", protect, getAuctionById);

export default router;
