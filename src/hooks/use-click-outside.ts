import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  reference: React.RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  exceptions: Array<React.RefObject<HTMLElement | null>> = [],
) {
  useEffect(() => {
    var listener = (event: MouseEvent | TouchEvent) => {
      if (
        !reference.current ||
        reference.current?.contains?.(event.target as Node) ||
        exceptions.some(
          (exception) =>
            exception.current &&
            exception.current.contains?.(event.target as Node),
        )
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [reference, handler]);
}
