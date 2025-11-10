import { useEffect, useRef } from "react";

export function useIsFirstRender() {
  var reference = useRef<boolean>(true);

  useEffect(() => {
    if (reference.current) {
      reference.current = false;
    }
  });

  return reference.current;
}
