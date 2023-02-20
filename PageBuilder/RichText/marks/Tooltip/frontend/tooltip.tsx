import { TooltipResult } from "../tooltip.query";

import Portal from "components/Portal";

import ToolTipComponent from "components/Tooltip";

const Tooltip: React.FC<React.PropsWithChildren<TooltipResult>> = (props) => {
  const { title, text, ref, _key, children } = props;

  const _title = title || ref?.title;

  return (
    <>
      <span className="text-sm underline sm:text-base" data-tip data-for={_key}>
        {children}
      </span>
      <Portal>
        <ToolTipComponent id={_key}>
          <>
            <h1 className=" pb-4 font-bold">{_title}</h1>
            {ref?.text}
          </>
        </ToolTipComponent>
      </Portal>
    </>
  );
};

export default Tooltip;
