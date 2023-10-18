"use client";

import { useEffect, useState } from "react";

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
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true); // Initialize as true

  const fetchAndSetJoke = () => {
    setError(false);
    fetchJoke()
      .then((data) => {
        setJoke(data);
        if (isPending) {
          setIsPending(false); // Set to false only if it's still true
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    fetchAndSetJoke(); // Initial fetch

    let interval = setInterval(() => {
      fetchAndSetJoke(); // Fetch every 8 seconds
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return [joke, error, isPending];
}
