import FooterAuthed from "@/components/layouts/LayoutAuthed/AuthedFooter";
import HeaderAuthed from "@/components/layouts/LayoutAuthed/AuthedHeader";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Toaster } from "@/components/ui/toaster"
import { env } from '@/helpers/env';
import { useAppTranslations } from "@/helpers/hooks/use-app-translations";
import useSession from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import React, { ComponentType, ReactNode } from 'react';
import { Helmet } from "react-helmet";
import { CgDebug } from "react-icons/cg";

interface LayoutProps {
  children: ReactNode;
  pageClasses?: string;
  HeaderComponent?: ComponentType<any>;
  FooterComponent?: ComponentType<any>;
  noHeader?: boolean;
  noFooter?: boolean;
}

const renderHeader = (
  { HeaderComponent, noHeader }: {
    HeaderComponent?: ComponentType<any>;
    noHeader?: boolean;
    isAuthenticated?: boolean
  }
): JSX.Element | null => {
  if (noHeader) {
    return null;
  }

  if (HeaderComponent) {
    return <HeaderComponent/>;
  }

  return <HeaderAuthed/>;
};

const renderFooter = (
  { FooterComponent, noFooter }: {
    FooterComponent?: ComponentType<any>;
    noFooter?: boolean;
  }
): JSX.Element | null => {
  if (noFooter) {
    return null;
  }

  if (FooterComponent) {
    return <FooterComponent/>;
  }

  return <FooterAuthed/>;
}

const LayoutAuthed = ({ children, pageClasses, HeaderComponent, FooterComponent, noHeader, noFooter }: LayoutProps) => {
  const { i18n, changeLanguage } = useAppTranslations();
  const session = useSession()

  return (
    <>
      <Helmet bodyAttributes={{ class: cn("layout layout-authed", pageClasses) }}/>
      {renderHeader({ HeaderComponent, noHeader })}
      <div key={session?.lifeAIBridge?.userProfile.user_profile_id} id="main">
        {children}
        {
          env('NEXT_PUBLIC_DEBUG_ENABLED') === "true" && (
            <Drawer direction="bottom">
              <DrawerTrigger className="absolute bottom-2 right-2">
                <CgDebug className="square-4 text-gray-700"/>
              </DrawerTrigger>
              <DrawerContent className="bg-white p-3">
                <pre className="max-w-full text-[10px] white-space-normal break-words max-h-[50vh] overflow-auto">
                  Global Config: {JSON.stringify(window.PUBLIC_CONFIG, null, 2)}
                  <br/>
                  Current Language: {i18n.language}
                  <br/>
                  {JSON.stringify(session, null, 2)}
                </pre>
              </DrawerContent>
            </Drawer>
          )
        }
      </div>
      {renderFooter({ FooterComponent, noFooter })}
      <Toaster/>
    </>
  );
};

export default LayoutAuthed;
