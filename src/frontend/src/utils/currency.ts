/**
 * Currency formatting utilities for USD (US Dollar)
 */

/**
 * Formats a number or bigint as USD currency
 * @param amount - The amount to format (number or bigint)
 * @param options - Optional formatting options
 * @returns Formatted currency string with $ symbol
 */
export function formatUSD(
  amount: number | bigint,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const numAmount = typeof amount === 'bigint' ? Number(amount) : amount;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
  }).format(numAmount);
}

/**
 * Formats a number or bigint as USD without the currency symbol
 * Useful for input fields or when you want to add the symbol separately
 */
export function formatUSDNumber(amount: number | bigint): string {
  const numAmount = typeof amount === 'bigint' ? Number(amount) : amount;
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
}
