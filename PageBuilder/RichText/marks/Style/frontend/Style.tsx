import { styleMarkResult } from "../style.query";
import { MarkProps } from "lib/SanityPageBuilder/lib/RichText";
import Typo from "components/Typography/Typography";

const StyleMark: React.FC<MarkProps<styleMarkResult>> = (props) => {
  const { mark, children } = props;
  const { tag } = mark;
  return (
    <Typo as="span" variant={tag || "p"}>
      {children}
    </Typo>
  );
};

export default StyleMark;
