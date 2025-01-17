import { useEffect, useRef } from "react";

export function useIsFirstRender() {
  const reference = useRef(true);

  useEffect(() => {
    const firstRender = reference.current;

    if (firstRender) {
      reference.current = false;
    }
  });

  return reference.current;
}
