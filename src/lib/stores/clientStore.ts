import { writable } from 'svelte/store';
import data from '../../seed.json';

export const clients = writable<Client[]>([]);

export const loadClients = () => {
  clients.set(data.clients);
};

export const addClient = (client: Client) => {
  clients.update((prev) => [...prev, { ...client, clientStatus: 'active' }]);
  return client;
};

export const updateClient = (client: Client) => {
  clients.update((prev) => prev.map((c: Client) => (c.id === client.id ? client : c)));
  return client;
};

export const getClientById = (id: string) => data.clients.find((client) => client.id === id);

export const deleteClient = (client: Client) => {
  clients.update((prev) => prev.filter((c) => c.id !== client.id));
};
