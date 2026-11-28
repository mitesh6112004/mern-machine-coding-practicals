import express from "express";
import productRoutes from "../routes/productRoutes.js"
import { errorHandler } from "../middlewares/errorHandler.js";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(helmet());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.use("/api/products",productRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use(errorHandler);

export default app ; 