import { vi } from 'vitest';
import { render, screen } from "@testing-library/react"
import { mockRouterPush, mockToastError, mockToastWarning } from '@/vitest.setup';
import userEvent from '@testing-library/user-event'
import LoginForm from "./login-form";
import { request } from "@/lib/api";
import { invalidCredentialsLoginApiResponse, genericErrorLoginApiResponse, successfulLoginApiResponse } from '@/mocked-data/api-responses';

vi.mock("@/lib/api", () => ({
  request: vi.fn(),
}));

const email = "email@email.com";
const password = "password";
const requestEndpoint = "auth/login";
const requestOptions = { method: "POST", body: { email, password } };

const setupAndSubmitLoginForm = async () => {
  const user = userEvent.setup();
  await user.type(screen.getByTestId("login-email-input"), email);
  await user.type(screen.getByTestId("login-password-input"), password);
  await user.click( screen.getByTestId("login-submit-button"));
}

describe("Test login form", () => {
  it("Login form should render", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-email-input")).toBeInTheDocument();
    expect(screen.getByTestId("login-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("login-submit-button")).toBeInTheDocument();
  });

  describe("When the form is submitted", () => {
    it("Should show toast warning when email or password is empty", async () => {
      render(<LoginForm />);
      const user = userEvent.setup();
      await user.click(screen.getByTestId("login-submit-button"));
      expect(mockToastWarning).toHaveBeenCalledWith("Dados inválidos.");
    });

    it("Should show toast error when credentials are invalid", async () => {
      vi.mocked(request).mockResolvedValueOnce(invalidCredentialsLoginApiResponse);
      render(<LoginForm />);
      await setupAndSubmitLoginForm();
      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith(requestEndpoint, requestOptions);
      expect(mockToastError).toHaveBeenCalledWith("Credenciais inválidas.");
    });

    it("Should show toast error when an error is returned", async () => {
      vi.mocked(request).mockResolvedValueOnce(genericErrorLoginApiResponse);
      render(<LoginForm />);
      await setupAndSubmitLoginForm();
      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith(requestEndpoint, requestOptions);
      expect(mockToastError).toHaveBeenCalledWith("mocked-error-message");
    });

    it("Should redirect to /customers when login is successful", async () => {
      vi.mocked(request).mockResolvedValueOnce(successfulLoginApiResponse);
      render(<LoginForm />);
      await setupAndSubmitLoginForm();
      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith(requestEndpoint, requestOptions);
      expect(mockRouterPush).toHaveBeenCalledTimes(1);
      expect(mockRouterPush).toHaveBeenCalledWith("/customers");
    });
  });
  
});