export const thousandSeparator = (input: string | number): string => {
    const strInput = String(input).replace(/[^0-9.,]/g, ""); // Remove invalid characters
    const normalized = strInput.replace(/,/g, "."); // Convert comma to dot if needed
  
    const [integerPart, decimalPart] = normalized.split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
    return decimalPart !== undefined ? `${formattedInteger},${decimalPart}` : formattedInteger;
};