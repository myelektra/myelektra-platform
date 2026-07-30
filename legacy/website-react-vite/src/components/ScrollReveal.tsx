import { useEffect } from 'react';

// Mirror the Weebly HTML <script>: observe .anim / .anim-slide and add .visible
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.anim, .anim-slide');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
