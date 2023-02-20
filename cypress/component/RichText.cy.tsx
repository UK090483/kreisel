///<reference path="../support/component.tsx" />
import RichText from "../../PageBuilder/RichText/PortableText";
import { PortableTextBlock } from "@portabletext/types/src/portableText";

const h1: PortableTextBlock = {
  _key: "37f40762f09a",
  _type: "block",
  children: [
    {
      _key: "868e2aeee781",
      _type: "span",
      marks: [],
      text: "H1",
    },
  ],
  markDefs: [],
  style: "h1",
};

const getKey = () => Math.random() + "";

const getChild = (props: Partial<PortableTextBlock["children"][0]>) =>
  ({
    _type: "span",
    _key: getKey(),
    text: "testText",
    marks: [],
    ...props,
  } as PortableTextBlock["children"][0]);

const getBlock = (props: Partial<PortableTextBlock>) => {
  return {
    _key: getKey(),
    _type: "block",
    level: 1,

    markDefs: [],

    style: "normal",
    ...props,
  } as PortableTextBlock;
};
const textTypes = ["h1", "h2", "h3", "h4", "normal"];

describe("<RichText>", () => {
  textTypes.map((t) => {
    it(`should render type ${t}`, () => {
      cy.mount(
        <RichText
          content={[
            getBlock({
              style: t,
              children: [getChild({ text: "Blaaaa" })],
            }),
          ]}
        />
      );

      if (t === "normal") {
        cy.get("p");
      } else {
        cy.get(t);
      }
    });
  });

  it("should render bullet List", () => {
    cy.mount(
      <RichText
        content={[
          getBlock({
            listItem: "bullet",
            children: [getChild({ text: "Blaaaa" })],
          }),
        ]}
      />
    );
    cy.get(`[data-testid="list"]`).then((ele) => {
      expect(window.getComputedStyle(ele.get(0)).listStyle).eq(
        "outside none disc"
      );
    });

    cy.get(`[data-testid="listItem"]`).should("contain", "Blaaaa");
  });

  it("should have no  margin if level is > 1", () => {
    cy.mount(
      <RichText
        content={[
          getBlock({
            listItem: "bullet",
            children: [getChild({ text: "Blaaaa" })],
          }),
        ]}
      />
    );
    cy.get(`[data-testid="list"]`).then((ele) =>
      expect(window.getComputedStyle(ele.get(0)).marginBottom).eq("0px")
    );

    cy.get(`[data-testid="listItem"]`).should("contain", "Blaaaa");
  });
  it("should render bullet List", () => {
    cy.mount(
      <RichText
        content={[
          getBlock({
            listItem: "number",
            children: [getChild({ text: "Blaaaa" })],
          }),
        ]}
      />
    );
    cy.get(`[data-testid="list"]`).then((ele) =>
      expect(window.getComputedStyle(ele.get(0)).listStyle).eq(
        "outside none decimal"
      )
    );
    cy.get(`[data-testid="listItem"]`).should("contain", "Blaaaa");
  });

  it("should Render Image", () => {
    cy.mount(
      <RichText
        content={[
          getBlock({
            listItem: "number",
            children: [getChild({ text: "Blaaaa" })],
          }),
        ]}
      />
    );
  });
});
