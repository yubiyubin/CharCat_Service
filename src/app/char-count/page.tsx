"use client";
import { useState } from "react";
import ActionButton from "./_components/ActionButton";
import StatCard from "../_components/StatCard";
import Toast from "./_components/Toast";

export default function CharCount() {
  const [text, setText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const stats = {
    charWithSpaces: text.length,
    charWithoutSpaces: text.replace(/\s/g, "").length,
    words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
    sentences:
      text.trim() === ""
        ? 0
        : text.split(/[.!?]+/).filter((s) => s.trim()).length,
    lines: text === "" ? 0 : text.split("\n").length,
    bytes: new TextEncoder().encode(text).length,
  };

  const statItems = [
    { value: stats.charWithSpaces, label: "공백 포함" },
    { value: stats.charWithoutSpaces, label: "공백 제외" },
    { value: stats.words, label: "단어 수" },
    { value: stats.sentences, label: "문장 수" },
    { value: stats.lines, label: "줄 수" },
    { value: stats.bytes, label: "바이트" },
  ];

  const copyText = () => {
    navigator.clipboard.writeText(text);
    showToast("복사되었습니다.");
  };

  const clearText = () => {
    setText("");
    showToast("초기화되었습니다.");
  };

  const removeSpaces = () => {
    setText(text.replace(/ /g, ""));
    showToast("공백이 제거되었습니다.");
  };

  const removeLineBreaks = () => {
    setText(text.replace(/\n/g, " "));
    showToast("줄바꿈이 제거되었습니다.");
  };

  const actions = [
    { onClick: copyText, label: "텍스트 복사" },
    { onClick: clearText, label: "초기화" },
    { onClick: removeSpaces, label: "공백 제거" },
    { onClick: removeLineBreaks, label: "줄바꿈 제거" },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <h1 className="text-3xl font-bold text-center pt-10 text-text-primary/70">
        {" "}
        글자수 세기
      </h1>
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <textarea
          value={text}
          onChange={onChangeHandler}
          placeholder="여기에 텍스트를 입력하세요"
          className="w-full h-64 p-4 border border-border-input rounded-lg text-text-primary/70 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {/* <div className="flex flex-wrap justify-center gap-5 mt-4"> */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-7 mt-4 ">
          {actions.map((action) => (
            <ActionButton
              key={action.label}
              onClick={action.onClick}
              label={action.label}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {statItems.map((item) => (
            <StatCard key={item.label} value={item.value} label={item.label} />
          ))}
        </div>

        <section className="mt-16 mb-12 grid gap-6 sm:grid-cols-2 text-text-secondary font-medium">
          <div className="bg-primary/10 rounded-lg p-6">
            <h2 className="text-lg font-bold text-text-base">
              글자수 세기가 필요한 경우
            </h2>
            <ul className="mt-4 space-y-3 text-sm ">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>자기소개서</span>
                <span className="font-medium">500~1,000자</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>블로그 포스팅 (SEO 권장)</span>
                <span className=" font-medium">1,500~2,500자</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>트위터(X)</span>
                <span>280자</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>인스타그램 캡션</span>
                <span>2,200자</span>
              </li>
              <li className="flex justify-between">
                <span>카카오톡 상태메시지</span>
                <span>60자</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/10 rounded-lg p-6">
            <h2 className="text-lg font-bold text-text-base">
              바이트 수는 왜 다를까?
            </h2>
            <p className="mt-4 text-sm text-text-light leading-relaxed">
              영문, 숫자, 기본 기호는 1바이트이지만 한글은 UTF-8 기준으로 한
              글자당 3바이트를 차지합니다.
            </p>
            <div className="mt-4 bg-white rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>A (영문 1글자)</span>
                <span>1 바이트</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>가 (한글 1글자)</span>
                <span>3 바이트</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>안녕하세요 (한글 5글자)</span>
                <span>15 바이트</span>
              </div>
            </div>
          </div>
        </section>
        {toast && <Toast message={toast} />}
      </div>
    </div>
  );
}
