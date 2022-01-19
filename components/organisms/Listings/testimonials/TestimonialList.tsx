import { ITestimonialItem } from "@components/Blocks/listingBlock/ListingsBlock";
import * as React from "react";
import TestimonialListItem from "./TestimonialListItem";

interface ITestimonialListProps {
  items: ITestimonialItem[];
}

const TestimonialList: React.FunctionComponent<ITestimonialListProps> = (
  props
) => {
  const { items = [] } = props;

  const [item, setItem] = React.useState<[number, number]>([0, -1]);

  const [animate, setAnimate] = React.useState<null | "out" | "in">(null);

  const nextItem = () => {
    setAnimate("out");
    setItem([(item[0] + 1) % items.length, item[1]]);
  };

  React.useEffect(() => {
    if (item[0] === -1) return;
  }, [item]);

  if (items.length < 1) return null;
  return (
    <div onClick={nextItem}>{<TestimonialListItem {...items[item[0]]} />}</div>
  );
};

export default TestimonialList;
