export const formatCurrency = (value, includeSign = false) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '₹0.00';
  }
  
  const absoluteValue = Math.abs(value);
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absoluteValue);

  const sign = value < 0 ? '-' : (includeSign ? '+' : '');
  return `${sign}${formatted}`;
};
