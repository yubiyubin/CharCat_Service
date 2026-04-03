import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

describe("Footer", () => {
  it("저작권 정보 렌더링", () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>,
    );
    expect(screen.getByText(/CharCat/)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  it("footer 태그 존재", () => {
    const { container } = render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>,
    );
    expect(container.querySelector("footer")).toBeInTheDocument();
  });
});
