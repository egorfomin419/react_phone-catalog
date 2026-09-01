import { Product } from '../types/Product';

const BASE_URL = `${import.meta.env.BASE_URL}api`;

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products.json`);

  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  return response.json();
};
