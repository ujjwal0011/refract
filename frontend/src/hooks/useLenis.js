// hooks/useLenis.js
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenisInstance = null;

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
      autoResize: true,
      prevent: (node) => node.classList.contains("no-lenis"),
    });

    lenisInstance = lenis;

    lenis.on("scroll", (e) => {
      // console.log('Lenis scroll:', e);
    });

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenisInstance;
};

export const scrollTo = (target, options = {}) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
  }
};

export const scrollToTop = () => {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.5 });
  }
};

export const stopScroll = () => {
  if (lenisInstance) {
    lenisInstance.stop();
  }
};

export const startScroll = () => {
  if (lenisInstance) {
    lenisInstance.start();
  }
};

export const getLenisInstance = () => lenisInstance;
