import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController
} from "../controllers/productController";
import { validateRequest } from "../middleware/validateRequest";
import {
  createProductSchema,
  updateProductSchema
} from "../validation/productValidation";

export const productRoutes: Router = Router();

productRoutes.get("/products", getAllProductsController);
productRoutes.get("/products/:id", getProductByIdController);

productRoutes.post(
  "/products",
  validateRequest(createProductSchema),
  createProductController
);

productRoutes.put(
  "/products/:id",
  validateRequest(updateProductSchema),
  updateProductController
);

productRoutes.delete("/products/:id", deleteProductController);