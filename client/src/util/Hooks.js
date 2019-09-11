import { useCallback, useRef } from 'react';

/**
 * Use this hook to distinguish double click and single clicks
 * Callback handler will be executed with a `true` value if it was a
 * double click and with a `false` (after 200ms delay) - if it was a
 * single click
 */
export const useClickCallback = handler => {
  const clickTimeout = useRef(null);
  return useCallback(
    e => {
      if (!clickTimeout.current) {
        clickTimeout.current = setTimeout(() => {
          clickTimeout.current = null;
          handler(false);
        }, 200);
      } else {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
        handler(true);
      }
    },
    [handler]
  );
};
