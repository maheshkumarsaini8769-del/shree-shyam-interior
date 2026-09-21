export type PropertyType = '1BHK' | '2BHK' | '3BHK' | '4BHK / Villa' | 'Office / Studio' | 'Retail / Commercial';

export type RoomType = 'Full Home' | 'Living Room' | 'Modular Kitchen' | 'Master Bedroom' | 'False Ceiling & Lighting' | 'Custom Wardrobes';

export type DesignStyle = 'Modern Minimalist' | 'Contemporary Indian Luxury' | 'Warm Japandi' | 'Industrial Chic' | 'Royal Traditional';

export type QualityTier = 'Essential' | 'Premium Luxury' | 'Ultra Bespoke';

export interface EstimateInputs {
  propertyType: PropertyType;
  roomType: RoomType;
  designStyle: DesignStyle;
  qualityTier: QualityTier;
  areaSqFt: number;
}

export interface CostBreakdown {
  materialCost: number;
  labourCost: number;
  designFee: number;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  ratePerSqFt: number;
  timelineWeeks: string;
}
