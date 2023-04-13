import { systemText } from "../constants";
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
import clsx from "clsx";

type ProfileProps = {
  session: Session | null;
} & fetchProfileDataResult;

const ProfilePage: React.FC<ProfileProps> & {
  getLayout: (page: ReactElement) => ReactNode;
} = (props) => {
  const { allowProfile, allowMember } = props;

  return (
    <div className="w-full items-center justify-center">
      <div className="mb-24 bg-primary-light py-24 px-5">
        <div className=" mx-auto max-w-3xl">
          <h1 className="font-header text-2xl">Dein Kreisel Profil</h1>
          <MemberInfo allowed={allowMember} />
        </div>
      </div>

      {props.profile && (
        <ProfileForm profile={props.profile} allowProfile={allowProfile} />
      )}
    </div>
  );
};

ProfilePage.getLayout = function getLayout(page) {
  return <div>{page}</div>;
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

const MemberInfo = ({ allowed }: { allowed: boolean }) => {
  return (
    <div className={clsx("pt-8 text-sm")}>
      <span
        className={clsx({
          "text-green-600": allowed,
          "text-rose-600": !allowed,
        })}
      >
        {"Status: "}
        {allowed
          ? systemText.profile.status.allowed
          : systemText.profile.status.disallowed}
      </span>
      {!allowed && <p>{systemText.profile.status.disallowedDescription}</p>}
    </div>
  );
};
