import { useEffect, useState } from "react";

const testUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHXr6t2siosMF236u4fnMZ9UsI7jzx4-EEWHGdZ9WmfAa-M2-YvqtTETF2pKYsY6i2D6pzRt0GEEfe/pub?gid=0&single=true&output=xlsx";

const getCsv = async (url: string) => {
  try {
    const res = await fetch(url);
    const res2 = await fetch(testUrl);
    const res2text = await res2.text();
    console.log(res2text);
    return await res.text();
  } catch (error) {
    console.error(error);
  }
};
type useCSVProps = {
  hot?: boolean;
  url?: string | null;
};

type DataResultItem = { row: { [k: string]: string }; values: string[] };
type DataResult = DataResultItem[];

const useCSV = (props?: useCSVProps) => {
  const hot = props?.hot || false;
  const url = props?.url;

  const [data, setData] = useState<null | DataResult>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(false);

  const load = () => {
    if (!url) return;
    getCsv(url)
      .then((e) => {
        if (e) {
          setLoading(false);
          if (e) {
            setData(csvJSON(e));
          }
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  const reload = () => {
    setLoading(true);
    load();
  };

  useEffect(() => {
    if (!url) {
      console.error("url missing in useCsv.tsx");
      setError("url missing");
    }
    if (hot) {
      load();
    }
  }, []);

  return { data, loading, error, reload };
};

export default useCSV;

const csvJSON = (csvText: string): DataResult => {
  const linesArray = csvText.split("\r\n");
  const header = linesArray[0].split(",");
  linesArray.shift();
  const obj: DataResultItem[] = [];

  linesArray.forEach((line) => {
    const lineArray = CSVtoArray(line);

    const res: DataResultItem = { row: {}, values: [] };

    if (!lineArray) {
      obj.push(res);
      return;
    }
    header.forEach((head, index) => {
      res.row[head] = lineArray[index];
      res.values.push(lineArray[index]);
    });
    obj.push(res);
  });
  return obj;
};

// stolen from :https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data

function CSVtoArray(text: string) {
  var re_valid =
    /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  var re_value =
    /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return null;
  var a = []; // Initialize array to receive values.
  text.replace(
    re_value, // "Walk" the string using replace with callback.
    function (m0, m1, m2, m3) {
      // Remove backslash from \' in single quoted values.
      if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
      // Remove backslash from \" in double quoted values.
      else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
      else if (m3 !== undefined) a.push(m3);
      return ""; // Return empty string.
    }
  );
  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push("");
  return a;
}
