import React from "react";
import type { NextRouter } from "next/router";
import Router from "next/router";

export function useScrollRestoration(router: NextRouter, delay: number) {
  const restorePosition = React.useRef<{ [k: string]: number }>({});

  const saveScrollPosition = (url: string, pos: number) => {
    restorePosition.current = {
      ...restorePosition.current,
      [url]: pos,
    };
  };

  const updateScrollPosition = (
    url: string,
    restore: React.MutableRefObject<{
      [k: string]: number;
    }>,
    shouldRestore: boolean
  ) => {
    const position = restore.current[url];

    // if we have a saved position and it's a history change, restore position, otherwise set to 0
    setTimeout(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: position && shouldRestore ? position : 0 });
      });
    }, delay + 100);
  };

  React.useEffect(() => {
    let shouldScrollRestore = false;
    window.history.scrollRestoration = "manual";

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      saveScrollPosition(router.asPath, window.scrollY);
      delete event["returnValue"];
    };

    const onRouteChangeStart = () => {
      saveScrollPosition(router.asPath, window.scrollY);
    };

    const onRouteChangeComplete = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      // Bail if we're just changing URL parameters
      if (shallow) return;

      updateScrollPosition(url, restorePosition, shouldScrollRestore);

      // reset if we should restore the scroll position
      shouldScrollRestore = false;
    };

    // save scroll position on route change
    window.addEventListener("beforeunload", onBeforeUnload);
    Router.events.on("routeChangeStart", onRouteChangeStart);

    // restore scroll position after route change completes
    Router.events.on("routeChangeComplete", onRouteChangeComplete);

    // if it's a history change, set to restore scroll position to "true"
    Router.beforePopState((state) => {
      shouldScrollRestore = true;
      state.options.scroll = false;
      return true;
    });

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      Router.events.off("routeChangeStart", onRouteChangeStart);
      Router.events.off("routeChangeComplete", onRouteChangeComplete);
      Router.beforePopState(() => true);
    };
  }, []);
}

export default useScrollRestoration;
