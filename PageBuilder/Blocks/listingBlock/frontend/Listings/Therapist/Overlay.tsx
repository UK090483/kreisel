import Typo from "components/Typography/Typography";

import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import { TherapistResult } from "PageBuilder/Blocks/listingBlock/listingBlock.query";
import Link from "next/link";
import FocusTrap from "focus-trap-react";
import { useRouter } from "next/router";
import * as React from "react";
import BlockContent from "@sanity/block-content-to-react";

import { useLockBodyScroll } from "react-use";

interface IOverlayProps {
  items: TherapistResult[];
  therapist?: string | null;
}

const Overlay: React.FunctionComponent<IOverlayProps> = (props) => {
  const { therapist, items } = props;

  const { query } = useRouter();

  useLockBodyScroll();

  const baseUrl =
    query.slug && Array.isArray(query.slug)
      ? query.slug.map((i) => i.trim()).join("/")
      : "";

  const item = React.useMemo(() => {
    return items.find((i) => i._id === therapist);
  }, [therapist, items]);

  return (
    <FocusTrap>
      <div className="relative mx-3 w-full  max-w-5xl animate-slideDown rounded-lg bg-white p-5 md:w-2/3  md:p-10 ">
        <Link
          passHref
          href={{ pathname: baseUrl, query: {} }}
          scroll={false}
          shallow={true}
          className=" absolute top-2 right-2 flex h-5  w-5 items-center justify-center rounded-full bg-primary md:h-10 md:w-10 "
        >
          x
        </Link>

        <Typo bold variant="h4">{`${item?.firstName} ${item?.name}`}</Typo>

        {item?.image && <SanityImage src={item.image} width={150} />}

        <InfoItem title="Beruf" data={item?.jobDescription} />
        <InfoItem title="Email">
          {item?.email && (
            <Typo>
              <a className="text-secondary " href={`mailto:${item?.email}`}>
                {item?.email}
              </a>
            </Typo>
          )}
        </InfoItem>
        <InfoItem title="Website">
          {item?.website && (
            <Typo>
              <a
                className="text-secondary "
                target="_blank"
                rel="noreferrer"
                href={item?.website}
              >
                {item?.website}
              </a>
            </Typo>
          )}
        </InfoItem>

        {item?.description && (
          <div className=" mb-4">
            <Typo variant="body-s" bold>
              Beschreibung
            </Typo>
            <BlockContent blocks={item?.description} />
          </div>
        )}

        <InfoItem title="Ausbildung" data={item?.education} />
        <InfoItem title="Abschlüsse" data={item?.degrees} />
      </div>
    </FocusTrap>
  );
};

const InfoItem: React.FC<{
  data?: undefined | string;
  title?: string;
  children?: React.ReactNode;
}> = ({ data, title, children }) => {
  return data || children ? (
    <>
      {title && (
        <Typo variant="body-s" bold>
          {title}
        </Typo>
      )}
      {data && <Typo>{data}</Typo>}
      {children}
    </>
  ) : null;
};

export default Overlay;
