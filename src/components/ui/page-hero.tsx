'use client';

import { useTranslations } from "next-intl";
import { Meteors } from "@/components/magicui/meteors";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { TextAnimate } from "@/components/magicui/text-animate";

interface PageHeroProps {
  /**
   * The translation namespace to use for the hero content
   * e.g., "careers", "company", "about"
   */
  translationNamespace: string;
  /**
   * Optional custom badge text (overrides translation)
   */
  badgeText?: string;
  /**
   * Optional custom badge label (overrides translation) 
   */
  badgeLabel?: string;
  /**
   * Optional custom title (overrides translation)
   */
  title?: string;
  /**
   * Optional custom subtitle (overrides translation)
   */
  subtitle?: string;
  /**
   * Whether to show the meteors background animation
   * @default true
   */
  showMeteors?: boolean;
}

export function PageHero({
  translationNamespace,
  badgeText,
  badgeLabel,
  title,
  subtitle,
  showMeteors = true,
}: PageHeroProps) {
  const t = useTranslations(translationNamespace);

  return (
    <>
      <div className="bg-white text-xs sm:text-sm rounded-full font-bold p-0.5 flex items-center gap-2 pr-2 sm:pr-3 max-w-full">
        <div className="bg-primary rounded-full p-1 px-2 text-primary-foreground whitespace-nowrap">
          {badgeLabel || t("badge")}
        </div>
        <div className="text-black text-center sm:text-left">
          {badgeText || t("badgeText")}
        </div>
      </div>

      <section className="flex flex-col items-center gap-6 sm:gap-10 w-full">
        {showMeteors && <Meteors />}
        <div className="max-w-5xl w-full">
          <SparklesText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-bold font-sans leading-tight">
            {title || t("title")}
          </SparklesText>
        </div>
        <div className="text-center text-base sm:text-lg font-sans max-w-2xl text-gray-400 px-4">
          <TextAnimate animation="blurIn" as="p">
            {subtitle || t("subtitle")}
          </TextAnimate>
        </div>
      </section>
    </>
  );
}