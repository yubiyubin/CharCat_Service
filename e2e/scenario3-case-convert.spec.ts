/**
 * E2E 시나리오 3: 코드 변수명 케이스 변환
 *
 * 📖 시나리오:
 * 백엔드 개발자 박서연은 Python snake_case API 필드명을
 * 프론트엔드 JavaScript 코드에서 camelCase로 바꿔야 한다.
 * CharCat의 대소문자 변환 도구를 활용해 9가지 케이스 변환 결과를
 * 한눈에 확인하고, 원하는 결과를 클립보드에 복사해 코드에 붙여넣는다.
 *
 * 단위 테스트와의 보완 역할:
 * 단위 테스트가 함수 로직을 검증한다면, 이 E2E는
 * 실제 브라우저에서 "입력 → 9가지 변환 동시 표시 → 복사"의 전체 흐름을 검증한다.
 */

import { test, expect } from "@playwright/test";

test.describe("시나리오 3: 코드 변수명 케이스 변환", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/case-convert");
    await page.waitForSelector("textarea", { timeout: 10000 });
  });

  test("입력 시 9가지 변환 결과 동시 표시", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("hello world");

    // 대문자 카드 확인
    const upperCard = page.locator('[data-testid="case-result-upper"]');
    await expect(upperCard).toContainText("HELLO WORLD");

    // camelCase 카드 확인
    const camelCard = page.locator('[data-testid="case-result-camel"]');
    await expect(camelCard).toContainText("helloWorld");
  });

  test("소문자 변환 결과 확인", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("HELLO WORLD");

    const lowerCard = page.locator('[data-testid="case-result-lower"]');
    await expect(lowerCard).toContainText("hello world");
  });

  test("개발자 시나리오: snake_case → camelCase 확인", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("user profile data");

    // snake_case 카드
    const snakeCard = page.locator('[data-testid="case-result-snake"]');
    await expect(snakeCard).toContainText("user_profile_data");

    // PascalCase 카드
    const pascalCard = page.locator('[data-testid="case-result-pascal"]');
    await expect(pascalCard).toContainText("UserProfileData");

    // kebab-case 카드
    const kebabCard = page.locator('[data-testid="case-result-kebab"]');
    await expect(kebabCard).toContainText("user-profile-data");
  });

  test("변환 결과 복사 후 토스트 표시", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("test string");

    // 첫 번째 복사 버튼 클릭
    await page.locator('[data-testid="copy-upper"]').click();

    const toast = page.locator("div.fixed");
    await expect(toast).toBeVisible({ timeout: 3000 });
  });

  test("초기화 후 입력창이 비워짐", async ({ page }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("some text to clear");

    await page.getByRole("button", { name: /초기화|Clear/ }).click();
    await expect(textarea).toHaveValue("");
  });

  test("예시 섹션 확인: hello world → HELLO WORLD", async ({ page }) => {
    await expect(page.getByText("hello world").first()).toBeVisible();
    await expect(page.getByText("HELLO WORLD").first()).toBeVisible();
  });

  test("페이지 새로고침 후 입력 내용 유지 (sessionStorage)", async ({
    page,
  }) => {
    const textarea = page.locator("textarea");
    await textarea.fill("persist this text");

    await page.reload();
    await page.waitForSelector("textarea", { timeout: 10000 });

    const reloadedTextarea = page.locator("textarea");
    await expect(reloadedTextarea).toHaveValue("persist this text");
  });
});
