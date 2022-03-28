import { createPreviewSubscriptionHook } from "next-sanity";
import { config } from "../config";

const usePreviewSubscription = createPreviewSubscriptionHook({
  ...config,
});

export default usePreviewSubscription;
