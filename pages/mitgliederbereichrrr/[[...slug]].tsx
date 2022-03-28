import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { getStaticProps } from "pages/[[...slug]]";

type MitgliederBereichProps = {
  session: Session | null;
};

const MitgliederBereich: React.FC<MitgliederBereichProps> = (props) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      MitgliederBereich {props.session?.user?.email}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const result = await getStaticProps({
    params: { slug: ["mitgliederbereich", "page-1"] },
  });

  //@ts-ignore
  const data = result?.props.data;

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
      data,
    },
  };
};

export default MitgliederBereich;
