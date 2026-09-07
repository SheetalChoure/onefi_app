
// currencyFormatter.js
export const formatINR = (amount = 0) => {
  const numericAmount = Number(amount);

  // Fallback to ₹0 if value is missing, null, or not a valid number
  if (amount === undefined || amount === null || Number.isNaN(numericAmount)) {
    return '₹0';
  }

  return numericAmount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  });
};