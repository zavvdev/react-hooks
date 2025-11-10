import { useEffect, useState } from "react";

export function useDebouncedState<T>(initialState: T, ms: number = 500) {
  var { 0: state, 1: setState } = useState<T>(initialState);
  var { 0: debouncedState, 1: setDebouncedState } = useState<T>(initialState);

  useEffect(() => {
    var debounce = setTimeout(() => {
      setDebouncedState(state);
    }, ms);
    return () => {
      clearInterval(debounce);
    };
  }, [ms, state]);

  return [state, debouncedState, setState] as const;
}
