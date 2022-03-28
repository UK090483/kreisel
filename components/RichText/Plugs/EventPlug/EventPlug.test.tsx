import { mockClient } from "@lib/SanityPageBuilder/lib/MockClient";
import EventPlug, { EventPlugQuery, IEventItem } from "./EventPlug";
import { render, screen } from "@testing-library/react";

const itemsEmpty: IEventItem[] = [{ eventItems: [] }];

const item = {
  description: "testDescription1",
  endDate: "2022-01-06T07:30:00.000Z",
  startDate: "2022-02-06T08:00:00.000Z",
  title: "testTitle1",
};
const itemSameDate = {
  description: "testDescription1",
  endDate: "2022-01-06T07:30:00.000Z",
  startDate: "2022-01-06T08:00:00.000Z",
  title: "testTitle1",
};
const itemsOne: IEventItem[] = [{ eventItems: [item] }];

const customRender = ({ items }: { items?: IEventItem[] }) => {
  render(
    <EventPlug
      _key="dfgdf"
      markKey="f"
      node={{
        _type: "EventPlug",
        _key: "test",
        ...(items ? { items } : {}),
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

  it("EventPlug should handle missing Items", async () => {
    customRender({});
    customRender({ items: itemsEmpty });
  });

  it("EventPlug should render single ", async () => {
    customRender({ items: [{ eventItems: [item] }] });
    expect(screen.getByText("testTitle1")).toBeInTheDocument();
    expect(screen.getByText("testDescription1")).toBeInTheDocument();
  });
  it("EventPlug should render multi ", async () => {
    customRender({
      items: [
        {
          eventItems: [item],
          multi: true,
          title: "multiTitle",
          description: "multiDescription",
        },
      ],
    });
    expect(screen.getByText("testTitle1")).toBeInTheDocument();
    expect(screen.getByText("testDescription1")).toBeInTheDocument();
    expect(screen.getByText("multiTitle")).toBeInTheDocument();
    expect(screen.getByText("multiDescription")).toBeInTheDocument();
  });
  it("EventPlug should handle Date ", async () => {
    customRender({
      items: [
        {
          eventItems: [itemSameDate],
          multi: true,
          title: "multiTitle",
          description: "multiDescription",
        },
      ],
    });
    expect(screen.getByText("testTitle1")).toBeInTheDocument();
    expect(screen.getByText("testDescription1")).toBeInTheDocument();
    expect(screen.getByText("multiTitle")).toBeInTheDocument();
    expect(screen.getByText("multiDescription")).toBeInTheDocument();
  });
});
