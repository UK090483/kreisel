import EventPlug from "./EventPlug";
import { EventPlugQuery } from "../eventPlug.query";
import { mockClient } from "lib/SanityPageBuilder/lib/MockClient";
import { render } from "@testing-library/react";

const customRender = () => {
  render(
    <EventPlug
      _key="key"
      markKey="f"
      node={{
        _type: "EventPlug",
        _key: "test",
      }}
    />
  );
};

describe("EventPlug", () => {
  it("EventPlugQuery should be valid", async () => {
    await mockClient({ database: [] }).fetch(`*[_type == "page"]{
            'content':content[]{
              ${EventPlugQuery}
            }
          }`);
  });
});
