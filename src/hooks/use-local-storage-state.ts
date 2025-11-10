import { useEffect, useSyncExternalStore } from "react";

var identity = <X = any>(x: X): X => x;

interface Options<T> {
  transform?: (value: string | null) => T;
  enableInit?: boolean;
}

export function useLocalStorageState<V, T>(
  key: string,
  initialValue: V,
  options: Options<T> = {},
) {
  var options_ = {
    transform: identity,
    enableInit: false,
    ...options,
  };

  var setState = (next: ((prev: V) => V) | V) => {
    var newValue = JSON.stringify(
      typeof next === "function"
        ? (next as (prev: V) => V)(initialValue)
        : next,
    );
    localStorage.setItem(key, newValue);
    dispatchEvent(new StorageEvent("storage", { key, newValue }));
  };

  var value = useSyncExternalStore(
    (listener) => {
      window.addEventListener("storage", listener);
      return () => void window.removeEventListener("storage", listener);
    },
    () => options_.transform(localStorage.getItem(key)),
  );

  useEffect(() => {
    if (options.enableInit) {
      setState(initialValue);
    }
  }, []);

  return [value, setState];
}
