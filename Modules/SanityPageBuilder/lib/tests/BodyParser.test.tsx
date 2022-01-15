import { fireEvent, render, screen } from "@testing-library/react";
import { BlockFactory } from "../BlockFactory";
import BodyParser from "../BodyParser";

const TestComponent1 = () => <div>Test1</div>;
const TestComponent2 = (props: { testProp: string }) => (
  <div>{`Test2 ${props.testProp}`}</div>
);
const TestComponent3 = () => <div>Test3</div>;

const rootComponents = [
  {
    component: TestComponent2,
    name: "test2",
    type: "root",
    query: "root",
  },
  {
    component: TestComponent2,
    name: "test3",
    type: "root",
    query: "root",
  },
];

const PackedFactory = () => {
  const factory = BlockFactory.getInstance();
  factory.registerComponents([
    //@ts-ignore
    ...rootComponents,
    {
      component: TestComponent1,
      name: "test",
      //@ts-ignore
      type: "normal",
    },
  ]);
  return factory;
};

describe.only("ComponentFactory", () => {
  it("smoke ", () => {
    render(<BodyParser content={[]} blockFactory={PackedFactory()} />);
  });

  it("should Render Component ", () => {
    render(
      <BodyParser
        //@ts-ignore
        content={[{ _type: "test2", _key: 1, testProp: "testProp" }]}
        blockFactory={PackedFactory()}
      />
    );
    expect(screen.getByText("Test2 testProp")).toBeInTheDocument();
  });

  it("should Render warning if no Component found ", () => {
    render(
      <BodyParser
        //@ts-ignore
        content={[{ _type: "test5", _key: 2, testProp: "testProp" }]}
        blockFactory={PackedFactory()}
      />
    );
    expect(
      screen.getByText(
        'Component "test5" is not defined. Add it to components.js'
      )
    ).toBeInTheDocument();
  });

  it("should Render warning extra Component  ", () => {
    render(
      <BodyParser
        //@ts-ignore
        content={[{ _type: "extraComponent", _key: 3, testProp: "testProp" }]}
        extraComponents={{ extraComponent: TestComponent3() }}
        blockFactory={PackedFactory()}
      />
    );
    expect(screen.getByText("Test3")).toBeInTheDocument();
  });
});
export {};
