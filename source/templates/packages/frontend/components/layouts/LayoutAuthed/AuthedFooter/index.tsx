import Container from "@/components/ui/container";
import { useAppTranslations } from "@/helpers/hooks/use-app-translations";
import useSession from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { IoHomeOutline } from "react-icons/io5";

export default function FooterAuthed() {
  const { t } = useAppTranslations();
  const router = useRouter()
  const footerRef = useRef<HTMLDivElement>(null);
  const { lifeAIBridge } = useSession();

  useEffect(() => {
    const handleResize = () => {
      if (footerRef.current) {
        const footerHeight = footerRef.current?.offsetHeight ?? 0;
        document.body.style.setProperty("--footer-height", `${footerHeight}px`);
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

  const links: any = [
    {
      id: 1,
      title: t("common:home"),
      icon: IoHomeOutline,
      href: "/",
    },
  ];

  return (
    <>
      <div id="pre_footer" className="py-6">
        <Container className="grid-cols-max justify-between items-center gap-8">
          <div className="text-sm text-dim-1 text-center">
            {t("common:footer.copyright", {
              defaultValue: "© {{currentYear}} All rights reserved.",
              currentYear: new Date().getFullYear(),
            })}
          </div>
        </Container>
      </div>
      <footer id="footer" ref={footerRef}>
        <Container>
          {links.map((link: any) => {
            const Icon = link.icon;
            const isActive = router.pathname === link.href;

            return (
              <Link
                key={link.id}
                href={link.href}
                {...(
                  link?.onClick ? {
                    onClick: (e) => {
                      e.preventDefault();
                      link.onClick();
                    },
                  } : {}
                )}
                className={cn("flex flex-col justify-center items-center space-y-1", isActive && "text-primary-4")}
              >
                <Icon className="square-6 height-auto"/>
                <span className="text-xs font-medium">{link.title}</span>
              </Link>
            );
          })}
        </Container>
      </footer>
    </>
  );
}
