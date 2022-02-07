import { useRouter } from "next/router";
import { useEffect } from "react";

// import Cookies from "js-cookie";
// import ReactGA from "react-ga";

const cookieName = "cookie-consent";

function useCookie() {
  const accepted = true;

  const declined = true;

  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    if (accepted) {
      //   ReactGA.initialize("UA-55149650-1");
      //   ReactGA.pageview(location.pathname);
      //   router.events.on("routeChangeStart", () => {
      //     ReactGA.pageview(location.pathname);
      //   });
    }
  }, [accepted, router.events]);

  const acceptCookies = () => {
    // Cookies.set(cookieName, "accepted", { expires: 365 });
  };
  const declineCookies = () => {};

  return { accepted, declined, acceptCookies, declineCookies };
}

export default useCookie;
