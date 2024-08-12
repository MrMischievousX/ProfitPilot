import {StateStorage} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';

const zustandStorage = (id: string) => {
  const storage = new MMKV({id});

  return {
    setItem: (name, value) => {
      return storage.set(name, value);
    },
    getItem: name => {
      const value = storage.getString(name);
      return value ?? null;
    },
    removeItem: name => {
      return storage.delete(name);
    },
  } as StateStorage;
};

export default zustandStorage;
