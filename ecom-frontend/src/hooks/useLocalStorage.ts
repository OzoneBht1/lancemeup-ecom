import { useState, useEffect } from "react";

type ReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>,
  (key: string) => void
];

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): ReturnType<T> => {
  const [state, setState] = useState<T | undefined>(() => {
    try {
      const value = localStorage.getItem(key);
      console.log(value);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      console.log(e);
      return initialValue;
    }
  });
  const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    }
  }, [state]);

  return [state, setState, removeFromLocalStorage];
};
