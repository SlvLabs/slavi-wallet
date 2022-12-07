import {useEffect, useRef} from 'react';

export function useChangedValueCallback<V>(value: V, callback: (v: V) => void) {
  const oldValueRef = useRef<V | undefined>(undefined);
  useEffect(() => {
    console.log({value});
    if (value !== oldValueRef.current) {
      oldValueRef.current = value;
      callback(value);
    }
  }, [value, callback]);
}
