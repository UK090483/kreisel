import { Adapter } from "next-auth/adapters";

const AdapterLogger: (adapter: Adapter) => Adapter = (adapter) => {
  const handler: ProxyHandler<Adapter> = {
    get(target, prop) {
      const res = target[prop as keyof Adapter];

      if (typeof res === "function") {
        return (...rest: any[]) => {
          console.log(prop.toString().toUpperCase() + " called");
          console.log("params", rest);
          //@ts-ignore
          return res.call(target, rest);
        };
      }

      return target[prop as keyof Adapter];
    },
  };

  return new Proxy(adapter, handler) as Adapter;
};

export default AdapterLogger;
