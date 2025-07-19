// vitest.setup.ts
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

export const mockRouterPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

export const mockToastError = vi.fn();
export const mockToastWarning = vi.fn();

vi.mock("react-toastify", async () => {
  const actual = await vi.importActual("react-toastify");
  return {
    ...actual,
    toast: {
      warning: mockToastWarning,
      success: vi.fn(),
      error: mockToastError,
      info: vi.fn(),
    },
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});