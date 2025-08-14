'use client';

import { useTranslations } from "next-intl";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Meteors } from "@/components/magicui/meteors";

export function HeroSection() {
  const t = useTranslations("company");

  return (
    <section className="flex flex-col items-center gap-6 sm:gap-10 w-full relative">
      <Meteors />
      
      <div className="bg-card border border-border text-xs sm:text-sm rounded-full font-bold p-0.5 flex items-center gap-2 pr-2 sm:pr-3 max-w-full">
        <div className="bg-primary rounded-full p-1 px-2 text-primary-foreground whitespace-nowrap">
          {t("badge")}
        </div>
        <div className="text-card-foreground text-center sm:text-left">
          {t("badgeText")}
        </div>
      </div>

      <div className="max-w-5xl w-full">
        <SparklesText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-bold font-sans leading-tight">
          {t("title")}
        </SparklesText>
      </div>

      <div className="text-center text-base sm:text-lg font-sans max-w-3xl text-muted-foreground px-4">
        <TextAnimate animation="blurIn" as="p">
          {t("subtitle")}
        </TextAnimate>
      </div>
    </section>
  );
}