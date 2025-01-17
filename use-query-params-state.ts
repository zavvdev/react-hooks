import { useCallback, useEffect, useMemo } from "react";
import queryString from "query-string";
import { history } from "~/history";

const isNullish = (value: unknown) => {
  return value === null || value === undefined;
};

export function useQueryParamsState<R, T extends Record<string, R>>(
  initialState: Record<string, T> = {},
): [T, (nextState: T | ((state: T) => T)) => void] {
  const state = useMemo(() => {
    const params = queryString.parse(window?.location?.search);
    const keys = Object.keys(initialState);
    return keys.reduce((r, k) => ({ ...r, [k]: params[k] || null }), {});
  }, [window?.location?.search]);

  const updateState = useCallback(
    (_nextState: T | ((state: T) => T)) => {
      let nextState = _nextState;

      if (typeof _nextState === "function") {
        nextState = _nextState(state);
      }

      const initialKeys = Object.keys(initialState);
      const nextKeys = Object.keys(nextState);

      const nextParamsState = nextKeys.reduce((r, k) => {
        if (initialKeys.includes(k)) {
          return {
            ...r,
            [k]: nextState[k],
          };
        }
        return r;
      }, state);

      const prevParams = queryString.parse(window?.location?.search);

      history.push(
        window.location.pathname +
        `?${queryString.stringify({ ...prevParams, ...nextParamsState })}`,
      );
    },
    [state],
  );

  useEffect(() => {
    const params = queryString.parse(window?.location?.search);

    const nextInitialParams = Object.keys(initialState).reduce((r, k) => {
      if (isNullish(params[k])) {
        return {
          ...r,
          [k]: initialState[k],
        };
      }
      return r;
    }, {});

    if (Object.keys(nextInitialParams).length > 0) {
      updateState(nextInitialParams);
    }
  }, []);

  return [state, updateState];
}
