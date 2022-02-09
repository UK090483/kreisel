import Underline from "@components/Underline";
import { MarkProps } from "@lib/SanityPageBuilder/lib/RichText";
import { AppColor } from "types";

type HandUnderlineMarkProps = {
  color?: AppColor;
  variant: string;
};

const variantMap: { [k: string]: number } = {
  line1: 0,
  line2: 1,
  line3: 2,
  circle1: 3,
  circle2: 4,
};

const HandUnderlineMark: React.FC<MarkProps<HandUnderlineMarkProps>> = (
  props
) => {
  const { color, variant } = props.mark;

  return (
    <Underline color={color} on="init" variant={variantMap[variant]}>
      {props.children}
    </Underline>
  );
};

export default HandUnderlineMark;
