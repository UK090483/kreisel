import React, { useEffect, useRef } from "react";

const useScrollStop = () => {
  const cash = useRef<string>("");

  useEffect(() => {
    const element = document.querySelector("body");
    if (element) {
      cash.current === element.style.overflow;
      console.log(element.style.overflow);
      element.style.overflow = "hidden";
    }

    return () => {
      const element = document.querySelector("body");
      if (element) {
        element.style.overflow = cash.current;
      }
    };
  }, []);
};

export default useScrollStop;
