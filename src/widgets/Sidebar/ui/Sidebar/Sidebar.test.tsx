import { fireEvent, screen } from "@testing-library/react";
import { componentRender } from "shared/config/tests/componentRender/componentRender";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  test("Test render", () => {
    componentRender(<Sidebar />);
    // expect(screen.getByText("TEST")).toBeInTheDocument();
  });
  test("Test render", () => {
    componentRender(<Sidebar />);
    const toggleBtn = screen.getByTestId("sidebar-toggle");
    fireEvent.click(toggleBtn);
    // expect(screen.getByText("TEST")).toHaveClass("collapsed");
  });
});
