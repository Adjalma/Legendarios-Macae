import { useEffect, useRef, useState } from "react";

export const useAnimatedCounter = (
  targetValue?: number,
  duration = 1800,
  trigger = 0
) => {
  const [currentValue, setCurrentValue] = useState(0);
  const previousTarget = useRef<number | undefined>(undefined);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!targetValue || targetValue <= 0) {
      setCurrentValue(0);
      previousTarget.current = targetValue;
      return;
    }

    if (previousTarget.current === targetValue && trigger === 0) {
      return;
    }

    previousTarget.current = targetValue;

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    const startTime = performance.now();

    const update = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setCurrentValue(Math.floor(easedProgress * targetValue));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(update);
      }
    };

    frameRef.current = requestAnimationFrame(update);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetValue, duration, trigger]);

  return currentValue;
};

