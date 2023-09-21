import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      data: "",
      originJoke: null,
      ispending: null,
      error: null,
      addOrigin: (joke) => set({ originJoke: joke }),
      addJoke: (joke) => set({ data: joke }),
      setIspending: (data) => set({ ispending: data }),
      setError: (data) => set({ error: data }),
    }),
    {
      name: "explained", // name of the item in the storage (must be unique)
    }
  )
);
