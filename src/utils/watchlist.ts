function getCryptoKey(symbol: string) {
  return symbol?.toLowerCase().split('-')[0];
}

function getPriceChangeStatus(previous: string, current: string): string {
  let status = 'default';

  if (parseFloat(previous) > parseFloat(current)) status = 'down';
  if (parseFloat(previous) < parseFloat(current)) status = 'up';

  return status;
}

function formatPrice(price: string) {
  return parseFloat(price).toLocaleString('en-US');
}

function calcPercentChange(openPrice: string, price: string): string {
  const percentChange =
    ((parseFloat(price) - parseFloat(openPrice)) / parseFloat(openPrice)) * 100;
  const sign = percentChange >= 0 ? '+' : '-';

  return `${sign}${Math.abs(percentChange).toFixed(2)}%`;
}

export { getCryptoKey, getPriceChangeStatus, formatPrice, calcPercentChange };
