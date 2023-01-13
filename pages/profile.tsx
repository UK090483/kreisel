import ProfileForm from "lib/Profile/ProfileForm";
import {
  fetchProfileData,
  fetchProfileDataResult,
} from "lib/Profile/profileQuery";

import { previewClient } from "@services/SanityService/sanity.server";
import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { ReactElement, ReactNode } from "react";

type ProfileProps = {
  session: Session | null;
} & fetchProfileDataResult;

const ProfilePage: React.FC<ProfileProps> & {
  getLayout: (page: ReactElement) => ReactNode;
} = (props) => {
  const { allowProfile } = props;

  return (
    <div className="w-full items-center justify-center">
      <div className="bg-primary-light py-24 mb-24 px-5">
        <div className=" max-w-3xl mx-auto">
          <h1 className="font-header text-2xl"> Dein Kreisel Profil </h1>
        </div>
      </div>

      {props.profile && (
        <ProfileForm profile={props.profile} allowProfile={allowProfile} />
      )}
    </div>
  );
};

ProfilePage.getLayout = function getLayout(page) {
  return <div className=" ">{page}</div>;
};

// eslint-disable-next-line import/no-unused-modules
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  if (session.user?.email) {
    const profileData = await fetchProfileData(
      session.user?.email,
      previewClient
    );

    return {
      props: {
        session,
        ...profileData,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

// eslint-disable-next-line import/no-unused-modules
export default ProfilePage;
