/**
 * E2E 시나리오 5: 자모 조합/분해
 *
 * 📖 시나리오:
 * 한국어를 공부하는 외국인 학생 Anna는
 * 자음/모음을 개별적으로 입력해 완성된 한글을 학습하고 싶다.
 * CharCat 자모 조합 도구로 ㅎ+ㅏ+ㄴ=한처럼 조합 원리를 확인하고,
 * 반대로 완성 한글을 분해해 자모를 익힌다.
 * 또한, 한글 코딩 테스트에서 받은 완성 한글 단어를
 * 초성/중성/종성으로 분해해 형태소 분석에 활용한다.
 */

import { test, expect } from "@playwright/test";

test.describe("시나리오 5: 자모 조합/분해", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/jamo-compose");
    await page.waitForSelector("textarea", { timeout: 10000 });
  });

  test("자모 입력 → 한글 조합 (ㅇㅏㄴㄴㅕㅇ → 안녕)", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("ㅇㅏㄴㄴㅕㅇ");

    const resultArea = page.locator('[data-testid="result-area"]').first();
    await expect(resultArea).toContainText("안녕");
  });

  test("한글 → 자모 분해 (방향 전환)", async ({ page }) => {
    // 방향 전환 버튼 클릭
    await page.locator('[data-testid="direction-toggle"]').click();

    const textarea = page.locator("textarea");
    await textarea.fill("안녕");

    const resultArea = page.locator('[data-testid="result-area"]').first();
    // 분해 결과: ㅇㅏㄴㄴㅕㅇ
    await expect(resultArea).toContainText("ㅇ");
    await expect(resultArea).toContainText("ㅏ");
    await expect(resultArea).toContainText("ㄴ");
  });

  test("ㅎㅏㄴㄱㅡㄹ → 한글 조합", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("ㅎㅏㄴㄱㅡㄹ");

    const resultArea = page.locator('[data-testid="result-area"]').first();
    await expect(resultArea).toContainText("한글");
  });

  test("감사합니다 자모 조합 검증", async ({ page }) => {
    const textarea = page.locator("textarea");
    // 감사합니다 = ㄱㅏㅁㅅㅏㅎㅏㅂㄴㅣㄷㅏ
    await textarea.fill("ㄱㅏㅁㅅㅏㅎㅏㅂㄴㅣㄷㅏ");

    const resultArea = page.locator('[data-testid="result-area"]').first();
    await expect(resultArea).toContainText("감사합니다");
  });

  test("예시 섹션 확인", async ({ page }) => {
    // ConverterPage의 예시 항목 확인
    await expect(page.getByText("ㅇㅏㄴㄴㅕㅇ")).toBeVisible();
    await expect(page.getByText("안녕")).toBeVisible();
  });

  test("초기화 후 입력창 비워짐", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("ㅎㅏ");

    await page.getByRole("button", { name: /초기화|Clear/ }).click();
    await expect(textarea).toHaveValue("");
  });

  test("복합 자모 조합 (이중모음 ㅗ+ㅏ → 화)", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("ㅎㅗㅏ");

    const resultArea = page.locator('[data-testid="result-area"]').first();
    await expect(resultArea).toContainText("화");
  });
});
