import { Switch } from "./Switch";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Switch>", () => {
  it("should Render checked", () => {
    render(<Switch checked onChange={() => {}} />);
    const component = screen.getByRole("switch");
    expect(component).toHaveAttribute("aria-checked", "true");
  });
  it("should Render unChecked", () => {
    render(<Switch onChange={() => {}} />);
    const component = screen.getByRole("switch");
    expect(component).toHaveAttribute("aria-checked", "false");
  });
  it("should call onChange checked", () => {
    const handleChange = jest.fn();
    render(<Switch checked onChange={handleChange} />);
    const component = screen.getByRole("switch");
    fireEvent.click(component);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
  it("should call onChange unChecked", () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} />);
    const component = screen.getByRole("switch");
    fireEvent.click(component);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
