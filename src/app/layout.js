"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

import SideBar from "@/components/sidebar";
import TopBar from "@/components/topbar";

import ReduxProvider from "../../redux/reduxProvider";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "../../context/LanguageProvider";
import { AlertProvider } from "../../context/alertContext";
import { useState } from "react";

const hideFooterRoutes = ["/login"];

function RootLayout({ children }) {
  const pathname = usePathname();
  const shouldShowFooter = !hideFooterRoutes.some(
    (route) => pathname === route
  );

  const [sidebarShow, setSidebarShow] = useState(true);

  return (
    <html lang="en">
      <head>
        <title>QiXiang</title>
      </head>
      <body className="flex overflow-hidden">
        <ReduxProvider>
          <LanguageProvider>
            {shouldShowFooter && <SideBar sidebarShow={sidebarShow} />}
            <div className="w-full h-screen flex flex-col bg-blue-100/30">
              {shouldShowFooter && (
                <TopBar
                  sidebarShow={sidebarShow}
                  setSidebarShow={setSidebarShow}
                />
              )}
              <AlertProvider>
                <div className="w-full h-full p-4">{children}</div>
              </AlertProvider>
            </div>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
