import { parse, evaluate } from "groq-js";

type runSanityQueryProps = {
  blockQuery?: string;
  blockData?: { [k: string]: any };
  query?: string;
  dataSet?: any[];
};
export const runSanityQuery = async ({
  blockQuery,
  blockData,
  query,
  dataSet = [],
}: runSanityQueryProps) => {
  let queryType = "default";
  let _query = query;
  let _dataSet = [{ ...Cypress.env("image") }, dataSet];

  if (blockQuery) {
    queryType = "block";
    _query = `*[_type == "testitem"][0]{'content':content[]{
          ${blockQuery}
        }}`;
    _dataSet = [..._dataSet, { _type: "testitem", content: [blockData] }];
  }

  const tree = parse(_query);
  let value = await evaluate(tree, { dataset: [..._dataSet] });
  let result = await value.get();

  if (queryType === "block") {
    return result?.content[0];
  }
  return result;
};
