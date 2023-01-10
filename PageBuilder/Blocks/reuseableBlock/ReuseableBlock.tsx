import { IReusableBlockResult } from "./ReusableBlock.query";
import SectionBlock from "../sectionBlock/SectionBlock";

const ReusableBlock: React.FunctionComponent<IReusableBlockResult> = (
  props
) => {
  const item = props.item;
  return <SectionBlock _type="section" {...item} />;
};

export default ReusableBlock;
