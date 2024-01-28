const colorizeLog = (text: string) => `\x1b[33m ${text} \x1b[0m`;

export function withTimeLog<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  name: string | ((id: string, ...args: Parameters<T>) => string)
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>) => {
    const id = Date.now().toString(36);
    const _name =
      typeof name === "string" ? `${id} ${name}` : name(id, ...args);

    // eslint-disable-next-line no-console
    console.time(colorizeLog(_name));
    const result = await fn(...args);
    // eslint-disable-next-line no-console
    console.timeEnd(colorizeLog(_name));
    return result;
  };
}

const isServer = typeof window === "undefined";
export const isBrowser = !isServer;
