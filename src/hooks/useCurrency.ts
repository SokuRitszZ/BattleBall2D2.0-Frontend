import React, { useState, useRef, useEffect } from 'react';

function useCurrency<T>(_value: T): [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T | undefined>] {
  const [value, setter] = useState<T>(_value);
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return [value, setter, ref];
}

export default useCurrency;
