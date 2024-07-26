const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  currency: "USD",
});
const paymentPortionFormatter = (ammount: number, percentDecimal: number) => {
  const dollars = currencyFormatter.format(ammount);
  const percent = percentFormatter.format(percentDecimal);
  return `${dollars} (${percent} of payment)`;
};
const shortDateFormatter = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    year: '2-digit',
    month: 'short',
  }).replace(' ', "'");
}
export {currencyFormatter,shortDateFormatter, paymentPortionFormatter}