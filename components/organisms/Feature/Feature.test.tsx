/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";

import Feature from "./Feature";

describe("Feature", () => {
  it("Smoke", () => {
    render(<Feature />);
  });
});
