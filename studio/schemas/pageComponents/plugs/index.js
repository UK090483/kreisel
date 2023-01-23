import Button from "./Button";
import Spacer from "./Spacer";
import ImageGallery from "./ImageGallery/index";

import GSheet from "./GSheet/GSheet";
import GSheetItem from "./GSheet/GSheetItem";
import EmbedHTML from "./EmbedHTML";
import Infobox from "./Infobox";
// import ImagePlug from "./ImagePlug";

const Plugs = [
  // ImagePlug,
  ...Infobox,
  Button,
  Spacer,
  ...ImageGallery,
  EmbedHTML,
  GSheet,
  GSheetItem,
];

export default Plugs;
