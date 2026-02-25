import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { CreateProductInput, Product, UpdateProductInput } from "../models/productModel";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById
} from "../services/productService";

export async function getAllProductsController(request: Request, response: Response): Promise<void> {
  try {
    const products: Product[] = await getAllProducts();

    response.status(HTTP_STATUS.OK).json({
      count: products.length,
      products
    });
  } catch (error: unknown) {
    response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to fetch products"
    });
  }
}

export async function getProductByIdController(request: Request, response: Response): Promise<void> {
  try {
    const productId: string = request.params.id;

    const product: Product | null = await getProductById(productId);

    if (!product) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ error: "Product not found" });
      return;
    }

    response.status(HTTP_STATUS.OK).json(product);
  } catch (error: unknown) {
    response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to fetch product"
    });
  }
}

export async function createProductController(request: Request, response: Response): Promise<void> {
  try {
    const createProductInput: CreateProductInput = request.body;

    const createdProduct: Product = await createProduct(createProductInput);

    response.status(HTTP_STATUS.CREATED).json(createdProduct);
  } catch (error: unknown) {
    response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to create product"
    });
  }
}

export async function updateProductController(request: Request, response: Response): Promise<void> {
  try {
    const productId: string = request.params.id;
    const updateProductInput: UpdateProductInput = request.body;

    const updatedProduct: Product | null = await updateProductById(productId, updateProductInput);

    if (!updatedProduct) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ error: "Product not found" });
      return;
    }

    response.status(HTTP_STATUS.OK).json(updatedProduct);
  } catch (error: unknown) {
    response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update product"
    });
  }
}

export async function deleteProductController(request: Request, response: Response): Promise<void> {
  try {
    const productId: string = request.params.id;

    const isDeleted: boolean = await deleteProductById(productId);

    if (!isDeleted) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ error: "Product not found" });
      return;
    }

    response.status(HTTP_STATUS.OK).json({ message: "Product deleted." });
  } catch (error: unknown) {
    response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete product"
    });
  }
}