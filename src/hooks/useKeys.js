import {useCallback, useRef} from "react";
import Mousetrap from 'mousetrap';

export default function useKeys(mapping) {
  const mousetrap = useRef();

  return useCallback(node => {
    if (mousetrap.current) {
      mousetrap.current.reset();
    }
    if (node) {
      mousetrap.current = new Mousetrap(node);
      for (let [key, action] of Object.entries(mapping)) {
        mousetrap.current.bind(key, action);
      }
    }
  }, [mapping]);
};
