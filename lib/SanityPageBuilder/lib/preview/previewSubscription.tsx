import { config } from "../config";
import { createPreviewSubscriptionHook } from "next-sanity";

const usePreviewSubscription = createPreviewSubscriptionHook({
  ...config,
});

export default usePreviewSubscription;
