import exitPreview from "./exitPreview";
import startPreview from "./startPreview";
import { NextApiRequest, NextApiResponse } from "next";
import type { SanityClient } from "@sanity/client/sanityClient";

type getPreviewApiProps = {
  root?: string;
  start?: string;
  stop?: string;
  client: SanityClient | null;
};

const defaultProps = {
  root: "preview",
  start: "start",
  stop: "stop",
  client: null,
};

const getPreviewApi = (options?: getPreviewApiProps) => {
  const {
    root = defaultProps["root"],
    start = defaultProps["start"],
    stop = defaultProps["stop"],
    client,
  } = options || defaultProps;

  if (!client) throw new Error("SanityClient missing in PreviewApi");

  const previewApi = (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req;
    const _root = query[root];
    const type = _root && _root[0];
    if (type === start) {
      return startPreview(req, res, client);
    }
    if (type === stop) {
      return exitPreview(req, res);
    }
    res.status(200).json({ msg: "nothing to find here" });
  };

  return previewApi;
};

export default getPreviewApi;
