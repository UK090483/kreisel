import { LinkResult, linkQuery } from "../../../Navigation/navigation.query";

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
