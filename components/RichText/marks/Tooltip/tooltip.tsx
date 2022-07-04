import { MarkProps } from "@lib/SanityPageBuilder/lib/RichText";
import { TooltipResult } from "./tooltipQuery";
import ReactTooltip from "react-tooltip";
import Button from "@components/Button/Button";
import Portal from "@components/Portal";

const Tooltip: React.FC<MarkProps<TooltipResult>> = (props) => {
  const { mark } = props;
  const { title, text, ref, _key } = mark;

  const _title = title || ref.title;

  return (
    <>
      <span className="underline text-sm sm:text-base" data-tip data-for={_key}>
        {props.children}
      </span>
      <Portal>
        <ReactTooltip
          // overridePosition={(position) => {
          //   const wWidth = window.innerWidth;
          //   const needFitLeft = position.left < 0;
          //   const needFitRight = position.left + 280 > wWidth;
          //   const needFitTop = position.top < 0;
          //   let p = { ...position };
          //   if (needFitLeft) {
          //     p = { ...p, left: 20 };
          //   }
          //   if (needFitRight) {
          //     p = { ...p, left: wWidth - 300 };
          //   }
          //   if (needFitTop) {
          //     p = { ...p, top: 20 };
          //   }
          //   return p;
          // }}
          id={_key}
          effect="float"
          multiline={true}
          className="tooltip"
        >
          <h1 className=" font-bold pb-4">{_title}</h1>
          {ref.text}
        </ReactTooltip>
      </Portal>
    </>
  );
};

export default Tooltip;
