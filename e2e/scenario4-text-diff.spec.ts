/**
 * E2E 시나리오 4: 문서 수정사항 검토
 *
 * 📖 시나리오:
 * 테크 라이터 최수아는 API 문서를 업데이트한 후
 * 이전 버전과 새 버전의 차이를 시각적으로 확인해야 한다.
 * CharCat 텍스트 비교 도구로 추가/삭제된 내용을 빠르게 파악하고,
 * diff 결과를 복사해 변경사항 요약에 붙여넣는다.
 */

import { test, expect } from "@playwright/test";

test.describe("시나리오 4: 문서 수정사항 검토", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/text-diff");
    await page.waitForSelector("textarea", { timeout: 10000 });
  });

  test("동일한 텍스트 입력 시 '동일합니다' 결과 표시", async ({ page }) => {
    const textareas = page.locator("textarea");
    await textareas.nth(0).fill("안녕하세요");
    await textareas.nth(1).fill("안녕하세요");

    // "동일합니다" 메시지 표시
    const resultArea = page.locator('[data-testid="result-area"]').first();
    await expect(resultArea).toContainText(/동일/);
  });

  test("서로 다른 텍스트 → 색상 diff 결과 표시", async ({ page }) => {
    const textareas = page.locator("textarea");
    await textareas.nth(0).fill("The quick brown fox");
    await textareas.nth(1).fill("The quick red fox");

    // 결과 영역에 변경사항 표시됨 (placeholder 제거됨)
    const resultArea = page.locator('[data-testid="result-area"]').first();
    // 변경된 내용이 있으면 텍스트 존재
    await expect(resultArea).not.toContainText(/placeholder|여기에/);
  });

  test("스왑 버튼으로 원본/수정본 교체", async ({ page }) => {
    const textareas = page.locator("textarea");
    await textareas.nth(0).fill("원본 텍스트");
    await textareas.nth(1).fill("수정된 텍스트");

    // 스왑 버튼 클릭 (ConvertArrow 버튼)
    await page.locator('[data-testid="swap-button"]').click();

    await expect(textareas.nth(0)).toHaveValue("수정된 텍스트");
    await expect(textareas.nth(1)).toHaveValue("원본 텍스트");
  });

  test("초기화 버튼으로 양쪽 모두 초기화", async ({ page }) => {
    const textareas = page.locator("textarea");
    await textareas.nth(0).fill("지울 원본");
    await textareas.nth(1).fill("지울 수정본");

    await page.getByRole("button", { name: /초기화|Clear/ }).click();

    await expect(textareas.nth(0)).toHaveValue("");
    await expect(textareas.nth(1)).toHaveValue("");
  });

  test("결과 복사 버튼 클릭 후 토스트 표시", async ({ page }) => {
    const textareas = page.locator("textarea");
    await textareas.nth(0).fill("abc");
    await textareas.nth(1).fill("axc");

    // 결과가 로드될 때까지 대기
    const resultArea = page.locator('[data-testid="result-area"]').first();
    await expect(resultArea).not.toBeEmpty();

    await page.getByRole("button", { name: /결과 복사|Copy/ }).click();

    const toast = page.locator("div.fixed");
    await expect(toast).toBeVisible({ timeout: 3000 });
  });

  test("빈 입력 시 placeholder 표시", async ({ page }) => {
    const resultArea = page.locator('[data-testid="result-area"]').first();
    // 아무것도 입력하지 않으면 placeholder span 표시
    const placeholder = resultArea.locator("span");
    await expect(placeholder).toBeVisible();
  });
});
