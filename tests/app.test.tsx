import { render } from "@testing-library/react";

const TestComponent: React.FC = () => {
  return <div>Test</div>;
};
const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("App", () => {
  test("smoke", () => {});
});
