import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { ReactElement, ReactNode } from "react";
import ProfileForm from "@lib/Profile/ProfileForm";
import { previewClient } from "@services/SanityService/sanity.server";

type ProfileProps = {
  session: Session | null;
  profile: Profile;
};

type Profile = {
  firstName: string;
  name: string;
  job: string;
  surgery: string;
  addressSupplement: string;
  street: string;
  city: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  description: string;
  membership: "kreisel" | "fil" | "bvl" | "legaKids";
};

const Profile: React.FC<ProfileProps> & {
  getLayout: (page: ReactElement) => ReactNode;
} = (props) => {
  console.log(props);

  return (
    <div className="w-full flex items-center justify-center">
      <ProfileForm profile={props.profile} />
    </div>
  );
};

Profile.getLayout = function getLayout(page) {
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
    `*[_type == "therapist" && email == '${session.user?.email}' ][0]{...}`
  );

  return {
    props: {
      session,
      profile,
    },
  };
};

export default Profile;
