import { render } from "@testing-library/react";
import App from "../pages/_app";

const TestComponent: React.FC = () => {
  return <div>Test</div>;
};
const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("App", () => {
  test("smoke", () => {});
});
