import { linkQuery, LinkResult } from "PageBuilder/baseQueries";

export const linkMarkQuery = `
_type == "link" => {
  ...,
  'link': link{${linkQuery}},
    asButton,
  }`;

export type LinkMarkPros = {
  link?: LinkResult;
  asButton?: boolean;
};
