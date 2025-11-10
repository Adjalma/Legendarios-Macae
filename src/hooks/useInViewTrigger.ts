import { useEffect, useRef, useState } from "react";

type UseInViewTriggerOptions = IntersectionObserverInit & {
  resetDelay?: number;
};

export const useInViewTrigger = <T extends Element>(
  options: UseInViewTriggerOptions = {}
) => {
  const { resetDelay = 0, ...observerOptions } = options;
  const elementRef = useRef<T | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) {
      return;
    }

    let timeoutId: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrigger((prev) => prev + 1);

          if (resetDelay > 0) {
            timeoutId = window.setTimeout(() => {
              setTrigger((prev) => prev + 1);
            }, resetDelay);
          }
        }
      },
      { threshold: 0.4, ...observerOptions }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [observerOptions, resetDelay]);

  return { ref: elementRef, trigger };
};

