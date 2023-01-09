import { Section } from "@components/Section/Section";
import Typo from "@components/Typography/Typography";
import React from "react";
import { PageData } from "pages/[[...slug]]";
import Avatar from "@components/Avatar";
import RichText from "PageBuilder/RichText/RichText";
import clsx from "clsx";
import { useAppContext } from "PageBuilder/AppContext/AppContext";

interface FooterContactProps {}

const FooterContact: React.FC<FooterContactProps> = (props) => {
  const { data } = useAppContext();

  if (!data?.footer?.contact) return null;
  const contact = data?.footer?.contact;
  const avatars = contact?.persons;
  const avatarCount = avatars ? avatars.length : 0;
  if (!data.footer.contact.content && !data.footer.contact.persons) return null;

  return (
    <Section width="l" className="grid grid-cols-1 py-24 md:grid-cols-2">
      <div className="flex flex-wrap items-center justify-center">
        {avatars?.map((a) => (
          <li key={a._id} className=" list-none w-full md:w-1/2">
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
