import { useEffect, useRef, useState } from 'react';

export const useViewAnimation = (delay = 0) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          // Simple timeout like Hero component
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.2, // Higher threshold for more stable triggering
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [delay, isVisible]);

  return { elementRef, isVisible };
};
