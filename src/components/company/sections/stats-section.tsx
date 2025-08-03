'use client';

import { useTranslations } from "next-intl";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Card } from "@/components/ui/card";

export function StatsSection() {
  const t = useTranslations("company");

  const stats = [
    "clients",
    "roi", 
    "uptime",
    "teamSize"
  ] as const;

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-24">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          <TextAnimate animation="slideUp">
            {t("statsTitle")}
          </TextAnimate>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          <TextAnimate animation="blurIn" delay={0.2}>
            {t("statsSubtitle")}
          </TextAnimate>
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={stat}
            className="p-6 sm:p-8 text-center bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20 hover:border-primary/40 transition-all duration-300 group"
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
              <TextAnimate animation="scaleUp" delay={0.1 * (index + 1)}>
                {t(`stats.${stat}.number`)}
              </TextAnimate>
            </div>
            
            <div className="text-gray-400 text-sm sm:text-base font-medium">
              <TextAnimate animation="blurIn" delay={0.2 * (index + 1)}>
                {t(`stats.${stat}.label`)}
              </TextAnimate>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}