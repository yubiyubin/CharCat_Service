import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ActionButton from "@/components/ActionButton";

describe("ActionButton", () => {
  it("label 텍스트 렌더링", () => {
    render(<ActionButton onClick={vi.fn()} label="복사" />);
    expect(screen.getByRole("button", { name: "복사" })).toBeInTheDocument();
  });

  it("클릭 시 onClick 핸들러 호출", async () => {
    const onClick = vi.fn();
    render(<ActionButton onClick={onClick} label="복사" />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("여러 번 클릭 시 횟수만큼 호출", async () => {
    const onClick = vi.fn();
    render(<ActionButton onClick={onClick} label="클릭" />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(3);
  });
});
