import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      data: "",
      originJoke: null,
      isPending: null,
      error: null,
      addOrigin: (joke) => set({ originJoke: joke }),
      addJoke: (joke) => set({ data: joke }),
      setIsPending: (data) => set({ isPending: data }),
      setError: (data) => set({ error: data }),
    }),
    {
      name: "theJokerStore", // name of the item in the storage (must be unique)
    }
  )
);
