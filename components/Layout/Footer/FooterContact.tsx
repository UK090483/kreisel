import { Section } from "@components/Section/Section";
import Typo from "@components/Typography/Typography";
import React from "react";
import { PageData } from "pages/[[...slug]]";
import Avatar from "@components/Avatar";
import RichText from "@components/RichText/RichText";
import clsx from "clsx";

interface FooterContactProps {
  data: PageData | null;
}

const FooterContact: React.FC<FooterContactProps> = (props) => {
  const { data } = props;

  if (!data?.footer?.contact) return null;
  const contact = data?.footer?.contact;
  const avatars = contact?.persons;
  const avatarCount = avatars ? avatars.length : 0;

  return (
    <Section width="l" className="grid grid-cols-1 py-24 md:grid-cols-2">
      <div
        className={clsx({
          "flex items-center justify-center ": avatarCount === 1,
          "grid grid-cols-2 ": avatarCount > 1,
        })}
      >
        {avatars?.map((a) => (
          <Avatar
            key={a._id}
            size="m"
            image={a.avatar}
            title={a.name}
            subTitle={a.position}
          />
        ))}
      </div>

      <div className="p-16">
        {contact.content && <RichText content={contact.content} />}
      </div>
    </Section>
  );
};

export default FooterContact;
