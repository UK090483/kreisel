"use Client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseAnimationDelayState = {
  render: boolean;
  dir: "in" | "out" | "init";
  phase: "start" | "running" | "done" | "init";
};

type UseAnimationDelayProps = {
  delay: number;
  listener?: boolean;
};
const useAnimationDelay = ({ delay, listener }: UseAnimationDelayProps) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [allState, setState] = useState<UseAnimationDelayState>({
    render: false,
    dir: "init",
    phase: "init",
  });

  const { render, dir, phase } = allState;

  const trigger = useCallback((dir: boolean) => {
    if (dir) {
      return setState((oS) => ({
        ...oS,
        dir: "in",
        phase: "start",
        render: true,
      }));
    }
    return setState((oS) => ({
      ...oS,
      dir: "out",
      phase: "start",
    }));
  }, []);

  useEffect(() => {
    trigger(!!listener);
  }, [listener, trigger]);

  useEffect(() => {
    const tO = timeout.current;

    if (dir === "in" && phase === "start") {
      window.requestAnimationFrame(() => {
        setTimeout(() => {
          setState((oS) => ({ ...oS, phase: "running" }));
        }, 5);
      });

      timeout.current = setTimeout(() => {
        setState((oS) => ({ ...oS, phase: "done" }));
      }, delay);
    }

    if (dir === "out" && phase === "start") {
      window.requestAnimationFrame(() => {
        setState((oS) => ({ ...oS, phase: "running" }));
      });
      timeout.current = setTimeout(() => {
        setState((oS) => ({
          ...oS,
          render: false,
          phase: "init",
        }));
      }, delay);
    }

    return () => {
      if (tO) {
        window.clearTimeout(tO);
      }
    };
  }, [dir, phase, delay]);

  return {
    render,
    dir,
    phase,
    animation:
      (dir === "in" && (phase === "done" || phase === "running")) ||
      (dir === "out" && phase === "start"),
  };
};

export default useAnimationDelay;
