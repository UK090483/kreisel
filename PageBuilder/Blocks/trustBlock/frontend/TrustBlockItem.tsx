import { ITrustBlockItem } from "../trustBlock.query";
import SanityImage from "PageBuilder/Image/frontend/SanityImage";
import Typo from "components/Typography/Typography";
import * as React from "react";
import { useIntersection } from "react-use";

interface ITrustBlockItemProps {}

const TrustBlockItem: React.FunctionComponent<ITrustBlockItem> = (props) => {
  const { name, value, image } = props;
  const ref = React.useRef<HTMLDivElement | null>(null);

  const intersection = useIntersection(ref, {});

  const isIntersecting = intersection && intersection.intersectionRatio < 1;

  const isNumber = parseInt(value);

  return (
    <div ref={ref}>
      <div className="relative mx-auto h-40 w-40">
        <SanityImage src={image} fill objectFit="contain" />
      </div>

      <Typo
        variant="h2"
        as="p"
        className="pt-8 text-center font-sans text-5xl "
      >
        {value}
      </Typo>

      <Typo variant="body-l" as="p" className=" text-center ">
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
      if (timer.current) {
        clearTimeout(timer.current);
      }
    }, 5000 / n);
  };

  React.useEffect(() => {
    update();
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return <>{state}</>;
};
