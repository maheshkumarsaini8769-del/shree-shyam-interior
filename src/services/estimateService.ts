import pricingConfig from '../data/pricingConfig.json';
import { EstimateInputs, CostBreakdown, PropertyType, RoomType, DesignStyle, QualityTier } from '../types/estimate';

export const calculateEstimate = (inputs: EstimateInputs): CostBreakdown => {
  const { propertyType, roomType, designStyle, qualityTier, areaSqFt } = inputs;

  const baseRate = pricingConfig.baseRatePerSqFt[propertyType] || 1400;
  const roomMult = pricingConfig.roomMultipliers[roomType] || 1.0;
  const tierMult = pricingConfig.tierMultipliers[qualityTier] || 1.0;
  const styleMult = pricingConfig.styleMultipliers[designStyle] || 1.0;

  const ratePerSqFt = Math.round(baseRate * roomMult * tierMult * styleMult);
  const totalBase = Math.round(ratePerSqFt * (areaSqFt || 500));

  const materialCost = Math.round(totalBase * pricingConfig.costSplits.materialPercentage);
  const labourCost = Math.round(totalBase * pricingConfig.costSplits.labourPercentage);
  const designFee = Math.round(totalBase * pricingConfig.costSplits.designPercentage);

  const subtotal = materialCost + labourCost + designFee;
  const gstAmount = Math.round(subtotal * pricingConfig.gstRate);
  const grandTotal = subtotal + gstAmount;

  // Estimate timeline in weeks based on area
  let timelineWeeks = '3 - 4 Weeks';
  if (areaSqFt > 1800) {
    timelineWeeks = '8 - 12 Weeks';
  } else if (areaSqFt > 1000) {
    timelineWeeks = '5 - 7 Weeks';
  } else if (areaSqFt > 500) {
    timelineWeeks = '4 - 6 Weeks';
  }

  return {
    materialCost,
    labourCost,
    designFee,
    subtotal,
    gstAmount,
    grandTotal,
    ratePerSqFt,
    timelineWeeks
  };
};

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
