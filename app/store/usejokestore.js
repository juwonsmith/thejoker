import { useState, useEffect } from "react";

const useJokeStore = (store, callback) => {
  const result = store(callback);
  const [data, setData] = useState();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useJokeStore;
