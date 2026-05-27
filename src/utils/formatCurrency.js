/**
 * Formats a number as a currency string in Indian Rupees (INR).
 * Handles decimals correctly.
 * 
 * @param {number} value - The number to format
 * @param {boolean} includeSign - Whether to prefix positive numbers with '+'
 * @returns {string} Formatted currency string
 */
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

  // Intl.NumberFormat might include the currency symbol, but sometimes with spaces or formatting differences.
  // We clean up or construct it.
  const sign = value < 0 ? '-' : (includeSign ? '+' : '');
  return `${sign}${formatted}`;
};
