import { defineField } from "sanity";
import { AiOutlineDownload } from "react-icons/ai";

export default defineField({
  title: "DownLoad",
  name: "download",
  type: "file",
  icon: AiOutlineDownload,
});
