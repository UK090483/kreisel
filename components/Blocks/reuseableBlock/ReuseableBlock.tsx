import SectionBlock from "../sectionBlock/SectionBlock";
import { IReusableBlockResult } from "./ReusableBlock.query";

const ReusableBlock: React.FunctionComponent<IReusableBlockResult> = (
  props
) => {
  const item = props.item;
  return <SectionBlock _type="section" {...item} />;
};

export default ReusableBlock;
