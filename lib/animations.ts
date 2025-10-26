/**
 * Comprehensive Animation Library for Juspay Dashboard
 * 
 * This library provides a collection of reusable animations and microinteractions
 * that enhance the user experience with smooth, meaningful transitions.
 */

// Animation duration constants
export const durations = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
} as const;

// Easing functions
export const easings = {
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
  easeInOut: 'cubic-bezier(0.87, 0, 0.13, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

// Predefined animation classes
export const animations = {
  // Fade animations
  fadeIn: 'animate-in fade-in-0 duration-300',
  fadeOut: 'animate-out fade-out-0 duration-300',
  fadeInUp: 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500',
  fadeInDown: 'animate-in fade-in-0 slide-in-from-top-4 duration-500',
  fadeInLeft: 'animate-in fade-in-0 slide-in-from-left-4 duration-500',
  fadeInRight: 'animate-in fade-in-0 slide-in-from-right-4 duration-500',

  // Scale animations
  scaleIn: 'animate-in zoom-in-95 duration-300',
  scaleOut: 'animate-out zoom-out-95 duration-300',
  scaleUp: 'hover:scale-105 transition-transform duration-200',
  scaleDown: 'hover:scale-95 transition-transform duration-200',

  // Slide animations
  slideInUp: 'animate-in slide-in-from-bottom-4 duration-500',
  slideInDown: 'animate-in slide-in-from-top-4 duration-500',
  slideInLeft: 'animate-in slide-in-from-left-4 duration-500',
  slideInRight: 'animate-in slide-in-from-right-4 duration-500',

  // Rotation animations
  rotateIn: 'animate-in rotate-in-12 duration-500',
  rotateOut: 'animate-out rotate-out-12 duration-500',
  spin: 'animate-spin duration-1000',

  // Bounce animations
  bounceIn: 'animate-in bounce-in-0 duration-500',
  bounceOut: 'animate-out bounce-out-0 duration-500',

  // Pulse animations
  pulse: 'animate-pulse duration-1000',
  ping: 'animate-ping duration-1000',

  // Custom microinteractions
  hoverLift: 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out',
  hoverGlow: 'hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300',
  buttonPress: 'active:scale-95 transition-transform duration-100',
  cardHover: 'hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out',
  iconHover: 'hover:scale-110 transition-transform duration-200',
  textHover: 'hover:text-blue-600 transition-colors duration-200',

  // Loading animations
  shimmer: 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]',
  skeleton: 'animate-pulse bg-gray-200 rounded',
  loadingDots: 'animate-bounce',

  // Page transitions
  pageEnter: 'animate-in fade-in-0 slide-in-from-bottom-8 duration-700',
  pageExit: 'animate-out fade-out-0 slide-out-to-top-8 duration-300',

  // Stagger animations
  staggerChildren: 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500',
} as const;

// Stagger animation utility
export function createStaggerAnimation(delay: number = 100) {
  return {
    animationDelay: `${delay}ms`,
    transitionDelay: `${delay}ms`,
  };
}

