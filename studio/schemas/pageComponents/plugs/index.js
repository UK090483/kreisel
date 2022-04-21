import Button from "./Button";
import Spacer from "./Spacer";
import ImageGallery from "./ImageGallery/index";

import GSheet from "./GSheet/GSheet";
import GSheetItem from "./GSheet/GSheetItem";
import Events from "./Events";
import EmbedHTML from "./EmbedHTML";
import Infobox from "./Infobox";
import ImagePlug from "./ImagePlug";

const Plugs = [
  ImagePlug,
  ...Infobox,
  Button,
  Spacer,
  ...ImageGallery,
  EmbedHTML,
  GSheet,
  GSheetItem,

  Events,
];

export default Plugs;
