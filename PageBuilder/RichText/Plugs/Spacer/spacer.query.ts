export const spacerPlugQuery = `
_type == "spacer" => {
    _type,
    space
}
`;
export type SpacerPlugResult = {
  _type: "spacer";
  _key: string;
  space: "s" | "m" | "l" | "xl" | "xxl";
};
