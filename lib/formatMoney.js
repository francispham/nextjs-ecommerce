export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  // ?  Check if it's a clean Dollar Amount
  if (amount % 100 === 0) options.minimumFractionDigits = 0;

  // *  Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
  const formatter = Intl.NumberFormat('en-US', options);

  return formatter.format(amount / 100);
};