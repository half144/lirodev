'use client';

import { useTranslations } from "next-intl";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Card } from "@/components/ui/card";

export function TimelineSection() {
  const t = useTranslations("company");

  const timelineItems = [
    "2020",
    "2021", 
    "2022",
    "2023",
    "2024",
    "2025"
  ] as const;

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-24">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          <TextAnimate animation="slideUp">
            {t("timelineTitle")}
          </TextAnimate>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          <TextAnimate animation="blurIn" delay={0.2}>
            {t("timelineSubtitle")}
          </TextAnimate>
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-purple-500 transform md:-translate-x-0.5"></div>
        
        <div className="space-y-12 sm:space-y-16">
          {timelineItems.map((year, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={year}
                className={`relative flex items-center ${
                  isEven 
                    ? 'md:flex-row-reverse md:text-right' 
                    : 'md:flex-row md:text-left'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform md:-translate-x-1/2 z-10">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30"></div>
                </div>
                
                {/* Content */}
                <div className={`flex-1 ml-12 md:ml-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Card className="p-6 sm:p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">
                        <TextAnimate animation="scaleUp" delay={0.1 * (index + 1)}>
                          {year}
                        </TextAnimate>
                      </div>
                      
                      <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                      <TextAnimate animation="slideUp" delay={0.2 * (index + 1)}>
                        {t(`timeline.${year}.title`)}
                      </TextAnimate>
                    </h3>
                    
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      <TextAnimate animation="blurIn" delay={0.3 * (index + 1)}>
                        {t(`timeline.${year}.description`)}
                      </TextAnimate>
                    </p>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}