"use client";

import { useEffect, useState } from "react";
import { useStore } from "../store/zustand";
import usejokeStore from "../store/useJokeStore";
import JokeView from "./JokeView";

const FetchJokes = () => {};

export default function FetchJokesEvery8Seconds() {
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
  return <JokeView jokes={jokes} error={error} />;
}
