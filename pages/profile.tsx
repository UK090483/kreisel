import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { ReactElement, ReactNode } from "react";
import ProfileForm from "@components/Profile/ProfileForm";
import { Section } from "@components/Section/Section";
import { previewClient } from "@services/SanityService/sanity.server";
import { therapistProfileQuery } from "@components/Profile/therapistProfileQuery";

export type TherapistProfile = {};

type ProfileProps = {
  session: Session | null;
  profileData: TherapistProfile;
};

const Profile: React.FC<ProfileProps> & {
  getLayout: (page: ReactElement) => ReactNode;
} = (props) => {
  return (
    <div className=" w-full  ">
      <Section width="l">
        <ProfileForm profileData={props.profileData} />
      </Section>
    </div>
  );
};

Profile.getLayout = function getLayout(page) {
  return <div className="  ">{page}</div>;
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

  const profileData = await previewClient.fetch(
    `*[_type == 'therapist' && email == $email][0]{${therapistProfileQuery}}`,
    { email: session.user?.email }
  );

  return {
    props: {
      session,
      profileData,
    },
  };
};
export default Profile;
