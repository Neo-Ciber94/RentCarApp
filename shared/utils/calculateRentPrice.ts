export function calculateRentPrice(rentPrice: number, daysPassed: number) {
  return Math.max(1, daysPassed) * rentPrice;
}
