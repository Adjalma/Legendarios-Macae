import { useEffect, useRef, useState } from "react";

export const useAnimatedCounter = (targetValue?: number, duration = 1800) => {
  const [currentValue, setCurrentValue] = useState(0);
  const previousTarget = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!targetValue || targetValue <= 0) {
      setCurrentValue(0);
      previousTarget.current = targetValue;
      return;
    }

    if (previousTarget.current === targetValue) {
      return;
    }

    previousTarget.current = targetValue;
    let frameId: number;
    const startTime = performance.now();

    const update = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setCurrentValue(Math.floor(easedProgress * targetValue));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    setCurrentValue(0);
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [targetValue, duration]);

  return currentValue;
};

