import { getInvoiceById } from '$lib/stores/invoiceStore';

type Props = {
  params: {
    id: string;
  };
};

export const load = ({ params }: Props) => {
  const id = params?.id;
  const invoice = getInvoiceById(id);
  return { invoice };
};
