"use client";

import { engToKor, korToEng } from "@/features/kor-eng/utils/korEngMap";
import { useMemo, useState, useRef, useEffect } from "react";
import { styles } from "@/styles";
import ConvertArrow from "@/features/kor-eng/components/convertArrow";
import Toast from "@/components/Toast";
import ActionButton from "@/components/ActionButton";

export default function KorEng() {
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<"korToEng" | "engToKor">(
    "korToEng",
  );
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);
  const result = useMemo(() => {
    return direction === "korToEng" ? engToKor(input) : korToEng(input);
  }, [input, direction]);

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    showToast("변환 결과가 복사되었습니다");
  };

  const onClickConvert = () => {
    setDirection(direction === "korToEng" ? "engToKor" : "korToEng");
  };

  const clearInput = () => {
    setInput("");
    showToast("초기화되었습니다");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>한영 변환기</h1>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textareaContainer}>
            <div className={styles.flexContainer}>
              <span className={styles.w20TextCenter}>
                {direction === "engToKor" ? "한글 " : "영문"}
              </span>
              <button onClick={onClickConvert} className={styles.convertButton}>
                <ConvertArrow />
              </button>
              <span className={styles.w20TextCenter}>
                {direction === "engToKor" ? "영문 " : "한글"}
              </span>
            </div>
            <textarea
              ref={textareaRef}
              className={styles.noneBorderTextarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                direction === "engToKor"
                  ? "한글로 잘못 입력한 텍스트를 붙여넣으세요 (예: ㅗ디ㅣㅐ)"
                  : "영문으로 잘못 입력한 텍스트를 붙여넣으세요 (예: dkssud)"
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
              <ActionButton onClick={copyResult} label="결과 복사" />
              <ActionButton onClick={clearInput} label="초기화" />
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionBackground}>
            <h2 className={styles.sectionTitle}> 한영 변환기란?</h2>
            <p className="mt-4 text-sm text-text-light leading-relaxed">
              한영키를 누르지 않고 타이핑해서 영어/한글이 잘못 입력된 경우, 원래
              의도했던 한글/영어로 변환해주는 도구입니다.
            </p>
          </div>

          <div className="bg-primary/10 rounded-lg p-6">
            <h2 className="text-lg font-bold text-text-base">변환 예시</h2>
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-3 items-center text-medium bg-white rounded-lg px-6 py-3">
                <span className="text-text-secondary font-mono">dkssud</span>
                <span className="text-primary-600 text-center">→</span>
                <span className="text-text-base font-medium text-right">
                  안녕
                </span>
              </div>
              <div className="grid grid-cols-3 items-center text-medium bg-white rounded-lg px-6 py-3">
                <span className="text-text-secondary font-mono">gksrmf</span>
                <span className="text-primary-600 text-center">→</span>
                <span className="text-text-base font-medium text-right">
                  한글
                </span>
              </div>
              <div className="grid grid-cols-3 items-center text-medium bg-white rounded-lg px-6 py-3">
                <span className="text-text-secondary font-mono">ㅗ디ㅣㅐ</span>
                <span className="text-primary-600 text-center">→</span>
                <span className="text-text-base font-medium text-right">
                  hello
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
