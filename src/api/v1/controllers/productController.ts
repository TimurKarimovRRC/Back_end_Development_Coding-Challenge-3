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

export async function createProduct(productInput: CreateProductInput): Promise<Product> {
  const now: Date = new Date();

  const newProductRecord: NewProductRecord = {
    name: productInput.name,
    sku: productInput.sku,
    quantity: productInput.quantity,
    price: productInput.price,
    category: productInput.category,
    createdAt: now,
    updatedAt: now
  };

  const createdProduct: Product = await createDocument<NewProductRecord>(
    productsCollectionName,
    newProductRecord
  );

  return createdProduct;
}

export async function updateProductById(
  productId: string,
  updates: UpdateProductInput
): Promise<Product | null> {
  const existingProduct: Product | null = await getDocumentById<Product>(productsCollectionName, productId);

  if (!existingProduct) {
    return null;
  }

  const updatePayload: Partial<Product> = {
    updatedAt: new Date()
  };

  if (updates.name !== undefined) {
    updatePayload.name = updates.name;
  }

  if (updates.quantity !== undefined) {
    updatePayload.quantity = updates.quantity;
  }

  if (updates.price !== undefined) {
    updatePayload.price = updates.price;
  }

  if (updates.category !== undefined) {
    updatePayload.category = updates.category;
  }

  const updatedProduct: Product = await updateDocument<Product>(
    productsCollectionName,
    productId,
    updatePayload
  );

  return updatedProduct;
}