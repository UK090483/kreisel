import { Layout } from "components";

const render = (props: Parameters<typeof cy.mountWithContext>[1]) => {
  cy.mountWithContext(
    <Layout>
      <div className="flex h-screen w-full items-center justify-center">
        Content
      </div>
    </Layout>,
    props
  );
};

describe("Layout", () => {
  before(() => {
    cy.viewport("macbook-16");
  });
  it("should render Layout", () => {
    render({});
    cy.get("nav");
    cy.get("main").contains("Content");
    cy.get("footer");
  });
});
