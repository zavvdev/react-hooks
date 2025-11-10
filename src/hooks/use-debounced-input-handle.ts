import { useEffect } from "react";
import { useDebouncedState } from "./use-debounced-state";

interface Args {
  value: string;
  onChange: (value: string) => void;
}

export function useDebouncedInputHandle({ value, onChange }: Args) {
  var {
    0: inputValue,
    1: debouncedInputValue,
    2: setInputValue,
  } = useDebouncedState<string>(value);

  useEffect(() => {
    onChange(debouncedInputValue);
  }, [debouncedInputValue]);

  useEffect(() => {
    if (value !== debouncedInputValue) {
      setInputValue(value);
    }
  }, [value]);

  return [inputValue, setInputValue];
}
