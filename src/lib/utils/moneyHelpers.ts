export const sumLineItems = (lineItems: LineItems[] | undefined): number => {
  if (!lineItems) return 0;
  return lineItems.reduce((prev, current) => prev + current.amount, 0);
};

export const toShekels = (num: number): string => {
  if (!num || num === 0) return '₪0.00';
  const shekels = num / 100;
  const addDecimals = twoDecimals(shekels);
  return addShekelSign(addSeperators(addDecimals));
};

export const addShekelSign = (num: string): string => `₪${num}`;

export const twoDecimals = (num: number): string => num.toFixed(2);

export const addSeperators = (num: string): string => num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const sumInvoices = (invoices: Invoice[] | undefined): string => {
  if (!invoices) return toShekels(0);
  const total = invoices.reduce((prev, current) => prev + sumLineItems(current.lineItems), 0);
  return toShekels(total);
};
