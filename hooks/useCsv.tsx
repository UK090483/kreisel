import { useCallback, useEffect, useState } from "react";

const testUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHXr6t2siosMF236u4fnMZ9UsI7jzx4-EEWHGdZ9WmfAa-M2-YvqtTETF2pKYsY6i2D6pzRt0GEEfe/pub?gid=0&single=true&output=xlsx";

const getCsv = async (url: string) => {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    // eslint-disable-next-line no-console
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

  const load = useCallback(() => {
    if (!url) return;
    getCsv(`/api/cvs?url=${url}`)
      .then((e) => {
        if (e) {
          setLoading(false);
          if (e) {
            setData(e.data);
          }
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, [url]);

  const reload = () => {
    setLoading(true);
    load();
  };

  useEffect(() => {
    if (!url) {
      setError("url missing");
    }
    if (hot) {
      load();
    }
  }, [url, hot, load]);

  return { data, loading, error, reload };
};

export default useCSV;
