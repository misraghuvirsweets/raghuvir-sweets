import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { loadData, saveData, resetData } from '../services/dataService.js';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadData().then(setData);
  }, []);

  // Apply an update function, persist, and report success/failure.
  const ref = useRef(null);
  ref.current = data;

  const update = useCallback(async (fn) => {
    const next = typeof fn === 'function' ? fn(ref.current) : fn;
    ref.current = next;
    setData(next);
    return saveData(next);
  }, []);

  const replaceAll = useCallback(async (newData) => {
    ref.current = newData;
    setData(newData);
    return saveData(newData);
  }, []);

  const reset = useCallback(async () => {
    const d = await resetData();
    setData(d);
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-saffron border-t-transparent" />
      </div>
    );
  }

  return (
    <DataContext.Provider value={{ data, update, replaceAll, reset }}>{children}</DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
