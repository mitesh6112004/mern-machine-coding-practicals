import Product from "../models/Product.js";
import {buildProductFilter, parsePaginationAndSort} from "../utils/queryHelper.js"

// 1. GET /api/products (Search, Filter, Sort, Pagination)
export const getProducts = async(req,res,next) => {
    try {
        const filter = buildProductFilter(req.query);
        const { page, limit , skip, sortOption } = parsePaginationAndSort(req.query);

        const [products, totalItems] = await Promise.all([
          Product.find(filter).sort(sortOption).skip(skip).limit(limit),
          Product.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            page,
            totalPages : Math.ceil(totalItems/limit),
            totalItems,
            data: products
        })
    } catch (error) {
        next(error);
    }
}

// 2. GET /api/products/:id (Single Product)
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};