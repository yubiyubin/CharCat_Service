"use client";

import { useMemo, useState } from "react";
import { styles } from "@/styles";
import ConvertArrow from "@/features/kor-eng/components/convertArrow";
import Toast from "@/components/Toast";
import ActionButton from "@/components/ActionButton";
import { useConverterState } from "@/hooks/useConverterState";
import { diffChars } from "diff";

export default function TextDiff() {
  const { toast, textareaRef, copyResult, showToast } = useConverterState();
  const [modified, setModified] = useState("");
  const [original, setOriginal] = useState("");

  const diffs = diffChars(original, modified);
  const hasDiff = diffs.some((part) => part.added || part.removed);
  const clearInput = () => {
    setOriginal("");
    setModified("");
    showToast("초기화되었습니다");
  };

  const result = useMemo(() => {
    if (!original && !modified) {
      return;
    }
    if (!hasDiff) {
      return "두 텍스트가 동일합니다";
    }
    return diffs.map((part, index) => {
      const color = part.added
        ? "text-green-600/60 bg-green-200/70"
        : part.removed
          ? "text-rose-400/70 line-through bg-rose-100"
          : "text-gray-600/80";
      return (
        <span key={index} className={color}>
          {part.value}
        </span>
      );
    });
  }, [original, modified, diffs, hasDiff]);

  const onClickConvert = () => {
    setOriginal(modified);
    setModified(original);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>텍스트 비교</h1>
      <div className={styles.container}>
        <div className={styles.textareaContainer}>
          <div className={styles.flexContainer}>
            <span className="flex-1 text-center">원본 텍스트</span>
            <button onClick={onClickConvert} className={styles.convertButton}>
              <ConvertArrow />
            </button>
            <span className="flex-1 text-center">수정된 텍스트</span>
          </div>
          <div className="grid gap-4 grid-cols-[1fr_auto_1fr] flex-1">
            <textarea
              ref={textareaRef}
              className={`${styles.noneBorderTextarea} h-full`}
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder={"원본 텍스트를 입력하세요"}
            />
            <div className="w-[1px] bg-border-input my-4" />
            <textarea
              ref={textareaRef}
              className={`${styles.noneBorderTextarea} h-full`}
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              placeholder={"수정된 텍스트를 입력하세요"}
            />
          </div>
        </div>
        <div className={`${styles.resultTextarea} mt-4`}>
          <div className={styles.resultTextareaContent}>
            {result || (
              <span className={styles.resultTextareaPlaceholder}>
                양쪽에 텍스트를 입력하면 차이점이 여기에 표시됩니다
              </span>
            )}
          </div>
          <div className={styles.actionButtonContainer}>
            <ActionButton
              onClick={() => {
                if (typeof result === "string") {
                  copyResult(result);
                } else {
                  const textToCopy = diffs
                    .map(
                      (part) =>
                        `${part.added ? "+" : part.removed ? "-" : ""}${
                          part.value
                        }`,
                    )
                    .join("");
                  copyResult(textToCopy);
                }
              }}
              label="결과 복사"
            />
            <ActionButton onClick={clearInput} label="초기화" />
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}> 텍스트 비교란?</h2>
            <p className="mt-4 text-sm text-text-light leading-relaxed">
              두 텍스트 사이의 차이점을 자동으로 찾아서 색상으로 표시해주는
              도구입니다.<br></br> 원본에서 삭제된 부분은 빨간색으로, 새로
              추가된 부분은 초록색으로 표시됩니다.
            </p>
          </div>
          <div className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}>이런 때 유용해요!</h2>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {[
                "코드 리뷰에서 변경 사항 확인",
                "문서 수정 시 변경 사항 추적",
                "학술 논문에서 수정 사항 비교",
                "번역문과 원문 대조",
                "계약서, 약관 변경 사항 파악",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-primary/5 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 mr-3 group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-text-secondary font-medium text-sm sm:text-base group-hover:text-text-primary transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {toast && <Toast message={toast} />}
      </div>
    </div>
  );
}
