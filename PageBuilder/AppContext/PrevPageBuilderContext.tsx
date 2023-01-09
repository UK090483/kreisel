import { definePreview } from "@sanity/preview-kit";

import { AppContextProviderProps, AppContext } from "./AppContext";

import { config } from "services/SanityService/config";

const usePreview = definePreview({
  projectId: config.projectId,
  dataset: config.dataset,
  includeTypes: undefined,
});

export const PreviewAppContextProvider = (
  props: AppContextProviderProps & { query: string }
) => {
  const { children, query, data: _bla, ...rest } = props;
  const data = usePreview(null, query || "") as AppContextProviderProps["data"];
  return (
    <AppContext.Provider value={{ preview: true, data, ...rest }}>
      {children}
    </AppContext.Provider>
  );
};

export default PreviewAppContextProvider;
