import { PayloadDelta, UpdateEventParser } from "./EventManager";
import { isObject, isEqual, uniq } from "lodash";

const parse: UpdateEventParser<any> = (input) => {
  if (!isObject(input?.before) && !isObject(input?.after)) return null;
  if (!isObject(input?.before)) return { ...input, before: null, delta: null };
  if (!isObject(input?.after)) return { ...input, after: null, delta: null };
  const delta: PayloadDelta<any> = {};
  const allKeys = uniq([
    ...Object.keys(input?.after),
    ...Object.keys(input?.before),
  ]);
  allKeys.forEach((k) => {
    if (!isEqual(input?.after[k], input?.before[k])) {
      delta[k] = { before: input?.before[k], after: input?.after[k] };
    }
  });
  return { ...input, delta };
};

export default parse;
