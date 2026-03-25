/**
 * E2E 시나리오 1: SNS 포스팅 전 글자수 확인
 *
 * 📖 시나리오:
 * 마케터 김민지는 인스타그램 포스팅을 위해 글 초안을 작성했다.
 * 인스타그램 캡션 한도(2,200자)를 초과하지 않는지 확인하고,
 * 불필요한 공백을 제거한 뒤 최종 바이트 수를 확인한다.
 */

import { test, expect } from "@playwright/test";

test.describe("시나리오 1: SNS 포스팅 전 글자수 확인", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/char-count");
    // LanguageContext 마운트 대기
    await page.waitForSelector("textarea", { timeout: 10000 });
  });

  test("텍스트 입력 시 글자수 통계 실시간 업데이트", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("안녕하세요! 오늘도 좋은 하루 되세요.");

    // 통계 섹션 로드 대기
    const statsSection = page.locator('[id="stats"]');
    await expect(statsSection).toBeVisible();

    // 공백 포함 글자수가 0이 아님
    const charWithSpaces = page.locator('[id="char-with-spaces"] p').first();
    const charValue = await charWithSpaces.textContent();
    expect(Number(charValue)).toBeGreaterThan(0);
  });

  test("공백 포함/제외 글자수 차이 확인", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("hello world"); // 11자 (공백 포함), 10자 (공백 제외)

    // 공백 포함: 11
    const charWithSpaces = page.locator('[id="char-with-spaces"] p').first();
    await expect(charWithSpaces).toHaveText("11");

    // 공백 제외: 10
    const charWithoutSpaces = page
      .locator('[id="char-without-spaces"] p')
      .first();
    await expect(charWithoutSpaces).toHaveText("10");
  });

  test("단어수·문장수 계산", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("첫 번째 문장입니다. 두 번째 문장입니다!");

    const wordCount = page.locator('[id="word-count"] p').first();
    const sentenceCount = page.locator('[id="sentence-count"] p').first();

    // 단어수 > 0
    const words = await wordCount.textContent();
    expect(Number(words)).toBeGreaterThan(0);

    // 문장수 >= 2 (마침표, 느낌표로 2개)
    const sentences = await sentenceCount.textContent();
    expect(Number(sentences)).toBeGreaterThanOrEqual(2);
  });

  test("'공백 제거' 액션으로 공백 삭제 후 글자수 재계산", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("안녕 하세요");

    const charBefore = await page
      .locator('[id="char-with-spaces"] p')
      .first()
      .textContent();

    // 공백 제거 버튼 클릭
    await page.getByRole("button", { name: /공백 제거/ }).click();

    const charAfter = await page
      .locator('[id="char-with-spaces"] p')
      .first()
      .textContent();

    // 공백 제거 후 글자수 감소
    expect(Number(charAfter)).toBeLessThan(Number(charBefore));
    expect(await textarea.inputValue()).toBe("안녕하세요");
  });

  test("'초기화' 후 모든 통계가 0으로 리셋", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("초기화 테스트용 텍스트입니다");

    await page.getByRole("button", { name: /초기화/ }).click();

    await expect(textarea).toHaveValue("");

    const charWithSpaces = page.locator('[id="char-with-spaces"] p').first();
    await expect(charWithSpaces).toHaveText("0");
  });

  test("한글 바이트 계산 확인 (한 글자 = 3 bytes)", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("가나다"); // 3글자 × 3bytes = 9bytes

    const byteCount = page.locator('[id="byte-count"] p').first();
    await expect(byteCount).toHaveText("9");
  });
});
