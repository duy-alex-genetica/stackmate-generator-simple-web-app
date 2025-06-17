import { useEffect, useRef, useState } from "react";

interface FadeInUp3DProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  opacityStart?: number;
}

export default function FadeInUp3D(
  {
    children,
    delay = 0.2,
    duration = 1,
    opacityStart = 0,
  }: FadeInUp3DProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [gsapModules, setGsapModules] = useState<{ gsap?: any; ScrollTrigger?: any }>({});

  useEffect(() => {
    async function loadGSAP() {
      if (typeof window !== "undefined") {
        const gsap = (await import("gsap")).default;
        const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
        gsap.registerPlugin(ScrollTrigger);
        setGsapModules({ gsap, ScrollTrigger });
      }
    }

    loadGSAP();
  }, []);

  useEffect(() => {
    if (gsapModules.gsap && gsapModules.ScrollTrigger && wrapperRef.current) {
      const { gsap, ScrollTrigger } = gsapModules;

      const animation = gsap.fromTo(
        wrapperRef.current,
        {
          opacity: opacityStart,
          transform: "translate3d(0, 50px, 50px)",
        },
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0)",
          duration,
          delay,
          ease: "power2.out",
        }
      );

      const trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top 80%", // Start animation when entering viewport
        animation,
      });

      return () => {
        animation.kill();
        trigger.kill();
      };
    }
  }, [gsapModules, delay, duration, opacityStart]);

  return <div ref={wrapperRef}>{children}</div>;
}
