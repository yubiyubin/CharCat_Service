"use client";

import ToolCard from "@/components/ToolCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const tools = [
    {
      href: "/char-count",
      title: t("header.charCount"),
      description: t("home.tools.charCountDesc"),
      ready: true,
    },
    {
      href: "/kor-eng",
      title: t("header.korEng"),
      description: t("home.tools.korEngDesc"),
      ready: true,
    },
    {
      href: "/text-diff",
      title: t("header.textDiff"),
      description: t("home.tools.textDiffDesc"),
      ready: true,
    },
    {
      href: "/jamo-compose",
      title: t("header.jamoCompose"),
      description: t("home.tools.jamoComposeDesc"),
      ready: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold text-center pt-10 text-text-primary/70 dark:neon-text">
        {t("home.heroTitle1")} {t("home.heroTitle2")}
      </h1>
      <p className="text-center text-text-secondary mt-3">
        {t("home.pickTool")}
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

      <section className="mt-28 mb-16 mx-auto px-4 w-full">
        <div className="bg-gradient-to-br from-primary/[0.03] to-surface dark:from-primary/[0.06] dark:to-transparent rounded-3xl p-8 sm:p-12 border border-primary/10 dark:neon-border dark:neon-glow-subtle shadow-sm relative overflow-hidden transition-premium">
          {/* Ambient glow orbs */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70 dark:animate-[neon-pulse_4s_ease-in-out_infinite]"></div>
          <div className="hidden dark:block absolute bottom-0 left-0 -mb-32 -ml-32 w-80 h-80 bg-primary/8 rounded-full blur-3xl mix-blend-screen opacity-50 animate-[neon-pulse_6s_ease-in-out_infinite]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 relative z-10">
            <div className="lg:col-span-4 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary/70 dark:neon-text tracking-tight mb-5 leading-snug">
                {t("home.heroTitle1")}
                <br className="hidden lg:block" /> {t("home.heroTitle2")}
              </h2>
              <p className="text-text-primary/70 leading-relaxed text-md">
                {t("home.heroSubtitle")}
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 relative">
              {/* Divider for desktop */}
              <div className="hidden lg:block absolute left-[-28px] top-0 bottom-0 w-[1px] bg-primary/10 dark:bg-primary/20 dark:shadow-[0_0_8px_rgba(168,85,247,0.15)]"></div>

              <div>
                <span className="inline-block text-[16px] font-bold text-primary/70 dark:text-primary-light mb-3 tracking-widest uppercase bg-primary/[0.05] dark:bg-primary/10 px-2 py-1 rounded dark:neon-border">
                  {t("home.feature1Badge")}
                </span>
                <h3 className="text-lg font-bold text-text-secondary mb-2">
                  {t("home.feature1Title")}
                </h3>
                <p className="text-text-primary/70 text-sm leading-relaxed">
                  {t("home.feature1Desc")}
                </p>
              </div>

              <div>
                <span className="inline-block text-[16px] font-bold text-primary/70 dark:text-primary-light mb-3 tracking-widest uppercase bg-primary/[0.05] dark:bg-primary/10 px-2 py-1 rounded dark:neon-border">
                  {t("home.feature2Badge")}
                </span>
                <h3 className="text-lg font-bold text-text-secondary mb-2">
                  {t("home.feature2Title")}
                </h3>
                <p className="text-text-primary/70 text-sm leading-relaxed">
                  {t("home.feature2Desc")}
                </p>
              </div>

              <div className="sm:col-span-2 pt-8 border-t border-primary/10 dark:border-primary/15">
                <span className="inline-block text-[16px] font-bold text-primary/70 dark:text-primary-light mb-3 tracking-widest uppercase bg-primary/[0.05] dark:bg-primary/10 px-2 py-1 rounded dark:neon-border">
                  {t("home.feature3Badge")}
                </span>
                <h3 className="text-lg font-bold text-text-primary/70 mb-2">
                  {t("home.feature3Title")}
                </h3>
                <p className="text-text-primary/70 text-sm leading-relaxed max-w-3xl">
                  {t("home.feature3Desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
