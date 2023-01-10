import BodyParser from "./BodyParser";
import { render } from "@testing-library/react";


const TestComponent1 = () => <div>Test1</div>;
const TestComponent2 = (props: { testProp: string }) => (
  <div>{`Test2 ${props.testProp}`}</div>
);
const TestComponent3 = () => <div>Test3</div>;

const testComponents = {
  test: { component: TestComponent1 },
  test2: { component: TestComponent2 },
};

describe.only("ComponentFactory", () => {
  it("smoke ", () => {
    render(<BodyParser components={{}} />);
  });
  // it("should Render Component ", () => {
  //   render(
  //     <BodyParser
  //       content={[
  //         { _type: "test", _key: 1, testProp: "testProp" },
  //         { _type: "test2", _key: 2, testProp: "testProp" },
  //       ]}
  //       components={testComponents}
  //     />
  //   );
  //   expect(screen.getByText("Test1")).toBeInTheDocument();
  //   expect(screen.getByText("Test2 testProp")).toBeInTheDocument();
  // });
  // it("should Render warning if no Component found ", () => {
  //   render(
  //     <BodyParser
  //       content={[
  //         { _type: "test", _key: 1, testProp: "testProp" },
  //         { _type: "test2", _key: 2, testProp: "testProp" },
  //         { _type: "test5", _key: 2, testProp: "testProp" },
  //       ]}
  //       components={testComponents}
  //     />
  //   );
  //   expect(
  //     screen.getByText(
  //       'Component "test5" is not defined. Add it to components.js'
  //     )
  //   ).toBeInTheDocument();
  // });
  // it("should Render warning extra Component  ", () => {
  //   render(
  //     <BodyParser
  //       content={[
  //         { _type: "test", _key: 1, testProp: "testProp" },
  //         { _type: "test2", _key: 2, testProp: "testProp" },
  //         { _type: "test5", _key: 2, testProp: "testProp" },
  //       ]}
  //       //@ts-ignore
  //       components={{ bla: {}, ...testComponents }}
  //     />
  //   );
  //   expect(screen.getByText("Test1")).toBeInTheDocument();
  // });
});
