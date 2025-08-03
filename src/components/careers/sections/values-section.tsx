'use client';

import { useTranslations } from "next-intl";
import { 
  RocketIcon,
  PersonIcon,
  LightningBoltIcon,
  HeartIcon
} from "@radix-ui/react-icons";
import { ValueCard } from "../ui/value-card";
import { CompanyValue } from "../types";

export function ValuesSection() {
  const t = useTranslations("careers");

  const values: CompanyValue[] = [
    {
      icon: RocketIcon,
      title: t("values.innovation.title"),
      description: t("values.innovation.description")
    },
    {
      icon: PersonIcon,
      title: t("values.collaboration.title"),
      description: t("values.collaboration.description")
    },
    {
      icon: LightningBoltIcon,
      title: t("values.excellence.title"),
      description: t("values.excellence.description")
    },
    {
      icon: HeartIcon,
      title: t("values.impact.title"),
      description: t("values.impact.description")
    }
  ];

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("valuesTitle")}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{t("valuesSubtitle")}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => (
          <ValueCard key={index} value={value} index={index} />
        ))}
      </div>
    </section>
  );
}