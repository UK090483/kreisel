import { AiOutlineBulb } from "react-icons/ai";
import { defineField } from "sanity";

export default defineField({
  name: "tooltip",
  type: "tooltipPlug",
  title: "Tooltip",
  icon: AiOutlineBulb,
});
