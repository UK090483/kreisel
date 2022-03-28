import Link from "next/link";
import FocusTrap from "focus-trap-react";
import { useRouter } from "next/router";
import * as React from "react";
import { useLockBodyScroll } from "react-use";

interface IOverlayProps {}

const Overlay: React.FunctionComponent<IOverlayProps> = (props) => {
  const { children } = props;

  const { query, pathname } = useRouter();

  useLockBodyScroll();

  const baseUrl =
    query.slug && Array.isArray(query.slug)
      ? query.slug.map((i) => i.trim()).join("/")
      : "";

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

        {children}
      </div>
    </FocusTrap>
  );
};

export default Overlay;
