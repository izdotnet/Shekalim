type Invoice = {
  client: Client;
  createdAt: string;
  dueDate: string;
  id: string;
  invoiceNumber: string;
  invoiceStatus: InvoiceStatus;
  issueDate: string;
  lineItems?: LineItems[];
  notes?: string;
  subject?: string;
  terms?: string;
};

type Client = {
  clientStatus: ClientStatus;
  city: string;
  country: string;
  email: string;
  id: string;
  name: string;
  street: string;
};

type LineItems = {
  amount: number;
  description: string;
  id: string;
  quantity: number;
};
