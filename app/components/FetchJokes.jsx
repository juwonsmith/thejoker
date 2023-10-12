"use client";

import { useEffect, useState } from "react";
import { useStore } from "../store/zustand";
import usejokeStore from "../store/useJokeStore";
import JokeView from "./JokeView";

const FetchJokes = async () => {
  const [jokes, setJokes] = useState(null);
  const setError = useStore((state) => state.setError);
  const error = usejokeStore(useStore, (state) => state.error);
  setError(false);
  const res = await fetch("https://official-joke-api.appspot.com/random_joke", {
    next: { revalidate: 0 },
  }).catch(() => {
    setError(true);
  });
  res.json().then((data) => setJokes(data));
  return jokes, error;
};

export default function FetchJokesEvery8Seconds() {
  const [jokes, error] = FetchJokes();
  useEffect(() => {
    let interval = setInterval(() => {
      FetchJokes();
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <JokeView jokes={jokes} error={error} />;
}
