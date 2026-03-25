import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ToolCard from "@/components/ToolCard";

describe("ToolCard", () => {
  it("ready=true 시 링크 카드 렌더링", () => {
    render(
      <ToolCard
        href="/char-count"
        title="글자수 세기"
        description="글자수를 세어드립니다"
        ready={true}
      />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/char-count");
    expect(screen.getByText("글자수 세기")).toBeInTheDocument();
    expect(screen.getByText("글자수를 세어드립니다")).toBeInTheDocument();
  });

  it("ready=false 시 '준비 중' 배지 표시 + 링크 없음", () => {
    render(
      <ToolCard
        href="/upcoming"
        title="준비 중 도구"
        description="곧 출시됩니다"
        ready={false}
      />
    );
    expect(screen.getByText("준비 중")).toBeInTheDocument();
    expect(screen.getByText("준비 중 도구")).toBeInTheDocument();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("description 텍스트 표시", () => {
    render(
      <ToolCard
        href="/test"
        title="테스트 도구"
        description="이것은 테스트 설명입니다"
        ready={true}
      />
    );
    expect(screen.getByText("이것은 테스트 설명입니다")).toBeInTheDocument();
  });
});
