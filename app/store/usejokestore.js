// useStore.ts
import { useState, useEffect } from "react";

const usejokeStore = (store, callback) => {
  const result = store(callback);
  const [data, setData] = useState();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default usejokeStore;
