import Layout from "PageBuilder/Layout/Layout";

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
  it("should call push to login and show spinner", () => {
    render({
      context: { data: { slug: "/mitgliederbereich/blaa", _id: "bla" } },
      session: { state: "unauthenticated" },
    });
    cy.get("@push").should("have.been.calledWith", "/auth/login");
    cy.get('[data-test-id="spinner"]');
  });

  it("should show spinner when loading", () => {
    cy.viewport("macbook-16");
    render({
      context: { data: { slug: "/mitgliederbereich", _id: "bla" } },
      session: { state: "loading" },
    });
    cy.get('[data-test-id="spinner"]');
  });
});
