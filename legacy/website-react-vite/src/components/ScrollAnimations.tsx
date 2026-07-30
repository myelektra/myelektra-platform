import { useEffect, useRef, useState, useCallback } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return scrollY;
}

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up';
  stagger?: number;
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className = '',
  animation = 'slide-up',
  stagger = 0
}) => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const baseClass = animation === 'fade' ? 'animate-on-scroll' : 'animate-slide-up';
  const staggerClass = stagger > 0 ? `stagger-${stagger}` : '';

  return (
    <div
      ref={ref}
      className={`${baseClass} ${staggerClass} ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
