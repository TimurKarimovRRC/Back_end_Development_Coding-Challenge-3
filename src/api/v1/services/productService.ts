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

export async function createProduct(createProductInput: CreateProductInput): Promise<Product> {
  const currentDate: Date = new Date();

  const newProductRecord: NewProductRecord = {
    name: createProductInput.name,
    sku: createProductInput.sku,
    quantity: createProductInput.quantity,
    price: createProductInput.price,
    category: createProductInput.category,
    createdAt: currentDate,
    updatedAt: currentDate
  };

  const createdProduct: NewProductRecord & { id: string } = await createDocument<NewProductRecord>(
    productsCollectionName,
    newProductRecord
  );

  return createdProduct as Product;
}

export async function updateProductById(
  productId: string,
  updateProductInput: UpdateProductInput
): Promise<Product | null> {
  const existingProduct: Product | null = await getProductById(productId);

  if (!existingProduct) {
    return null;
  }

  const updatedProductData: Partial<Product> = {
    ...updateProductInput,
    updatedAt: new Date()
  };

  const updatedProduct: Product = await updateDocument<Product>(
    productsCollectionName,
    productId,
    updatedProductData
  );

  return updatedProduct;
}

export async function deleteProductById(productId: string): Promise<boolean> {
  const existingProduct: Product | null = await getProductById(productId);

  if (!existingProduct) {
    return false;
  }

  await deleteDocument(productsCollectionName, productId);
  return true;
}