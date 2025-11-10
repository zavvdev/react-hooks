import { useEffect, useRef, useState } from "react";

interface Args {
  actionFn: () => void;
  intervalMs: number;
  timeoutMs?: number;
  onStart?: () => void;
  onStop?: () => void;
}

export function useInterval({
  actionFn,
  intervalMs,
  timeoutMs,
  onStart,
  onStop,
}: Args) {
  var intervalRef = useRef<number | null>(null);
  var timeoutRef = useRef<number | null>(null);

  var { 0: isRunning, 1: setIsRunning } = useState(false);
  var { 0: isTimeoutElapsed, 1: setIsTimeoutElapsed } = useState(false);

  var stop = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onStop?.();
  };

  var start = () => {
    if (typeof actionFn === "function") {
      stop();
      setIsRunning(true);
      setIsTimeoutElapsed(false);

      intervalRef.current = setInterval(actionFn, intervalMs);
      if (timeoutMs) {
        timeoutRef.current = setTimeout(() => {
          stop();
          setIsTimeoutElapsed(true);
        }, timeoutMs);
      }

      onStart?.();
    }
  };

  useEffect(() => {
    return stop;
  }, []);

  return {
    start,
    stop,
    isRunning,
    isTimeoutElapsed,
  };
}
