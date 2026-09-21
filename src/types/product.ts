export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subCategory?: string;
  price?: number;
  unit?: string;
  isPriceOnQuote?: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  description: string;
  features: string[];
  specifications?: Record<string, any>;
  finishes?: string[];
  applications: string[];
  inStock: boolean;
  isBestseller?: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  image: string;
  itemCount: number;
}
