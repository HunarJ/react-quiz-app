import React, { useState, useEffect } from "react";

export const QuestionTimer = ({ timeout, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(
    (first) => {
      const timer = setTimeout(onTimeout, timeout);

      return () => {
        clearTimeout(timer);
      };
    },
    [timeout, onTimeout]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
};
