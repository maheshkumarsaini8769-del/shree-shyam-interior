import { Product } from './product';

export interface QuoteItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  brand: string;
  image: string;
  unitPrice: number;
  unit: string;
  quantity: number;
  selectedFinish?: string;
  notes?: string;
}

export interface SiteVisitRequest {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  propertyType: string;
  approxArea: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}
