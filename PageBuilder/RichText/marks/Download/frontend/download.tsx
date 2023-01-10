import { DownloadResult } from "../download.query";
import { Link } from "components/Link";
import { MarkProps } from "lib/SanityPageBuilder/lib/RichText";

const Download: React.FC<MarkProps<DownloadResult>> = (props) => {
  const { mark } = props;
  const { url } = mark;

  const inner = (
    <span className=" whitespace-nowrap  flex items-center">
      <Icon /> {props.children}
    </span>
  );

  if (!url) return inner;

  return (
    <Link
      external={true}
      href={url}
      className="underline font-bold text-primary"
    >
      {inner}
    </Link>
  );
};

export default Download;

const Icon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    className=" inline mr-2"
  >
    <path d="M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
  </svg>
);