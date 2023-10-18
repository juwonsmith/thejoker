import { useEffect, useState, useRef } from "react";

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
  const [isPending, setIsPending] = useState(null);

  // track whether isPending has been set to false
  const isPendingSet = useRef(false);

  const fetchAndSetJoke = () => {
    setError(false);
    fetchJoke()
      .then((data) => {
        setJoke(data);
        if (!isPendingSet.current) {
          setIsPending(false);
          isPendingSet.current = true; // Set  ref to true
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    setIsPending(true);
    fetchAndSetJoke();

    let interval = setInterval(() => {
      fetchAndSetJoke();
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return [joke, error, isPending];
}
