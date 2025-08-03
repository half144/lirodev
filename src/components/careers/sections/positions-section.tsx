'use client';

import { useTranslations } from "next-intl";
import { JobCard } from "../ui/job-card";
import { JobPosition } from "../types";

export function PositionsSection() {
  const t = useTranslations("careers");

  const openPositions: JobPosition[] = [
    {
      title: t("positions.fullStackDeveloper.title"),
      department: t("positions.fullStackDeveloper.department"),
      location: t("positions.fullStackDeveloper.location"),
      type: t("positions.fullStackDeveloper.type"),
      description: t("positions.fullStackDeveloper.description"),
      requirements: [
        t("positions.fullStackDeveloper.requirements.0"),
        t("positions.fullStackDeveloper.requirements.1"),
        t("positions.fullStackDeveloper.requirements.2"),
        t("positions.fullStackDeveloper.requirements.3")
      ],
      benefits: [
        t("benefits.remoteWork"),
        t("benefits.healthInsurance"),
        t("benefits.flexibleHours"),
        t("benefits.careerGrowth")
      ]
    },
    {
      title: t("positions.devopsEngineer.title"),
      department: t("positions.devopsEngineer.department"),
      location: t("positions.devopsEngineer.location"),
      type: t("positions.devopsEngineer.type"),
      description: t("positions.devopsEngineer.description"),
      requirements: [
        t("positions.devopsEngineer.requirements.0"),
        t("positions.devopsEngineer.requirements.1"),
        t("positions.devopsEngineer.requirements.2"),
        t("positions.devopsEngineer.requirements.3")
      ],
      benefits: [
        t("benefits.remoteWork"),
        t("benefits.healthInsurance"),
        t("benefits.flexibleHours"),
        t("benefits.careerGrowth")
      ]
    },
    {
      title: t("positions.productManager.title"),
      department: t("positions.productManager.department"),
      location: t("positions.productManager.location"),
      type: t("positions.productManager.type"),
      description: t("positions.productManager.description"),
      requirements: [
        t("positions.productManager.requirements.0"),
        t("positions.productManager.requirements.1"),
        t("positions.productManager.requirements.2"),
        t("positions.productManager.requirements.3")
      ],
      benefits: [
        t("benefits.remoteWork"),
        t("benefits.healthInsurance"),
        t("benefits.flexibleHours"),
        t("benefits.careerGrowth")
      ]
    }
  ];

  const handleApply = (position: JobPosition) => {
    // TODO: Implement apply logic
    console.log("Apply to position:", position.title);
  };

  const handleLearnMore = (position: JobPosition) => {
    // TODO: Implement learn more logic
    console.log("Learn more about position:", position.title);
  };

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("positionsTitle")}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{t("positionsSubtitle")}</p>
      </div>

      <div className="space-y-6">
        {openPositions.map((position, index) => (
          <JobCard 
            key={index} 
            position={position}
            onApply={handleApply}
            onLearnMore={handleLearnMore}
          />
        ))}
      </div>
    </section>
  );
}