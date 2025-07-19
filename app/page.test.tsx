import { render, screen } from "@testing-library/react"
import Home from "./page"

describe("Test homepage", () => {
  it("Homepage should render", () => {
    render(<Home />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/login");
  })
})