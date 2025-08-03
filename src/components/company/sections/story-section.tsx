'use client';

import { useTranslations } from "next-intl";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Card } from "@/components/ui/card";
import { Particles } from "@/components/magicui/particles";

export function StorySection() {
  const t = useTranslations("company");

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-24 relative">
      <Particles className="absolute inset-0 opacity-30" />
      
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          <TextAnimate animation="slideUp">
            {t("storyTitle")}
          </TextAnimate>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          <TextAnimate animation="blurIn" delay={0.2}>
            {t("storySubtitle")}
          </TextAnimate>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div className="space-y-6">
          <div className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            <TextAnimate animation="blurIn" delay={0.3}>
              {t("storyContent")}
            </TextAnimate>
          </div>
          
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 p-6">
            <div className="text-lg sm:text-xl font-semibold text-white">
              <TextAnimate animation="slideLeft" delay={0.4}>
                {t("storyHighlight")}
              </TextAnimate>
            </div>
          </Card>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center">
              <div className="text-6xl sm:text-7xl font-bold text-primary/50">
                2020
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/30 blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-primary/20 blur-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}