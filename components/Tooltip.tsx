import * as React from "react";
import ReactTooltip from "react-tooltip";

interface ITooltipProps {
  id: string;
}

const Tooltip: React.FC<ITooltipProps> = (props) => {
  const { children } = props;
  const [isMounted, setMount] = React.useState(false);

  React.useEffect(() => {
    setMount(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ReactTooltip
      overridePosition={(position) => {
        const wWidth = window.innerWidth;
        const needFitLeft = position.left < 0;
        const needFitRight = position.left + 280 > wWidth;
        const needFitTop = position.top < 0;
        let p = { ...position };
        if (needFitLeft) {
          p = { ...p, left: 20 };
        }
        if (needFitRight) {
          p = { ...p, left: wWidth - 300 };
        }
        if (needFitTop) {
          p = { ...p, top: 20 };
        }
        return p;
      }}
      id={props.id}
      effect="float"
      // multiline={true}
      className="tooltip !max-w-xs"
    >
      {children}
    </ReactTooltip>
  );
};

export default Tooltip;
