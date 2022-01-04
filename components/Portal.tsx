import { useEffect, useState } from "react";
//@ts-ignore
import { createPortal } from "react-dom";

const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? //@ts-ignore
      createPortal(children, document.querySelector("#app-portal"))
    : null;
};

export default Portal;
