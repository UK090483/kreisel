import Button from "./Button";
import Spacer from "./Spacer";
import ImageGallery from "./ImageGallery/index";
import Image from "./Image";

import GSheet from "./GSheet/GSheet";
import GSheetItem from "./GSheet/GSheetItem";
import Events from "./Events";
import EmbedHTML from "./EmbedHTML";

const Plugs = [
  Button,
  Spacer,
  ...ImageGallery,
  EmbedHTML,
  GSheet,
  GSheetItem,
  Image,
  Events,
];

export default Plugs;
