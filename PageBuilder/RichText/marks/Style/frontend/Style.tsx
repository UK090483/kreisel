import { styleMarkResult } from "../style.query";

import Typo from "components/Typography/Typography";

const StyleMark: React.FC<React.PropsWithChildren<styleMarkResult>> = (
  props
) => {
  const { tag, children } = props;
  return (
    <Typo as="span" variant={tag || "p"}>
      {children}
    </Typo>
  );
};

export default StyleMark;
