import * as React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface ITooltipProps {
  id: string;
  children?: React.ReactNode;
}

const Tooltip: React.FC<ITooltipProps> = (props) => {
  const { children } = props;
  // const [isMounted, setMount] = React.useState(false);

  // React.useEffect(() => {
  //   setMount(true);
  // }, []);

  // if (!isMounted) return null;

  return (
    <ReactTooltip
      id={props.id}
      float
      noArrow
      place="bottom"
      className="max-w-[calc(100vw-20px)] border-2 !border-primary !bg-primary-xLight !text-font-dark !opacity-100 sm:max-w-[300px] "
    >
      {children}
    </ReactTooltip>
  );
};

export const TooltipAnchor: React.FC<
  ITooltipProps & { className?: string }
> = ({ children, id, className }) => {
  return (
    <span className={className} data-tooltip-id={id}>
      {children}
    </span>
  );
};

export default Tooltip;
