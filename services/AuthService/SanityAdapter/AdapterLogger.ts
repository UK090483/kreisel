import {
  Adapter,
  AdapterUser,
  VerificationToken,
  AdapterSession,
} from "next-auth/adapters";

const AdapterLogger: (adapter: Adapter) => Adapter = (adapter) => {
  Object.keys(adapter).forEach((key) => {
    const _key = key as keyof Adapter;
    //@ts-ignore
    adapter[_key] = async (...params) => {
      console.log(_key + "called");

      //@ts-ignore
      return await adapter[_key](...params);
    };
  });

  return adapter;
};

export default AdapterLogger;
