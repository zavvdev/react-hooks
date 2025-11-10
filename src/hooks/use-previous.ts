import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T) {
  var reference = useRef<T>(null);

  useEffect(() => {
    reference.current = value;
  }, [value]);

  return reference.current;
}
