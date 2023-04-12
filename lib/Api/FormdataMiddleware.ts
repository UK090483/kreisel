import formidable from "formidable";

import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-api-middleware";
import { object, string, mixed, ValidationError, AnySchema } from "yup";

let userSchema = object({
  testKey: string().required(),
  testfile: mixed().required("File is required"),
});

export type Formdata = {
  formData?: { fields: formidable.Fields; files: formidable.Files };
};

export type NextApiRequestWithFormdata = NextApiRequest & Formdata;

const form = formidable({ multiples: true });

function mapFields<T>(
  fields: Record<string, T>,
  validatedValues: Record<string, T>
) {
  return Object.keys(fields).reduce((acc, key) => {
    if (validatedValues[key]) {
      return { ...acc, [key]: validatedValues[key] };
    }
    return acc;
  }, {});
}

export const validatedFormdataMiddleware = (schema: AnySchema) => {
  const formdataMiddleware: Middleware<
    NextApiRequestWithFormdata,
    NextApiResponse
  > = async (req, res, next) => {
    const allFields = { ...req.formData?.fields, ...req.formData?.files };
    try {
      const validatedValues = await schema.validate(allFields, {
        stripUnknown: true,
      });
      const validatedFormdata: Formdata["formData"] = {
        fields: mapFields({ ...req.formData?.fields }, validatedValues),
        files: mapFields({ ...req.formData?.files }, validatedValues),
      };
      req.formData = validatedFormdata;
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ error: error.errors.join(", ") });
      }
    }
    await next();
  };

  return formdataMiddleware;
};

export const formdataMiddleware: Middleware<
  NextApiRequestWithFormdata,
  NextApiResponse
> = async (req, res, next) => {
  const formData = await FormdataPromise(req);

  req.formData = formData;
  await next();
};

const FormdataPromise = async (req: NextApiRequest) => {
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve({ fields, files });
      });
    }
  );
};
