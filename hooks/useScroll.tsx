import React from "react";
const isBrowser = typeof window !== "undefined";

const useScroll = (height: number) => {
  const [state, setState] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isBrowser) return;
    const handler = () => {
      const { pageYOffset } = window;
      if (pageYOffset > height && !state) {
        console.log("over");
        return setState(true);
      }

      if (pageYOffset < height && state) {
        console.log("under");
        return setState(false);
      }
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [state]);

  return state;
};

export default useScroll;
