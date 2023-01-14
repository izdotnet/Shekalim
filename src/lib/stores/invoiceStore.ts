import { writable } from 'svelte/store';
import data from '../../seed.json';

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = () => {
  invoices.set(data.invoices);
  // invoices.set([]);
};

export const addInvoice = (invoice: Invoice) => {
  invoices.update((prev: Invoice[]) => [...prev, invoice]);
  return invoice;
};

export const updateInvoice = (invoice: Invoice) => {
  invoices.update((prev: Invoice[]) =>
    prev.map((currentInvoice: Invoice) =>
      currentInvoice.id === invoice.id ? invoice : currentInvoice
    )
  );
  return invoice;
};

export const deleteInvoice = (invoice: Invoice) => {
  invoices.update((prev: Invoice[]) => prev.filter((curInv) => curInv.id !== invoice.id));
};
