import ListingBlock from "PageBuilder/Blocks/listingBlock/frontend/ListingsBlock";

import {
  listingBlockQuery,
  ListingBlockProps,
} from "PageBuilder/Blocks/listingBlock/listingBlock.query";
const render = (
  props?: Partial<
    Parameters<typeof cy.mountPageBuilderComponent<ListingBlockProps>>[0]
  >
) => {
  cy.mountPageBuilderComponent<ListingBlockProps>({
    Component: ListingBlock,
    blockQuery: listingBlockQuery,
    ...props,
    blockData: {
      _key: "key",
      _type: "listing",
      ...props?.blockData,
    },
  });
};

describe("ListingBlock Custom", () => {
  it("should Render custom Card", () => {
    render({
      blockData: {
        contentType: "custom",
        customVariant: "smallCard",
        customItems: [
          {
            _key: "ww",
            title: "Title",
            description: "Description",
            image: Cypress.env("imageRef"),
          },
          { _key: "dd", title: "bla" },
        ],
      },
    });

    cy.contains("Title");
    cy.contains("Description");
  });
});

describe("ListingBlock People", () => {
  it("should Render People", () => {
    render({
      dataSet: [
        {
          _type: "person",
          _id: "personId1",
          name: "person1",
          position: "position1",
          avatar: Cypress.env("imageRef"),
        },
        {
          _type: "person",
          _id: "personId2",
          name: "person2",
          position: "position2",
        },
      ],
      blockData: {
        contentType: "people",
        peopleItems: [
          {
            _key: "a",
            _ref: "personId1",
            _type: "reference",
          },
          {
            _key: "b",
            _ref: "personId2",
            _type: "reference",
          },
        ],
      },
    });
    cy.contains("person1");
    cy.contains("position1");
    cy.contains("person2");
    cy.contains("position2");
  });
});

describe("ListingBlock People", () => {
  it("should Render People", () => {
    render({
      dataSet: [
        {
          _type: "person",
          _id: "personId1",
          name: "person1",
          position: "position1",
          avatar: Cypress.env("imageRef"),
        },
        {
          _type: "person",
          _id: "personId2",
          name: "person2",
          position: "position2",
          description: "description2",
        },
      ],
      blockData: {
        contentType: "people",
        peopleItems: [
          {
            _key: "a",
            _ref: "personId1",
            _type: "reference",
          },
          {
            _key: "b",
            _ref: "personId2",
            _type: "reference",
          },
        ],
      },
    });
    cy.contains("person1");
    cy.contains("position1");
    cy.contains("person2");
    cy.contains("position2");
    cy.contains("description2").should("not.exist");
    cy.contains("person2").realHover();
    cy.contains("description2").should("be.visible");
  });
});
