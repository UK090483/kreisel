import { useRouter } from "next/router";

function useQueryState(key: string) {
  const { query, push } = useRouter();
  const value = query[key];
  const slug = query?.slug
    ? typeof query?.slug === "string"
      ? query?.slug
      : "/" + query?.slug.join("/")
    : "/";

  const SetValue = (val: string | null) => {
    push(
      { pathname: slug, query: { ...(val ? { [key]: val } : {}) } },
      { pathname: slug, query: { ...(val ? { [key]: val } : {}) } },
      {
        shallow: true,
      }
    );
  };
  return { value, SetValue };
}

export default useQueryState;
