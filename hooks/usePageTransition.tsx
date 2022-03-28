import { useRouter } from "next/router";
import React from "react";

type usePageTransitionProps = {
  children: React.ReactNode;
  preview?: boolean;
};

const usePageTransition = (props: usePageTransitionProps) => {
  const { children, preview } = props;

  const lastPageId = React.useRef<null | number>(null);

  const [displayChildren, setDisplayChildren] = React.useState(children);
  const [transitionStage, setTransitionStage] = React.useState("fadeOut");

  React.useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);

  React.useEffect(() => {
    //@ts-ignore
    if (children.key !== displayChildren.key) setTransitionStage("fadeOut");
  }, [children, setDisplayChildren, displayChildren]);

  const handleTransitionEnd = () => {
    if (transitionStage === "fadeOut") {
      setDisplayChildren(children);
      window.scrollTo(0, 0);
      setTransitionStage("fadeIn");
    }
  };

  return {
    displayChildren: preview ? children : displayChildren,
    transitionStage,
    handleTransitionEnd,
  };
};

export default usePageTransition;
