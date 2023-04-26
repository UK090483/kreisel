import * as React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface ITooltipProps {
  id: string;
  children?: React.ReactNode;
}

const Tooltip: React.FC<ITooltipProps> = (props) => {
  const { children, id } = props;

  return (
    <ReactTooltip
      id={id}
      noArrow
      place="bottom"
      className="z-50 max-w-[calc(100vw-20px)] border-2 !border-primary !bg-primary-xLight !text-font-dark !opacity-100 sm:max-w-[300px]"
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
