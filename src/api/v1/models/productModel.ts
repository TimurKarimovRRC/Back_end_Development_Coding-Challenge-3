export type ProductCategory = "electronics" | "clothing" | "food" | "tools" | "other";

export interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: ProductCategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductInput {
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: ProductCategory;
}

export interface UpdateProductInput {
  name?: string;
  quantity?: number;
  price?: number;
  category?: ProductCategory;
}