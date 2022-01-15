import { render, screen } from "@testing-library/react";
import { BlockFactory } from "../BlockFactory";

const TestComponent1 = () => <div>Test1</div>;
const TestComponent2 = (props: { testProp: string }) => (
  <div>{`Test2 ${props.testProp}`}</div>
);

const rootComponents = [
  {
    component: TestComponent2,
    name: "test2",
    query: "root",
  },
  {
    component: TestComponent2,
    name: "test3",
    query: "root2",
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

describe("ComponentFactory", () => {
  it("should be a singleton ", () => {
    const factory1 = BlockFactory.getInstance();
    const factory2 = BlockFactory.getInstance();
    expect(factory1).toBe(factory2);
  });

  it("should register Component ", () => {
    PackedFactory();
  });

  it("getRootQuery  should create RootQuery", () => {
    const factory = PackedFactory();
    expect(factory.getRootQuery()).toEqual("content[]{root , root2 , }");
  });

  // it("getRootElements should return RootElements ", () => {
  //   const factory = PackedFactory();
  //   expect(factory.getRootElements()).toStrictEqual(rootComponents);
  // });

  it("getComponent should return Component  ", () => {
    const factory = PackedFactory();
    render(
      <div>{factory.getComponent("test2", { testProp: "testProp" })}</div>
    );
    expect(screen.getByText("Test2 testProp"));
  });

  it("getComponent should return null if no Component found  ", () => {
    const factory = PackedFactory();
    expect(factory.getComponent("nope", { testProp: "testProp" })).toBeNull();
  });
});
