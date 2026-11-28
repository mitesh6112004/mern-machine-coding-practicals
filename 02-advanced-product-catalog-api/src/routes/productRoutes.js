import express from "express";
import {createProduct, getProductById, getProducts} from "../controllers/productController.js"
import { validateObjectId } from "../middlewares/validateObjectId.js";
import { requireAdminKey } from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id",validateObjectId,getProductById);
router.post("/", requireAdminKey, createProduct);

export default router; 