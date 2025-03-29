import express from "express";

import { 
  createCoupon, 
  getAllCoupons, 
  getCouponById, 
  updateCoupon, 
  deleteCoupon,
  validCoupon } from "../Controllers/PromotionController.js";

const promotionRoutes = express.Router();

promotionRoutes.get("/", getAllCoupons);
promotionRoutes.get("/:id", getCouponById);
promotionRoutes.post("/", createCoupon);
promotionRoutes.put("/:id", updateCoupon);
promotionRoutes.delete("/:id", deleteCoupon);
promotionRoutes.post("/valid-coupon", validCoupon);

export default promotionRoutes;

  