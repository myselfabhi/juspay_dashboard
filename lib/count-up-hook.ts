"use client";

import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  duration?: number;
  startOnMount?: boolean;
  delay?: number;
}

export function useCountUp(
  endValue: number,
  options: UseCountUpOptions = {}
) {
  const {
    duration = 2000,
    startOnMount = true,
    delay = 0,
  } = options;

  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!startOnMount) return;

    const startAnimation = () => {
      setIsAnimating(true);
      setCount(0);
      
      const startTime = Date.now() + delay;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentCount = Math.floor(progress * endValue);
        setCount(currentCount);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setCount(endValue);
          setIsAnimating(false);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay to ensure component is mounted
    const timeoutId = setTimeout(startAnimation, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [endValue, duration, delay, startOnMount]);

  return {
    count,
    isAnimating,
  };
}

// Hook for intersection observer triggered count-up
export function useCountUpOnScroll(
  endValue: number,
  options: UseCountUpOptions & { threshold?: number; rootMargin?: string } = {}
) {
  const { threshold = 0.1, rootMargin = '0px', ...countUpOptions } = options;
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { count, isAnimating } = useCountUp(endValue, {
    ...countUpOptions,
    startOnMount: false,
  });

  useEffect(() => {
    if (hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          // Trigger the animation by updating a dependency
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasTriggered, threshold, rootMargin]);

  return {
    count: hasTriggered ? count : 0,
    isAnimating,
    ref,
  };
}

// Utility function to format numbers with commas
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Utility function to format currency
export function formatCurrency(num: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

// Utility function to format percentage
export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`;
}