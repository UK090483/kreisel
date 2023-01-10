import { TooltipResult } from "./tooltipQuery";
import { MarkProps } from "lib/SanityPageBuilder/lib/RichText";
import Portal from "components/Portal";

import ToolTipComponent from "components/Tooltip";

const Tooltip: React.FC<MarkProps<TooltipResult>> = (props) => {
  const { mark } = props;
  const { title, text, ref, _key } = mark;

  const _title = title || ref?.title;

  return (
    <>
      <span className="underline text-sm sm:text-base" data-tip data-for={_key}>
        {props.children}
      </span>
      <Portal>
        <ToolTipComponent id={_key}>
          <>
            <h1 className=" font-bold pb-4">{_title}</h1>
            {ref?.text}
          </>
        </ToolTipComponent>
      </Portal>
    </>
  );
};

export default Tooltip;
