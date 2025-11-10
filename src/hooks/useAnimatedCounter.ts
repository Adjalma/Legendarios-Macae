import { useEffect, useRef, useState } from "react";

export const useAnimatedCounter = (
  targetValue?: number,
  duration = 1800
) => {
  const [currentValue, setCurrentValue] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!targetValue || targetValue <= 0) {
      setCurrentValue(0);
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setCurrentValue(0);
    const startTime = performance.now();

    const update = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setCurrentValue(Math.floor(easedProgress * targetValue));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(update);
      }
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, duration]);

  return currentValue;
};

