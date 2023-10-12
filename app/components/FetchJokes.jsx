"use client";

import { useEffect, useState } from "react";
import { useStore } from "../store/zustand";
import usejokeStore from "../store/useJokeStore";
import JokeView from "./JokeView";

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

export default function FetchJokesEvery8Seconds() {
  const [jokes, setJokes] = useState(null);
  const setError = useStore((state) => state.setError);
  const error = usejokeStore(useStore, (state) => state.error);

  const getJokes = () => {
    setError(false);

    fetchJoke()
      .then((data) => {
        setJokes(data);
      })
      .catch((error) => {
        setError(true);
      });
  };

  useEffect(() => {
    getJokes();

    let interval = setInterval(() => {
      getJokes();
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <JokeView jokes={jokes} error={error} />;
}
