// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  Formdata,
  validatedFormdataMiddleware,
  formdataMiddleware,
} from "@lib/Api/FormdataMiddleware";

import { use } from "next-api-middleware";
import { object, string, mixed } from "yup";
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

let userSchema = object({
  testKey: string().required(),
  testfile: mixed().required("File is required"),
});

type Data = {
  name: string;
  formData?: Formdata["formData"];
};

//eslint-disable-next-line import/no-unused-modules
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

async function handler(
  req: NextApiRequest & Formdata,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe", formData: req.formData });
}

// eslint-disable-next-line import/no-unused-modules
export default use(
  formdataMiddleware,
  validatedFormdataMiddleware(userSchema)
)(handler);
