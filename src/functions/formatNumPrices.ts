export function formatNumPrices(num: number) {
  const [integerPart, decimalPart] = Number(num).toFixed(2).split(".");
  const integerWithDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${integerWithDots},${decimalPart}`;
}
