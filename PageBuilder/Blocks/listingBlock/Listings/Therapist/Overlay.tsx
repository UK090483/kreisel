import Typo from "@components/Typography/Typography";

import Link from "next/link";
import FocusTrap from "focus-trap-react";
import { useRouter } from "next/router";
import * as React from "react";
import BlockContent, {
  BlockContentProps,
  Serializers,
} from "@sanity/block-content-to-react";

import useScrollStop from "@hooks/useScrollStop";
import { useLockBodyScroll } from "react-use";
import SanityImage from "@lib/SanityImage";
import { TherapistResult } from "PageBuilder/Blocks/listingBlock/listingBlockQuery";

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
  }, [therapist]);

  return (
    <FocusTrap>
      <div className="animate-slideDown relative w-full  md:w-2/3 mx-3 max-w-5xl rounded-lg p-5 md:p-10  bg-white ">
        <Link
          passHref
          href={{ pathname: baseUrl, query: {} }}
          scroll={false}
          shallow={true}
        >
          <a className=" absolute top-2 right-2 w-5 h-5  md:w-10 md:h-10 bg-primary flex justify-center items-center rounded-full ">
            x
          </a>
        </Link>

        <Typo bold variant="h4">{`${item?.firstName} ${item?.name}`}</Typo>

        {item?.image && (
          <SanityImage image={item.image} width={150} layout="fixed" />
        )}

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

const InfoItem: React.FC<{ data?: undefined | string; title?: string }> = ({
  data,
  title,
  children,
}) => {
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
