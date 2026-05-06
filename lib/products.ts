import { Product } from './types';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

export const products: Product[] = productsData as Product[];

export const categories = categoriesData;
