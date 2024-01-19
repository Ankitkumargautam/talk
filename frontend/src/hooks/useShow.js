import { useState } from 'react';

const useShow = () => {
  const [state, setState] = useState(false);
  const setShow = () => {
    setState((prev) => !prev);
  };
  return [state, setShow];
};

export default useShow;
