import { render, screen } from "@testing-library/react";
import React from "react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  test("Test render", () => {
    render(<Sidebar />);
    expect(screen.getByText("TEST")).toBeInTheDocument();
  });
});
