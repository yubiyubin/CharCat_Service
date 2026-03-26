import { diffArrays } from "diff";

/** 텍스트를 공백 단위 토큰 배열로 분리 */
export function tokenize(text: string): string[] {
  return text.split(/(\s+)/).filter((tok) => tok.length > 0);
}

export interface DiffSegment {
  tokens: string[];
  type: "added" | "removed" | "unchanged";
}

export interface LineDiffResult {
  /** 줄 단위 변경 여부 */
  hasDiff: boolean;
  /**
   * 각 줄의 diff 결과.
   * changed 타입은 줄 내 단어 단위 인라인 diff를 포함.
   */
  lines: LinePart[];
}

export type LinePart =
  | { kind: "unchanged"; text: string }
  | { kind: "added"; text: string }
  | { kind: "removed"; text: string }
  | { kind: "changed"; segments: DiffSegment[] };

/** 두 텍스트를 줄 단위 → 단어 단위 2단계로 비교해 렌더링용 구조 반환 */
export function computeTextDiff(original: string, modified: string): LineDiffResult {
  if (!original && !modified) return { hasDiff: false, lines: [] };

  const originalLines = original.split("\n");
  const modifiedLines = modified.split("\n");
  const lineDiffs = diffArrays(originalLines, modifiedLines);

  const hasDiff = lineDiffs.some((p) => p.added || p.removed);
  if (!hasDiff) return { hasDiff: false, lines: [] };

  const lines: LinePart[] = [];
  let i = 0;

  while (i < lineDiffs.length) {
    const cur = lineDiffs[i];
    const next = lineDiffs[i + 1];

    if (cur.removed && next?.added) {
      const removedLines = cur.value;
      const addedLines = next.value;
      const pairCount = Math.min(removedLines.length, addedLines.length);

      for (let j = 0; j < pairCount; j++) {
        const wordDiffs = diffArrays(tokenize(removedLines[j]), tokenize(addedLines[j]));
        const segments: DiffSegment[] = wordDiffs.map((part) => ({
          tokens: part.value,
          type: part.added ? "added" : part.removed ? "removed" : "unchanged",
        }));
        lines.push({ kind: "changed", segments });
      }
      for (let j = pairCount; j < removedLines.length; j++) {
        lines.push({ kind: "removed", text: removedLines[j] });
      }
      for (let j = pairCount; j < addedLines.length; j++) {
        lines.push({ kind: "added", text: addedLines[j] });
      }
      i += 2;
    } else {
      const kind = cur.added ? "added" : cur.removed ? "removed" : "unchanged";
      for (const line of cur.value) {
        lines.push({ kind, text: line } as LinePart);
      }
      i++;
    }
  }

  return { hasDiff, lines };
}
