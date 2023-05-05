import { downloadQuery } from "../marks/Download/download.query";
import { linkMarkQuery } from "../marks/Link/link.query";
import { toolTipQuery } from "../marks/Tooltip/tooltip.query";
import { EventPlugQuery } from "../Plugs/EventPlug/eventPlug.query";
import { GSheetPlugQuery } from "../Plugs/GSheet/frontend/Gsheet";
import { imageGalleryPlugQuery } from "../Plugs/ImageGaleriePlug/ImageGaleriePlug.query";
import { ImagePlugQuery } from "../Plugs/ImagePlug/imagePlugQuery";
import { infoBoxPlugQuery } from "../Plugs/InfoBoxPlug/InfoBoxPlug.query";
import { spacerPlugQuery } from "../Plugs/Spacer/spacer.query";

const marksQuery = `
markDefs[]{
  ...,
  ${linkMarkQuery},
  ${toolTipQuery},
  ${downloadQuery},
}
`;
export const richTextQuery = `
content[]{
  ...,
  ${marksQuery},
  ${spacerPlugQuery},
  ${imageGalleryPlugQuery},
  ${ImagePlugQuery},
  ${GSheetPlugQuery},
  ${EventPlugQuery},
  ${infoBoxPlugQuery},
}
`;
