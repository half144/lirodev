'use client';

import { SparklesText } from "@/components/magicui/sparkles-text";
import { TextAnimate } from "@/components/magicui/text-animate";

interface HeroSectionProps {
  badge?: string;
  badgeText?: string;
  title: string;
  subtitle: string;
  className?: string;
}

export function HeroSection({ 
  badge, 
  badgeText, 
  title, 
  subtitle, 
  className = "" 
}: HeroSectionProps) {
  return (
    <>
      {badge && (
        <div className="bg-white text-xs sm:text-sm rounded-full font-bold p-0.5 flex items-center gap-2 pr-2 sm:pr-3 max-w-full">
          <div className="bg-primary rounded-full p-1 px-2 text-primary-foreground whitespace-nowrap">
            {badge}
          </div>
          {badgeText && (
            <div className="text-black text-center sm:text-left">
              {badgeText}
            </div>
          )}
        </div>
      )}

      <section className={`flex flex-col items-center gap-6 sm:gap-10 w-full ${className}`}>
        <div className="max-w-5xl w-full">
          <SparklesText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-bold font-sans leading-tight">
            {title}
          </SparklesText>
        </div>
        <div className="text-center text-base sm:text-lg font-sans max-w-2xl text-gray-400 px-4">
          <TextAnimate animation="blurIn" as="p">
            {subtitle}
          </TextAnimate>
        </div>
      </section>
    </>
  );
}