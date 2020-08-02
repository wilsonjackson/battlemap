import {useCallback, useEffect} from "react";
import {registerHandler, save} from "../lib/storage";

export default function useStorage(name, watchedState, getState, setState) {
  const memoizedGetState = useCallback(getState, watchedState);
  const memoizedSetState = useCallback(setState, watchedState);

  useEffect(() => {
    registerHandler(name, memoizedGetState, memoizedSetState);
    save(name);
  }, [memoizedGetState, memoizedSetState].concat(watchedState)); // eslint-disable-line react-hooks/exhaustive-deps
}
