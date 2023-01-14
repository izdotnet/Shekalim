import { writable } from 'svelte/store';
import data from '../../seed.json';

export const clients = writable<Client[]>([]);

export const loadClients = () => {
  clients.set(data.clients);
};

export const addClient = (client: Client) => {
  clients.update((prev) => [...prev, client]);
  return client;
};
