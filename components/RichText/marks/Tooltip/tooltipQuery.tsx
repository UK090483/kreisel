export type TooltipResult = {
  ref?: { title?: string | null; text?: string | null };
  title?: string | null;
  text?: string | null;
  _key: string;
};
export const toolTipQuery = `
  _type == "tooltip" => {
   
    _key,
    title,
    text,
    'ref':tooltipRef->{text,title}
    }`;
