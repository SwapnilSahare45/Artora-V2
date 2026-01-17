import { Router } from "express";
import { createOrder, getArtistOrder, getBuyerOrders } from "../controllers/order.controller";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/", protect, createOrder);
router.get("/buyer", protect, getBuyerOrders);
router.get("/artist", protect, getArtistOrder);

export default router;
