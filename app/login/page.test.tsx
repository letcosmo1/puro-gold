import { render, screen } from "@testing-library/react"
import LoginPage from "./page"

describe("Test homepage", () => {
  it("Login page should render", () => {
    render(<LoginPage />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();

    const emailInput = screen.getByTestId("login-email-input");
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId("login-password-input");
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByTestId("login-submit-button");
    expect(submitButton).toBeInTheDocument();
  })
})

