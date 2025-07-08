export const formatCompactNumber = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    notation: "compact",
  }).format(number);
};
