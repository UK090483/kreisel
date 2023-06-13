import { useRouter as useNextRouter } from "next/router";

function useRouter() {
  const router = useNextRouter();
  return router;
}

export default useRouter;
