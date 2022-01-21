import React from "react";

type usePageTransitionProps = {
  children: React.ReactNode;
};

const usePageTransition = (props: usePageTransitionProps) => {
  const { children } = props;

  const [displayChildren, setDisplayChildren] = React.useState(children);
  const [transitionStage, setTransitionStage] = React.useState("fadeOut");

  React.useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);

  React.useEffect(() => {
    if (children !== displayChildren) setTransitionStage("fadeOut");
  }, [children, setDisplayChildren, displayChildren]);

  const handleTransitionEnd = () => {
    if (transitionStage === "fadeOut") {
      console.log("fading out");
      setDisplayChildren(children);
      window.scrollTo(0, 0);
      setTransitionStage("fadeIn");
    }
  };

  return { displayChildren, transitionStage, handleTransitionEnd };
};

export default usePageTransition;
