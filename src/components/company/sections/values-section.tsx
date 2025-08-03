"use client";

import { useTranslations } from "next-intl";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Particles } from "@/components/magicui/particles";
import {
  TargetIcon,
  RocketIcon,
  StarIcon,
  HeartHandshakeIcon,
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
    {
      key: "resultsFirst",
      Icon: valueIcons.resultsFirst,
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
    },
    {
      key: "enterpriseScale", 
      Icon: valueIcons.enterpriseScale,
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
    },
    {
      key: "technicalExcellence",
      Icon: valueIcons.technicalExcellence,
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
    },
    {
      key: "partnershipMindset",
      Icon: valueIcons.partnershipMindset,
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-3 lg:col-end-4",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
    },
  ];

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-24 relative">
      <Particles className="absolute inset-0 opacity-20" />
      
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
          <TextAnimate animation="slideUp">{t("valuesTitle")}</TextAnimate>
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          <TextAnimate animation="blurIn" delay={0.2} as="span">
            {t("valuesSubtitle")}
          </TextAnimate>
        </p>
      </div>

      <BentoGrid className="lg:grid-rows-2">
        {values.map((value) => (
          <BentoCard
            key={value.key}
            name={t(`values.${value.key}.title`)}
            description={t(`values.${value.key}.description`)}
            href="#"
            cta={t("learnMore", { defaultValue: "Learn More" })}
            Icon={value.Icon}
            background={value.background}
            className={value.className}
          />
        ))}
      </BentoGrid>
    </section>
  );
}