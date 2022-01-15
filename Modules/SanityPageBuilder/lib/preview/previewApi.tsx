import exitPreview from "./exitPreview";
import startPreview from "./startPreview";
import { NextApiRequest, NextApiResponse } from "next";

type getPreviewApiProps = {
  root?: string;
  start?: string;
  stop?: string;
};

const defaultProps = {
  root: "preview",
  start: "start",
  stop: "stop",
};

const getPreviewApi = (options?: getPreviewApiProps) => {
  const {
    root = defaultProps["root"],
    start = defaultProps["start"],
    stop = defaultProps["stop"],
  } = options || defaultProps;

  const previewApi = (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req;
    const _root = query[root];
    const type = _root && _root[0];
    if (type === start) {
      return startPreview(req, res);
    }
    if (type === stop) {
      return exitPreview(req, res);
    }
    res.status(200).json({ msg: "nothing to find here" });
  };

  return previewApi;
};

export default getPreviewApi;
