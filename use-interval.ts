import { useEffect, useRef, useState } from "react";

export function useInterval({
  actionFn,
  intervalMs,
  timeoutMs,
  onStart,
  onStop,
}: {
  actionFn: () => void;
  intervalMs: number;
  timeoutMs?: number;
  onStart?: () => void;
  onStop?: () => void;
}) {
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeoutElapsed, setIsTimeoutElapsed] = useState(false);

  const stop = () => {
    setIsRunning(false);
    if (intervalRef) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef) {
      clearTimeout(timeoutRef.current);
    }
    onStop?.();
  };

  const start = () => {
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
