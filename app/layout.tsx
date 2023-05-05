/* eslint-disable import/no-unused-modules */

import "../styles/globals.css";
import { variables } from "components/fonts";

import { AuthContextProvider } from "@lib/Auth/AuthContext";
import SessionProviderWrap from "@lib/Auth/SessionProvider";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="de">
      <head />
      <body
        className={` text-font antialiased ${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        } ${variables}  font-sans`}
      >
        <SessionProviderWrap>
          <AuthContextProvider>{children}</AuthContextProvider>
        </SessionProviderWrap>

        <div id="app-portal" />
      </body>
    </html>
  );
}
