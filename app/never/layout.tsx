"use client";
/* eslint-disable import/no-unused-modules */
import fetchLayoutData from "./fetchLayoutData";

import { Footer, Header } from "components";

type Props = {
  children: React.ReactNode;
  params: { slug?: string[] };
};

// export const revalidate = 60;

export default async function RootLayout(props: Props) {
  const {
    children,
    params: { slug },
  } = props;

  const isMember = !!(slug && slug[0] === "mitgliederbereich");
  const layout = await fetchLayoutData(isMember ? "memberNav" : "mainNav");
  const { nav, footerInfo, contact } = layout;

  return (
    <>
      <Header items={nav || []} />
      {children}
      <Footer contact={contact} info={footerInfo} />
    </>
  );
}
