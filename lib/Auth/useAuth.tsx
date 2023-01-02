import { useSession } from "next-auth/react";

const useAuth = () => {
  const { status, data } = useSession();

  console.log(data);

  return {
    status,
    isAuthenticated: status === "authenticated",
  };
};

export default useAuth;
