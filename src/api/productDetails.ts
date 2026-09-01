/* eslint-disable prettier/prettier */
import { Category } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { getProducts } from './products';

const BASE_URL = `${import.meta.env.BASE_URL}api`;

const getCategoryProducts = async (
  category: Category,
): Promise<ProductDetails[]> => {
  const response = await fetch(`${BASE_URL}/${category}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load ${category}`);
  }

  return response.json();
};

export const getProductDetails = async (productId: string) => {
  const products = await getProducts();
  const found = products.find((p) => p.itemId === productId);

  if (!found) {
    throw new Error('Product not found');
  }

  const categoryProducts = await getCategoryProducts(found.category);
  const product = categoryProducts.find((p) => p.id === productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const family = categoryProducts.filter(
    (p) => p.namespaceId === product.namespaceId,
  );

  return { product, family };
};

export const getSuggestedProducts = async (
  category: Category,
  excludeItemId: string,
) => {
  const products = await getProducts();

  const filtered = products.filter(
    (p) => p.category === category && p.itemId !== excludeItemId,
  );

  return filtered.sort(() => Math.random() - 0.5).slice(0, 4);
};
