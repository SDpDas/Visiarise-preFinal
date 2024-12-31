import { useState, useEffect } from 'react';

const useIntersectionObserver = (targetId) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const targetElement = document.querySelector(targetId);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [targetId]);

  return inView;
};

export default useIntersectionObserver;
