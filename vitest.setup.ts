import "@testing-library/jest-dom";
import { vi, afterEach, beforeEach } from "vitest";
import React from "react";

// ─── next/navigation mock ───────────────────────────────────────────────────
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

// ─── next-themes mock ────────────────────────────────────────────────────────
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
    systemTheme: "light",
    resolvedTheme: "light",
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

// ─── navigator.clipboard mock ───────────────────────────────────────────────
const clipboardMock = {
  writeText: vi.fn().mockResolvedValue(undefined),
  readText: vi.fn().mockResolvedValue(""),
};
Object.defineProperty(navigator, "clipboard", {
  value: clipboardMock,
  writable: true,
  configurable: true,
});

// ─── Storage: clear between tests ───────────────────────────────────────────
beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
});

afterEach(() => {
  sessionStorage.clear();
  localStorage.clear();
  vi.clearAllMocks();
});
