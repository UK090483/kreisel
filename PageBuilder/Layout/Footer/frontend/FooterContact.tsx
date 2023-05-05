import { IFooterContact } from "../Footer.query";
import { Section } from "components/Section/Section";
import React from "react";
import Avatar from "components/Avatar";
import RichText from "PageBuilder/RichText/PortableText";

interface FooterContactProps {
  contact: IFooterContact;
}

const FooterContact: React.FC<FooterContactProps> = ({ contact }) => {
  const avatars = contact?.persons;
  const avatarCount = avatars ? avatars.length : 0;
  if (!contact.content && !contact.persons) return null;

  return (
    <Section
      bg="primary-xLight"
      width="l"
      className="grid grid-cols-1 py-24 md:grid-cols-2"
    >
      <div className="flex flex-wrap items-center justify-center">
        {avatars?.map((a) => (
          <li key={a._id} className=" w-full list-none md:w-1/2">
            <Avatar
              id={a._id}
              size="m"
              image={a.avatar}
              title={a.name}
              subTitle={a.position}
              description={a.description}
            />
          </li>
        ))}
      </div>

      <div className="p-16">
        {contact.content && <RichText content={contact.content} />}
      </div>
    </Section>
  );
};

export default FooterContact;
