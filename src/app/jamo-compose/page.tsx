"use client";

import { useMemo, useState } from "react";
import { styles } from "@/styles";
import ConvertArrow from "@/features/kor-eng/components/convertArrow";
import Toast from "@/components/Toast";
import ActionButton from "@/components/ActionButton";
import { compose, decompose } from "@/utils/hangulCompose";
import { useConverterState } from "@/hooks/useConverterState";

export default function JamoCompose() {
  const { input, setInput, toast, textareaRef, copyResult, clearInput } =
    useConverterState();
  const [direction, setDirection] = useState<"compose" | "decompose">(
    "compose",
  );

  const result = useMemo(() => {
    return direction === "compose" ? compose(input) : decompose(input);
  }, [input, direction]);

  const onClickConvert = () => {
    setDirection(direction === "compose" ? "decompose" : "compose");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        자음 모음 {direction === "compose" ? "조합기" : "분해기"}
      </h1>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textareaContainer}>
            <div className={styles.flexContainer}>
              <span className={styles.w20TextCenter}>
                {direction === "compose" ? "자음/모음" : "한글"}
              </span>
              <button onClick={onClickConvert} className={styles.convertButton}>
                <ConvertArrow />
              </button>
              <span className={styles.w20TextCenter}>
                {direction === "compose" ? "한글" : "자음/모음"}
              </span>
            </div>
            <textarea
              ref={textareaRef}
              className={styles.noneBorderTextarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                direction === "compose"
                  ? "분리된 자모를 붙여넣으세요 (예: ㅇㅏㄴㄴㅕㅇ)"
                  : "한글을 자모로 분해하세요 (예: 안녕)"
              }
            />
          </div>
          <div className={styles.resultTextarea}>
            <div className={styles.resultTextareaContent}>
              {result || (
                <span className={styles.resultTextareaPlaceholder}>
                  변환 결과가 여기에 표시됩니다
                </span>
              )}
            </div>
            <div className={styles.actionButtonContainer}>
              <ActionButton onClick={() => copyResult(result)} label="결과 복사" />
              <ActionButton onClick={clearInput} label="초기화" />
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}> 자음/모음 합치기란?</h2>
            <p className="mt-4 text-sm text-text-light leading-relaxed">
              복사 붙여넣기 과정에서 한글이 자음과 모음 단위로 분리되는 경우가
              있습니다. <br></br>이 도구는 흩어진 자음과 모음을 원래의 완성된
              한글로 다시 조합해줍니다.
            </p>
          </div>

          <div className="bg-primary/10 rounded-lg p-6">
            <h2 className="text-lg font-bold text-text-base">변환 예시</h2>
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-3 items-center text-medium bg-white rounded-lg p-3">
                <span className="text-text-secondary font-mono">
                  ㅇㅏㄴㄴㅕㅇ
                </span>
                <span className="text-primary-600 text-center">→</span>
                <span className="text-text-base font-medium text-right">
                  안녕
                </span>
              </div>
              <div className="grid grid-cols-3 items-center text-medium bg-white rounded-lg p-3">
                <span className="text-text-secondary font-mono">
                  ㅎㅏㄴㄱㅡㄹ
                </span>
                <span className="text-primary-600 text-center">→</span>
                <span className="text-text-base font-medium text-right">
                  한글
                </span>
              </div>
              <div className="grid grid-cols-3 items-center text-medium bg-white rounded-lg p-3">
                <span className="text-text-secondary font-mono">
                  ㄱㅏㅁㅅㅏㅎㅏㅁㄴㅣㄷㅏ
                </span>
                <span className="text-primary-600 text-center">→</span>
                <span className="text-text-base font-medium text-right">
                  감사합니다
                </span>
              </div>
            </div>
          </div>
        </section>

        {toast && <Toast message={toast} />}
      </div>
    </div>
  );
}
