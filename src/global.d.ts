type Invoice = {
  client: Client;
  createdAt: string;
  discount?: number;
  dueDate: string;
  id: string;
  invoiceNumber: string;
  invoiceStatus: InvoiceStatus;
  issueDate: string;
  lineItems?: LineItem[];
  notes?: string;
  subject?: string;
  terms?: string;
};

type Client = {
  clientStatus?: ClientStatus;
  city?: string;
  country?: string;
  email: string;
  id: string;
  name: string;
  street?: string;
  zipCode?: string;
};

type LineItem = {
  amount: number;
  description: string;
  id: string;
  quantity: number;
};

type NotificationType = 'success' | 'error' | 'warning' | 'info';

type Snackbar = {
  id: string;
  message: string;
  type: NotificationType;
};
