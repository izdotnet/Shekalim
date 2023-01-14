import { writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';

const newSnackbar = () => {
  const { update, subscribe } = writable<Snackbar[]>([]);

  const send = (content: { message: string; type: NotificationType }) => {
    const newContent = { id: uuid(), ...content };
    update((prev) => [...prev, newContent]);
  };

  const remove = (id: string | null = null) => {
    update((prev) => {
      if (id) return prev.filter((item) => item.id !== id);
      const [, ...rest] = prev;
      return [...rest];
    });
  };

  return { subscribe, send, remove };
};

export const snackbar = newSnackbar();
