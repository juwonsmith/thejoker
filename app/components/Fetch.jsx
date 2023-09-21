"use client";

import { useEffect, useState } from "react";
import { useStore } from "../store/zustand";
import usejokeStore from "../store/usejokestore";

export default function Fetch() {
  const [jokes, setJokes] = useState(null);
  const setError = useStore((state) => state.setError);
  const error = usejokeStore(useStore, (state) => state.error);
  useEffect(() => {
    const getJokes = async () => {
      setError(false);
      const res = await fetch(
        "https://official-joke-api.appspot.com/random_joke",
        {
          next: { revalidate: 0 },
        }
      ).catch(() => {
        setError(true);
      });

      res.json().then((data) => setJokes(data));
    };
    getJokes();
    let interval = setInterval(() => {
      getJokes();
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {error && (
        <p className="text-white font-nunito text-center">
          failed to fetch data
        </p>
      )}
      {jokes && !error && (
        <div className="text-white font-nunito text-center  ">
          <p>{jokes.setup}</p>
          <p>{jokes.punchline}</p>
        </div>
      )}
    </>
  );
}