// Custom CSS animations for advanced effects
export const customAnimations = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes wiggle {
    0%, 7% { transform: rotateZ(0); }
    15% { transform: rotateZ(-15deg); }
    20% { transform: rotateZ(10deg); }
    25% { transform: rotateZ(-10deg); }
    30% { transform: rotateZ(6deg); }
    35% { transform: rotateZ(-4deg); }
    40%, 100% { transform: rotateZ(0); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes slideInFromLeft {
    0% { transform: translateX(-100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideInFromRight {
    0% { transform: translateX(100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideInFromTop {
    0% { transform: translateY(-100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideInFromBottom {
    0% { transform: translateY(100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  @keyframes scaleIn {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes fadeInUp {
    0% { transform: translateY(30px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  @keyframes fadeInDown {
    0% { transform: translateY(-30px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  @keyframes fadeInLeft {
    0% { transform: translateX(-30px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }

  @keyframes fadeInRight {
    0% { transform: translateX(30px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }

  @keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes rotateIn {
    0% { transform: rotate(-200deg); opacity: 0; }
    100% { transform: rotate(0deg); opacity: 1; }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
    50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6); }
  }

  @keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }

  @keyframes countUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Custom animation classes */
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-wiggle { animation: wiggle 1s ease-in-out; }
  .animate-shimmer { animation: shimmer 2s linear infinite; }
  .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
  .animate-slide-in-left { animation: slideInFromLeft 0.5s ease-out; }
  .animate-slide-in-right { animation: slideInFromRight 0.5s ease-out; }
  .animate-slide-in-top { animation: slideInFromTop 0.5s ease-out; }
  .animate-slide-in-bottom { animation: slideInFromBottom 0.5s ease-out; }
  .animate-scale-in { animation: scaleIn 0.3s ease-out; }
  .animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
  .animate-fade-in-down { animation: fadeInDown 0.6s ease-out; }
  .animate-fade-in-left { animation: fadeInLeft 0.6s ease-out; }
  .animate-fade-in-right { animation: fadeInRight 0.6s ease-out; }
  .animate-bounce-in { animation: bounceIn 0.6s ease-out; }
  .animate-rotate-in { animation: rotateIn 0.6s ease-out; }
  .animate-glow { animation: glow 2s ease-in-out infinite alternate; }
  .animate-progress { animation: progress 2s ease-out; }
  .animate-count-up { animation: countUp 0.8s ease-out; }

  /* Hover effects */
  .hover-float:hover { animation: float 2s ease-in-out infinite; }
  .hover-wiggle:hover { animation: wiggle 0.5s ease-in-out; }
  .hover-glow:hover { animation: glow 1s ease-in-out infinite alternate; }
  .hover-scale:hover { transform: scale(1.05); transition: transform 0.2s ease-out; }
  .hover-lift:hover { transform: translateY(-2px); transition: transform 0.2s ease-out; }

  /* Focus effects */
  .focus-glow:focus { animation: glow 1s ease-in-out infinite alternate; }
  .focus-scale:focus { transform: scale(1.02); transition: transform 0.1s ease-out; }

  /* Loading states */
  .loading-shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  /* Stagger animations */
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }

  /* Responsive animations */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// Animation presets for common UI patterns
export const animationPresets = {
  // Card animations
  card: {
    enter: 'animate-fade-in-up',
    hover: 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
    exit: 'animate-out fade-out-0 duration-200',
  },

  // Button animations
  button: {
    hover: 'hover:scale-105 transition-transform duration-200',
    press: 'active:scale-95 transition-transform duration-100',
    loading: 'animate-pulse',
  },

  // Modal animations
  modal: {
    overlay: 'animate-in fade-in-0 duration-300',
    content: 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500',
    exit: 'animate-out fade-out-0 slide-out-to-bottom-4 duration-300',
  },

  // List animations
  list: {
    item: 'animate-fade-in-up',
    stagger: 'stagger-1',
  },

  // Chart animations
  chart: {
    bar: 'animate-scale-in',
    line: 'animate-fade-in-up',
    pie: 'animate-rotate-in',
  },

  // Navigation animations
  nav: {
    item: 'hover:scale-105 transition-transform duration-200',
    active: 'animate-glow',
    dropdown: 'animate-slide-in-top',
  },

  // Form animations
  form: {
    field: 'focus:scale-105 transition-transform duration-200',
    error: 'animate-wiggle',
    success: 'animate-bounce-in',
  },
} as const;

// Utility function to create staggered animations
export function createStaggeredAnimation(
  items: any[],
  baseDelay: number = 100,
  animationClass: string = 'animate-fade-in-up'
) {
  return items.map((_, index) => ({
    className: `${animationClass} stagger-${index + 1}`,
    style: {
      animationDelay: `${index * baseDelay}ms`,
      transitionDelay: `${index * baseDelay}ms`,
    },
  }));
}

// Intersection Observer hook for scroll-triggered animations
export function useIntersectionAnimation(
  threshold: number = 0.1,
  rootMargin: string = '0px'
) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

// Performance-optimized animation hook
export function useAnimationFrame(callback: () => void) {
  const requestRef = React.useRef<number | undefined>(undefined);
  const previousTimeRef = React.useRef<number | undefined>(undefined);

  const animate = React.useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback();
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
}

// Export React for the hooks
import * as React from 'react';