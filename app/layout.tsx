/* eslint-disable import/no-unused-modules */

import "../styles/globals.css";
import { variables } from "styles/fonts";

import { AuthContextProvider } from "@lib/Auth/AuthContext";

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
        <AuthContextProvider>{children}</AuthContextProvider>

        <div id="app-portal" />
      </body>
    </html>
  );
}
