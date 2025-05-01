import React from "react";

import "@/styles/globals.css";
import localFont from "next/font/local";
import ReduxContainer from "@/redux/ReduxContainer";

const Gilroy = localFont({
  src: [
    {
      path: "../(root)/fonts/Gilroy-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../(root)/fonts/Gilroy-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../(root)/fonts/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../(root)/fonts/Gilroy-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../(root)/fonts/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../(root)/fonts/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../(root)/fonts/Gilroy-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../(root)/fonts/Gilroy-UltraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-Gilroy",
});

export const metadata = {
  title: "Sign Up",
  description: "Authentification",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={Gilroy.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
