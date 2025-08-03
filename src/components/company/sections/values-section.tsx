'use client';

import { useTranslations } from "next-intl";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Card } from "@/components/ui/card";
import { 
  TargetIcon, 
  RocketIcon, 
  StarIcon, 
  HeartHandshakeIcon 
} from "lucide-react";

const valueIcons = {
  resultsFirst: TargetIcon,
  enterpriseScale: RocketIcon,
  technicalExcellence: StarIcon,
  partnershipMindset: HeartHandshakeIcon,
};

export function ValuesSection() {
  const t = useTranslations("company");

  const values = [
    "resultsFirst",
    "enterpriseScale", 
    "technicalExcellence",
    "partnershipMindset"
  ] as const;

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-24">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          <TextAnimate animation="slideUp">
            {t("valuesTitle")}
          </TextAnimate>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          <TextAnimate animation="blurIn" delay={0.2}>
            {t("valuesSubtitle")}
          </TextAnimate>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {values.map((value, index) => {
          const Icon = valueIcons[value];
          
          return (
            <Card 
              key={value}
              className="p-6 sm:p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                    <TextAnimate animation="slideLeft" delay={0.1 * (index + 1)}>
                      {t(`values.${value}.title`)}
                    </TextAnimate>
                  </h3>
                  
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    <TextAnimate animation="blurIn" delay={0.2 * (index + 1)}>
                      {t(`values.${value}.description`)}
                    </TextAnimate>
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}