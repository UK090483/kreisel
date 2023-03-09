import { getBlock, getChild, getKey } from "../../helpers/richText";
import InfoboxPlug from "PageBuilder/RichText/Plugs/InfoBoxPlug/frontend/InfoBoxPlug";

import {
  ImageGalleryPlugResult,
  infoBoxPlugQuery,
} from "PageBuilder/RichText/Plugs/InfoBoxPlug/InfoBoxPlug.query";

const render = (
  props?: Partial<
    Parameters<typeof cy.mountPageBuilderComponent<ImageGalleryPlugResult>>[0]
  >
) => {
  cy.mountPageBuilderComponent<ImageGalleryPlugResult>({
    Component: InfoboxPlug,
    blockQuery: infoBoxPlugQuery,

    ...props,
    blockData: {
      _type: "infoBox",
      ...props?.blockData,
    },
  });
};

const getRow = ({ text }: { text: string }) => ({
  _key: getKey(),
  content: [
    getBlock({
      style: "normal",
      children: [getChild({ text })],
    }),
  ],
});
const getItem = ({ rows, title = "a" }: { rows: any; title?: string }) =>
  ({
    _key: getKey(),
    _type: "imageGalleryItem",
    title,
    bgColor: "blue",
    rows,
  } as ImageGalleryPlugResult["items"][0]);

describe("InfoboxPlug", () => {
  it("renders nothing without data", () => {
    render();
    cy.get("[data-cy-root]").should("be.empty");
  });
  it("should render grid", () => {
    render({
      blockData: {
        rows: 4,
        items: [
          getItem({
            rows: [getRow({ text: "row1" }), getRow({ text: "row2" })],
          }),
          getItem({
            rows: [getRow({ text: "row1" }), getRow({ text: "row2" })],
          }),
        ],
      },
    });
    cy.get("[data-cy-root] > div")
      .computedStyle("display")
      .should("eq", "grid");
  });

  it("should ", () => {
    cy.viewport("macbook-15");
    const items = ["A", "B", "C", "D", "E"];
    render({
      blockData: {
        rows: 4,
        items: [
          ...items.map((i) =>
            getItem({
              title: `title_${i}`,
              rows: [
                getRow({ text: `item_${i}1` }),
                getRow({ text: `item_${i}2` }),
                getRow({ text: `item_${i}2` }),
                getRow({ text: `item_${i}2` }),
              ],
            })
          ),
        ],
      },
    });

    items.forEach((i) => {
      cy.contains(`title_${i}`);
      cy.contains(`item_${i}1`);
      cy.contains(`item_${i}2`);
    });
  });
});
