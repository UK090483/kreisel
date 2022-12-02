import { useSession } from "next-auth/react";

const useAuth = () => {
  const { status } = useSession();

  return {
    status,
    isAuthenticated: status === "authenticated",
  };
};

export default useAuth;
