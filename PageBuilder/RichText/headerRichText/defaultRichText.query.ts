import { downloadQuery } from "../marks/Download/download.query";
import { linkMarkQuery } from "../marks/Link/link.query";
import { toolTipQuery } from "../marks/Tooltip/tooltip.query";
import { ImagePlugQuery } from "../Plugs/ImagePlug/imagePlugQuery";

const marksQuery = `
markDefs[]{
  ...,
  ${linkMarkQuery},
  ${toolTipQuery},
  ${downloadQuery},
}
`;

export const headerRichTextQuery = `
content[]{
  ...,
  ${marksQuery},
  ${ImagePlugQuery},
}
`;
