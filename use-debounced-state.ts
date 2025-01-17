import { useEffect, useState } from "react";

export function useDebouncedState<T>(initialState: T, ms: number = 500) {
  const [state, setState] = useState<T>(initialState);
  const [debouncedState, setDebouncedState] = useState<T>(initialState);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedState(state);
    }, ms);
    return () => {
      clearInterval(debounce);
    };
  }, [ms, state]);

  return [state, debouncedState, setState];
}
