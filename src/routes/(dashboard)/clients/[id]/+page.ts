import { getClientById } from '$lib/stores/clientStore';

type Props = {
  params: {
    id: string;
  };
};

export const load = ({ params }: Props) => {
  const id = params?.id;
  const client = getClientById(id);
  return { client };
};
