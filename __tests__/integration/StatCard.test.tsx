import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCard from "@/features/char-count/components/StatCard";

describe("StatCard", () => {
  it("value와 label이 화면에 표시됨", () => {
    render(<StatCard value={42} label="글자수" />);
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("글자수")).toBeInTheDocument();
  });

  it("value=0 표시", () => {
    render(<StatCard value={0} label="단어수" />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("큰 숫자 표시", () => {
    render(<StatCard value={99999} label="바이트" />);
    expect(screen.getByText("99999")).toBeInTheDocument();
  });
});
