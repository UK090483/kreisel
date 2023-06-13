"use client";
import { SessionProvider } from "next-auth/react";

const SessionProviderWrap: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrap;
