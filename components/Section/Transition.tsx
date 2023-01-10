import clsx from "clsx";

type TransitionProps = {
  color?: string | null;
  pos: "top" | "bottom";
  transition?: null | string;
};

const bottomD =
  "M0 0H1000V18.75L991 72.9167L981 66.6667L972.5 100L961 66.6667L952.5 79.1667L943.5 66.6667L925 79.1667L904.5 58.3333L893 72.9167L882 52.0833L859 72.9167L836 58.3333L792.5 33.3333L771.5 52.0833L750.5 33.3333L731.5 58.3333L712.5 33.3333L700.5 45.8333L689 25L675.5 66.6667L658 33.3333L646.5 45.8333L636.5 33.3333L619.5 52.0833L601.5 39.5833L589 25L578.5 52.0833L558 33.3333L545.5 52.0833L531 41.6667L516.5 25L502 33.3333L478.5 25L454.5 33.3333L406 13.3598L363 16.6667L349.5 44.9735L339.5 25L329.5 41.6667L300.5 16.6667L262 33.3333L244.5 58.3333L225 33.3333L208.5 58.3333H189L158.5 25L126.5 41.6667L111 25L102.5 47.9167L93 25L74 47.9167L55 41.6667L27.5 33.3333H0V0Z";

const overFlowTop =
  "M1000 100H0V81.25L9 27.0833L19 33.3333L27.5 3.8147e-06L39 33.3333L47.5 20.8333L56.5 33.3333L75 20.8333L95.5 41.6667L107 27.0833L118 47.9167L141 27.0833L164 41.6667L207.5 66.6667L228.5 47.9167L249.5 66.6667L268.5 41.6667L287.5 66.6667L299.5 54.1667L311 75L324.5 33.3333L342 66.6667L353.5 54.1667L363.5 66.6667L380.5 47.9167L398.5 60.4167L411 75L421.5 47.9167L442 66.6667L454.5 47.9167L469 58.3333L483.5 75L498 66.6667L521.5 75L545.5 66.6667L594 86.6402L637 83.3333L650.5 55.0265L660.5 75L670.5 58.3333L699.5 83.3333L738 66.6667L755.5 41.6667L775 66.6667L791.5 41.6667H811L841.5 75L873.5 58.3333L889 75L897.5 52.0833L907 75L926 52.0833L945 58.3333L972.5 66.6667H1000V100Z";

const Transition: React.FC<TransitionProps> = ({
  color = "primary",
  pos,
  transition,
}) => {
  if (!transition) return null;
  return (
    <div className="relative ">
      <div
        className={clsx("absolute w-full overflow-hidden", {
          "transform -translate-y-full": pos === "top",
        })}
      >
        <svg
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          className={clsx(
            " fill-current h-8  w-[300vw] md:w-[150vw] lg:w-full",
            {
              "text-white": color === "white",
              "text-primary": color === "primary",
              "text-primary-light": color === "primary-light",
              "text-secondary": color === "secondary",
              "text-secondary-light": color === "secondary-light",
              "text-grey": color === "grey",
              "text-grey-light": color === "grey-light",
            }
          )}
        >
          <path d={pos === "top" ? overFlowTop : bottomD} />
        </svg>
      </div>
    </div>
  );
};

export default Transition;
