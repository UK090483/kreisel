import { sizesList, colorList } from "../../snippets";

const transitions = [
  {
    title: "Übergang Oben",
    name: "transitionTop",
    type: "string",
    options: {
      list: [{ title: "Abgerissen", value: "tearOff" }],
    },
    group: "style",
    fieldset: "transitions",
  },
  {
    title: "Übergang Unten",
    name: "transitionBottom",
    type: "string",
    options: {
      list: [{ title: "Abgerissen", value: "tearOff" }],
    },
    group: "style",
    fieldset: "transitions",
  },
];

const space = [
  {
    title: "Top Space",
    name: "topSpace",
    type: "string",

    options: {
      list: [...sizesList()],
    },
    group: "style",
    fieldset: "transitions",
  },
  {
    title: "Bottom Space",
    name: "bottomSpace",
    type: "string",
    fieldset: "transitions",

    options: {
      list: [...sizesList()],
    },
    group: "style",
  },
];

const blockStyle = () => {
  return [
    {
      title: "Background Color",
      name: "bgColor",
      type: "string",
      options: {
        list: [...colorList()],
      },
      group: "style",
    },
    ...transitions,
    ...space,
  ];
};
export default blockStyle;
