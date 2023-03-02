import {
  AppContextProvider,
  AppContextProviderProps,
} from "PageBuilder/AppContext/AppContext";

type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
    ? Subset<K[attr]> | null
    : K[attr] extends object | null | undefined
    ? Subset<K[attr]> | null | undefined
    : K[attr];
};

type DeepPartialData = Subset<AppContextProviderProps["data"]>;

export type AppContextValue = {
  data?: DeepPartialData;
  hostName?: AppContextProviderProps["hostName"];
};

type AppContextProviderMockProps = {
  children: React.ReactNode;
  value: AppContextValue;
};

const defaultData: AppContextProviderProps["data"] = {
  _id: "testid",
  content: [],
  navigation: [],
};

const defaultValue: AppContextProviderProps = {
  hostName: "testHostname",
  data: defaultData,
};
export const AppContextProviderMock = (props: AppContextProviderMockProps) => {
  const { children, value } = props;

  return (
    //@ts-ignore
    <AppContextProvider {...{ ...defaultValue, ...value }}>
      {children}
    </AppContextProvider>
  );
};
