import React from "react";

const useIterator = (total, initial = 1) => {
  const [current, setCurrent] = React.useState(initial);

  const previous = React.useMemo(() => {
    return current <= 1 ? total : current - 1;
  }, [current, total]);

  const next = React.useMemo(() => {
    return current >= total ? 1 : current + 1;
  }, [current, total]);

  const onNext = React.useCallback(() => {
    setCurrent((current) => (current >= total ? 1 : current + 1));
  }, [total]);

  const onPrev = React.useCallback(() => {
    setCurrent((current) => (current <= 1 ? total : current - 1));
  }, [total]);

  return {
    onPrev,
    onNext,
    next,
    previous,
    current,
    setCurrent
  };
};

export default useIterator;
