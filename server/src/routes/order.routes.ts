import { Router } from "express";
import {
  getArtistOrder,
  getBuyerOrders,
  placeOrder,
} from "../controllers/order.controller";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/", protect, placeOrder);
router.get("/buyer", protect, getBuyerOrders);
router.get("/artist", protect, getArtistOrder);

export default router;
