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