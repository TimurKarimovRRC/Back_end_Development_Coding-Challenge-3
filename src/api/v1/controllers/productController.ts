import {
  createDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument
} from "../repositories/firestoreRepository";
import { CreateProductInput, Product, UpdateProductInput } from "../models/productModel";

const productsCollectionName: string = "products";

type NewProductRecord = Omit<Product, "id">;


export async function getAllProducts(): Promise<Product[]> {
  const products: Product[] = await getAllDocuments<Product>(productsCollectionName);
  return products;
}

export async function getProductById(productId: string): Promise<Product | null> {
  const product: Product | null = await getDocumentById<Product>(productsCollectionName, productId);
  return product;
}