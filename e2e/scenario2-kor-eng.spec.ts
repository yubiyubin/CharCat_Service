/**
 * E2E 시나리오 2: 한영키 오타 수정
 *
 * 📖 시나리오:
 * 개발자 이준혁은 Slack에 "안녕하세요"를 입력하려다
 * 영문 입력 모드에서 "dkssud gkseo"를 실수로 입력했다.
 * CharCat 한영 변환 도구를 이용해 원래 한글로 복원한다.
 * 반대로, 한글로 입력된 텍스트를 영문 자판으로 역변환하여
 * 영문 타이핑 연습에도 활용한다.
 */

import { test, expect } from "@playwright/test";

test.describe("시나리오 2: 한영키 오타 수정", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/kor-eng");
    await page.waitForSelector("textarea", { timeout: 10000 });
  });

  test("영문 오타 → 한글 변환 (dkssud → 안녕)", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("dkssud");

    // 결과 영역에 "안녕" 표시
    const resultArea = page.locator('[data-testid="result-area"]').first();
    await expect(resultArea).toContainText("안녕");
  });

  test("gksrmf → 한글 '한글' 변환", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("gksrmf");

    const resultArea = page.locator('[data-testid="result-area"]').first();
    await expect(resultArea).toContainText("한글");
  });

  test("방향 전환: 한글 → 영문 역변환", async ({ page }) => {
    // 방향 전환 버튼 클릭 (⇄ 화살표 버튼)
    await page.locator('[data-testid="direction-toggle"]').click();

    // 역방향: 한글 → 영문
    const textarea = page.locator("textarea");
    await textarea.fill("안녕");

    const resultArea = page.locator('[data-testid="result-area"]').first();
    await expect(resultArea).toContainText("dkssud");
  });

  test("결과 복사 버튼 동작 확인", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("dkssud");

    // 결과 복사 버튼 클릭
    await page
      .getByRole("button", { name: /결과 복사|Copy/ })
      .click();

    // 토스트 메시지 표시 확인
    const toast = page.locator("div.fixed");
    await expect(toast).toBeVisible({ timeout: 3000 });
  });

  test("초기화 버튼으로 입력 초기화", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("dkssud");

    await page.getByRole("button", { name: /초기화|Clear/ }).click();

    await expect(textarea).toHaveValue("");
  });

  test("예시 섹션 표시 확인", async ({ page }) => {
    // 페이지에 예시가 표시되어야 함
    await expect(page.getByText("dkssud")).toBeVisible();
    await expect(page.getByText("안녕")).toBeVisible();
  });
});
