import ToolCard from "@/components/ToolCard";

export default function Home() {
  const tools = [
    {
      href: "/char-count",
      title: "글자수 세기",
      description: "글자수, 단어수, 바이트 수를 실시간으로 세어보세요.",
      ready: true,
    },
    {
      href: "/kor-eng",
      title: "한영 변환기",
      description: "한영 오타를 자동으로 변환해드립니다.",
      ready: true,
    },
    {
      href: "/text-diff",
      title: "텍스트 비교",
      description: "두 텍스트의 차이점을 색상으로 한눈에 비교하세요.",
      ready: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold text-center pt-10 text-text-primary/70">
        온라인 텍스트 도구 모음
      </h1>
      <p className="text-center text-text-secondary mt-3">
        필요한 도구를 선택하세요!
      </p>
      <div className="grid gap-4 px-4 mt-10 max-w-5xl mx-auto mb-10">
        {tools.map((tool) => (
          <ToolCard
            key={tool.href}
            href={tool.href}
            title={tool.title}
            description={tool.description}
            ready={tool.ready}
          />
        ))}
      </div>
    </div>
  );
}
