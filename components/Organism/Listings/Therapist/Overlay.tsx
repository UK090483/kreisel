import { TherapistResult } from "./therapist.query";
import Typo from "components/Atoms/Typography/Typography";

import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import { focusOptions, degreeOptions } from "lib/Profile/Fields";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface IOverlayProps {
  items: TherapistResult[];
  therapist?: string | null;
}

const Overlay: React.FunctionComponent<IOverlayProps> = (props) => {
  const { therapist, items } = props;

  const { query } = useRouter();

  // useLockBodyScroll();

  const baseUrl =
    query.slug && Array.isArray(query.slug)
      ? query.slug.map((i) => i.trim()).join("/")
      : "";

  const item = React.useMemo(() => {
    return items.find((i) => i._id === therapist);
  }, [therapist, items]);

  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-white opacity-50 z-50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-auto z-50 data-[state=open]:animate-contentShow fixed top-[40px] md:top-[50%] left-[50%] max-h-[calc(85vh-75px)] md:max-h-[85vh] w-[90vw] max-w-[950px] translate-x-[-50%] md:translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className=" ">
            <Link
              passHref
              href={{ pathname: baseUrl, query: {} }}
              scroll={false}
              shallow={true}
              className=" absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary md:h-10 md:w-10 "
            >
              x
            </Link>

            <Typo bold variant="h4" as="h2">{`${
              item?.title ? item?.title : ""
            } ${item?.firstName} ${item?.name}`}</Typo>

            {item?.image && <SanityImage src={item.image} width={150} />}

            <div className="pt-12"></div>

            <InfoItem
              title="Arbeitsschwerpunkte"
              data={item?.focus
                ?.map((i) =>
                  i ? focusOptions.find((o) => o.value === i)?.title : ""
                )
                .join("\n")}
            />
            <InfoItem
              title="Abschlüsse"
              data={item?.degree
                ?.map((i) =>
                  i ? degreeOptions.find((o) => o.value === i)?.title : ""
                )
                .join("\n")}
            />
            <InfoItem title="Beschreibung" data={item?.description} />
            <InfoItem title="Email">
              {item?.email && (
                <Typo>
                  <a href={`mailto:${item?.email}`}>{item?.email}</a>
                </Typo>
              )}
            </InfoItem>
            <InfoItem title="Tel." show={!!item?.mobile || !!item?.phone}>
              {item?.phone && (
                <Typo space={!item?.mobile}>
                  <a href={`tel:${item?.phone}`}>{item?.phone}</a>
                </Typo>
              )}
              {item?.mobile && (
                <Typo>
                  <a href={`tel:${item?.mobile}`}>{item?.mobile}</a>
                </Typo>
              )}
            </InfoItem>
            <InfoItem title="Website">
              {item?.website && (
                <Typo>
                  <a
                    className="text-secondary"
                    target="_blank"
                    rel="noreferrer"
                    href={item?.website}
                  >
                    {item?.website}
                  </a>
                </Typo>
              )}
            </InfoItem>

            <InfoItem title="Praxis" data={item?.practice} />
            <InfoItem title="Adresse">
              <Typo space={false}>{item?.street}</Typo>
              <Typo>{item?.zipCode + " " + item?.city}</Typo>
            </InfoItem>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Header: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Typo space={false} variant="h5" as="h3" bold>
    {children}
  </Typo>
);

const InfoItem: React.FC<{
  data?: undefined | string;
  title?: string;
  children?: React.ReactNode;
  show?: boolean;
}> = ({ data, title, children, show = true }) => {
  return (data || children) && show ? (
    <>
      {title && <Header>{title}</Header>}
      {data && <Typo className=" whitespace-pre-line">{data}</Typo>}
      {children}
    </>
  ) : null;
};

export default Overlay;
