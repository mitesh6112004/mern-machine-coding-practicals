import express from "express";
import {getProductById, getProducts} from "../controllers/productController.js"
import { validateObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id",validateObjectId,getProductById)

export default router; 