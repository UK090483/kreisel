import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

function useQueryState(key: string) {
  const { query, push, replace } = useRouter();
  const value = query[key];
  const slug = query?.slug
    ? typeof query?.slug === "string"
      ? query?.slug
      : "/" + query?.slug.join("/")
    : "/";

  const SetValue = useCallback((val: string | null) => {
    replace(
      { pathname: slug, query: { ...(val ? { [key]: val } : {}) } },
      { pathname: slug, query: { ...(val ? { [key]: val } : {}) } },
      {
        shallow: true,
      }
    );
  }, []);
  return { value, SetValue };
}

export function useQueryStateActive(key: string, activeKey: string) {
  const [active, SetActive] = useState(false);
  const { value, SetValue } = useQueryState(key);

  useEffect(() => {
    if (value === activeKey && !active) {
      return SetActive(true);
    }
    if (value !== activeKey && active) {
      SetActive(false);
    }
  }, [activeKey, value, active]);

  return { active, SetValue };
}

export default useQueryState;
