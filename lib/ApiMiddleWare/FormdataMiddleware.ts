import formidable from "formidable";
import { cloneDeep, forEach, set } from "lodash";

import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-api-middleware";

import { ValidationError, AnySchema } from "yup";

export type FormdataFile = formidable.File;

export type Formdata<T extends any = any> = {
  formData?: {
    fields: formidable.Fields;
    files: formidable.Files;
    merged: Record<string, any>;
    validated?: T;
  };
};

export type NextApiRequestWithFormdata<T extends any = any> = NextApiRequest &
  Formdata<T>;

const form = formidable({ multiples: true });

export const validatedFormdataMiddleware = (schema: AnySchema) => {
  const formdataMiddleware: Middleware<
    NextApiRequestWithFormdata,
    NextApiResponse
  > = async (req, res, next) => {
    if (!req.formData) {
      return await next();
    }

    try {
      const validatedValues = await schema.validate(req.formData?.merged, {
        stripUnknown: true,
      });
      req.formData.validated = validatedValues;
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.errors.join(", ") });
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
  const merged = cloneDeep(formData.fields);
  forEach(formData.files, (value, key) => {
    set(merged, key, value);
  });
  req.formData = { ...formData, merged: merged };
  await next();
};

const FormdataPromise = async (req: NextApiRequest) => {
  return new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
};
