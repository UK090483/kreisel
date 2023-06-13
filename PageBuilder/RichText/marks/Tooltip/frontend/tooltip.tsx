import { TooltipResult } from "../tooltip.query";

import Portal from "components/Atoms/Portal";

import ToolTipComponent, { TooltipAnchor } from "components/Atoms/Tooltip";

const Tooltip: React.FC<React.PropsWithChildren<TooltipResult>> = (props) => {
  const { title, text, ref, _key, children } = props;

  const _title = title || ref?.title;
  const _text = text || ref?.text;

  return (
    <>
      <TooltipAnchor className=" underline " id={_key}>
        {children}
      </TooltipAnchor>
      <Portal>
        <ToolTipComponent id={_key}>
          <>
            <h1 className="pb-4 font-bold">{_title}</h1>
            <p>{_text}</p>
          </>
        </ToolTipComponent>
      </Portal>
    </>
  );
};

export default Tooltip;
