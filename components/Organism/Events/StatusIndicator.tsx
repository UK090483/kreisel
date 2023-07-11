import { PureKreisel } from "components/Atoms/Kreisel";
import clsx from "clsx";
import React from "react";

type Props = {
  state?: string;
  loading?: boolean;
  animationDelay?: React.CSSProperties["animationDelay"];
  size?: "m" | "s" | "l";
};

const StatusIndicator = (props: Props) => {
  const { state, loading, animationDelay, size = "m" } = props;
  return (
    <PureKreisel
      style={{ animationDelay }}
      className={clsx(" rounded-full mr-2", {
        "text-green-400  ": state === "open",
        "text-red ": state === "full",
        "text-yellow-400 ": state === "medium",
        "animate-spin": loading,
        "h-6 w-6": size === "m",
        "h-4 w-4": size === "s",
      })}
    />
  );
};

export default StatusIndicator;
