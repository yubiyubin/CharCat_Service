/**
 * 클립보드에 텍스트를 복사합니다.
 * 브라우저 보안 정책(HTTP, 권한 거부)으로 실패할 수 있으므로 try/catch 포함.
 * @returns 복사 성공 여부
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
