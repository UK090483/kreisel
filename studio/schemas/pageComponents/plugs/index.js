import Button from "./Button";
import Spacer from "./Spacer";
import ImageGallery from "./ImageGallery/index";
import Embed from "./Embed";
import Image from "./Image";

import GSheet from "./GSheet/GSheet";
import GSheetItem from "./GSheet/GSheetItem";

const Plugs = [
  Button,
  Spacer,
  ...ImageGallery,
  Embed,
  GSheet,
  GSheetItem,
  Image,
];

export default Plugs;
