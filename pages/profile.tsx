import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { ReactElement, ReactNode } from "react";
import ProfileForm from "@lib/Profile/ProfileForm";
import { Profile } from "@lib/Profile/profileQuery";
import { previewClient } from "@services/SanityService/sanity.server";

type ProfileProps = {
  session: Session | null;
  profile: Profile;
};

const ProfilePage: React.FC<ProfileProps> & {
  getLayout: (page: ReactElement) => ReactNode;
} = (props) => {
  return (
    <div className="w-full flex items-center justify-center">
      <h1> Profile </h1>
      {props.profile && <ProfileForm profile={props.profile} />}
    </div>
  );
};

ProfilePage.getLayout = function getLayout(page) {
  return <div className=" bg-blue-400 ">{page}</div>;
};

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

  const profile = await previewClient.fetch(
    `*[_type == "therapist" && email == '${session.user?.email}' ][0]{
      name,
      firstName,
      street,
      city,
      website,
      email,
      jobDescription,
      phone,
      zipCode,
      allowProfile,
      allowMember,
    }`
  );

  console.log(profile);

  return {
    props: {
      session,
      profile,
    },
  };
};

export default ProfilePage;
