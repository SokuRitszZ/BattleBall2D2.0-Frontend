import { createContext } from 'react';

export type typeSocketStore = {
  connect: (url: string) => void;
  on: (event: string, fn: Function) => void;
  off: (event: string) => void;
  clear: (event: string) => void;
  clearAll: () => void;
  emit: (event: string, ...data: any) => void;
  send: (event: string, data: any) => void;
  close: () => void;
};

const storeInit: typeSocketStore = {
  connect: function (url: string): void {
    throw new Error('Function not implemented.');
  },
  on: function (event: string, fn: Function): void {
    throw new Error('Function not implemented.');
  },
  off: function (event: string): void {
    throw new Error('Function not implemented.');
  },
  clear: function (event: string): void {
    throw new Error('Function not implemented.');
  },
  emit: function (event: string, ...data: any): void {
    throw new Error('Function not implemented.');
  },
  send: function (event: string, data: any): void {
    throw new Error('Function not implemented.');
  },
  close: function (): void {
    throw new Error('Function not implemented.');
  },
  clearAll: function (): void {
    throw new Error('Function not implemented.');
  }
}

export const SocketStore = createContext<typeSocketStore>({ ...storeInit });