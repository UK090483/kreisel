import template from "lib/Email/template";

const Email = ({ t }: { t: keyof typeof template }) => {
  return (
    <div
      className=" flex h-screen items-center justify-center "
      dangerouslySetInnerHTML={{ __html: template[t].html }}
    ></div>
  );
};

describe("", () => {
  beforeEach(() => {
    cy.viewport("ipad-2");
  });
  Object.keys(template).forEach((key) => {
    it(`should render ${key}`, () => {
      cy.mount(<Email t={key as keyof typeof template} />);
      cy.screenshot({ overwrite: true });
    });
  });
});
