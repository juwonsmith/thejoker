"use client";

import { useEffect, useState } from "react";
import { useStore } from "../store/zustand";
import usejokeStore from "../store/useJokeStore";

async function fetchJoke() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/random_joke",
    {
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch joke");
  }
  return await response.json();
}

export function useFetchJokesEvery8Seconds() {
  const [joke, setJoke] = useState(null);
  const setError = useStore((state) => state.setError);
  const error = usejokeStore(useStore, (state) => state.error);

  const fetchAndSetJoke = () => {
    setError(false);

    fetchJoke()
      .then((data) => {
        setJoke(data);
      })
      .catch((error) => {
        setError(true);
      });
  };

  useEffect(() => {
    fetchAndSetJoke();

    let interval = setInterval(() => {
      fetchAndSetJoke();
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return [joke, error];
}
