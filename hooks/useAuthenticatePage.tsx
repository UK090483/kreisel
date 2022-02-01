import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const useAuthenticatePage = () => {
  const { query } = useRouter();
  const needsAuthCheck =
    query.slug && Array.isArray(query.slug)
      ? query.slug[0] === "mitgliederbereich"
      : query.slug === "mitgliederbereich";

  const session = useSession({
    required: needsAuthCheck,
    onUnauthenticated() {
      signIn();
    },
  });

  const isAuthenticated = session.status === "authenticated";
  const allowRender = needsAuthCheck ? isAuthenticated : true;

  return {
    isAuthenticated,
    allowRender,
  };
};
export default useAuthenticatePage;
