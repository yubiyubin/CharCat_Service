import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("저작권 정보 렌더링", () => {
    render(<Footer />);
    expect(screen.getByText(/CharCat/)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  it("footer 태그 존재", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });
});
