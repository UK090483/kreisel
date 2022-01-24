import SanityImage from "@privateModules/SanityImage";
import Typo from "@components/Typography/Typography";
import { imageMeta, ImageMetaResult } from "@privateModules/SanityImage/query";
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

  const intersection = useIntersection(ref, {});

  const isIntersecting = intersection && intersection.intersectionRatio < 1;

  const isNumber = parseInt(value);

  return (
    <div ref={ref} className=" text-white ">
      <div className="relative w-full   aspect-w-1 aspect-h-1">
        <SanityImage image={image} objectFit="contain" />
      </div>
      {isIntersecting && (
        <Typo variant="h1" hand as="p" className=" text-center text-5xl pt-8 ">
          {isNumber ? <CountUp n={isNumber} /> : value}
        </Typo>
      )}
      <Typo variant="h3" as="p" bold={false} className=" text-center ">
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
