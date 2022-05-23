import SanityImage from "@lib/SanityImage";
import Typo from "@components/Typography/Typography";
import { imageMeta, ImageMetaResult } from "@lib/SanityImage/query";
import * as React from "react";
import { useIntersection } from "react-use";

export const trustBlockItemQuery = `
    ...,
   'image': image{${imageMeta}},
`;
interface ITrustBlockItemProps {}
export interface ITrustBlockItem {
  image?: ImageMetaResult | null;
  name: string;
  value: string;
  _key: string;
}

const TrustBlockItem: React.FunctionComponent<ITrustBlockItem> = (props) => {
  const { name, value, image } = props;
  const ref = React.useRef<HTMLDivElement | null>(null);

  return (
    <div ref={ref} className="">
      <div className="w-40 relative  mx-auto  h-40">
        <SanityImage image={image} objectFit="contain" />
      </div>

      <Typo variant="h3" as="p" className=" font-sans text-center  pt-8 ">
        {value}
      </Typo>

      <Typo as="p" className=" text-center ">
        {name}
      </Typo>
    </div>
  );
};

export default TrustBlockItem;

const CountUp: React.FC<{ n: number }> = ({ n }) => {
  const [state, setState] = React.useState(0);

  const timer = React.useRef<NodeJS.Timer | null>(null);

  const update = () => {
    timer.current = setTimeout(() => {
      if (state < n) {
        setState((s) => s + (s > 500 ? 10 : 1));
      }
      timer.current && clearTimeout(timer.current);
    }, 5000 / n);
  };

  React.useEffect(() => {
    update();
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [state]);

  return <>{state}</>;
};
