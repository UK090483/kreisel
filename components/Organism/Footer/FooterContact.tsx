import Section from "components/Atoms/Section/Section";
import Avatar from "components/Atoms/Avatar";

import Content, {
  ContentSource,
  validateContentSource,
} from "components/Atoms/Content";
import { ImageSrc } from "components/Atoms/Image";
import React from "react";

interface IFooterContact {
  content?: ContentSource;
  persons?: {
    description?: string | null;
    avatar?: ImageSrc;
    name?: string;
    position?: string;
    _id: string;
  }[];
}

const FooterContact: React.FC<IFooterContact> = ({ persons = [], content }) => {
  if (!persons && !content) return null;

  return (
    <Section
      bgColor="primary-xLight"
      width="l"
      className="grid grid-cols-1 py-24 md:grid-cols-2 "
    >
      <div className="flex items-center w-full">
        <div className="flex flex-wrap w-full">
          {persons?.map((a) =>
            a ? (
              <li key={a._id} className="w-full list-none md:w-1/2 self-start">
                <Avatar
                  id={a._id}
                  size="m"
                  image={a.avatar}
                  title={a.name}
                  subTitle={a.position}
                  description={a.description}
                />
              </li>
            ) : null
          )}
        </div>
      </div>

      <div className="p-16">
        {validateContentSource(content) && <Content content={content} />}
      </div>
    </Section>
  );
};

export default FooterContact;
