import { useSession } from "next-auth/react";

const useAuth = () => {
  const { status, data } = useSession();

  return {
    status,
    isAuthenticated: status === "authenticated",
    //@ts-ignore
    member: !!data?.member,
    email: data?.user?.email,
  };
};

export default useAuth;
