import {create} from "zustand";

export const useGlobalReefetch = create((set) => ({
  globalRefetch: true,
  setGlobalRefetch: (globalRefetch) =>
    set({
      globalRefetch,
    }),
}));