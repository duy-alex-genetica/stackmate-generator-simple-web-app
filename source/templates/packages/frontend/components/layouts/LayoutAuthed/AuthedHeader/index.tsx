import Container from "@/components/ui/container";
import React, { useEffect, useRef } from "react";

export default function HeaderAuthed() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current?.offsetHeight ?? 0;
        document.body.style.setProperty("--header-height", `${headerHeight}px`);
      }
    }
    window.addEventListener("resize", handleResize, {
      passive: true,
    });
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header id="header" className="py-2 border-b border-b-gray-100" ref={headerRef}>
      <Container className="grid-cols-max justify-between items-center">
        Header
      </Container>
    </header>
  );
}
