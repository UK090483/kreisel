import Tooltip, { TooltipAnchor } from "components/Atoms/Tooltip";

const render = () => {
  cy.mount(
    <>
      <TooltipAnchor className="text-sm underline sm:text-base" id="id">
        BOOOOMMMM
      </TooltipAnchor>
      <Tooltip id="id">
        <h1>Tip</h1>
        <div>Tip</div>
      </Tooltip>
    </>
  );
};
describe("<ToolTip/>", () => {
  it("should render Layout", () => {
    render();
  });
});
