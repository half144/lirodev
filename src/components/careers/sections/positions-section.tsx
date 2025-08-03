'use client';

import { useTranslations } from "next-intl";
import { JobCard } from "../ui/job-card";
import { getAllJobs, JobPosition } from "@/lib/data/jobs";

interface PositionsSectionProps {
  locale: 'en' | 'br';
}

export function PositionsSection({ locale }: PositionsSectionProps) {
  const t = useTranslations("careers");
  
  const allJobs = getAllJobs();

  const handleApply = (position: JobPosition) => {
    // TODO: Implement apply logic
    console.log("Apply to position:", position.title[locale]);
  };

  const handleLearnMore = (position: JobPosition) => {
    // Navigate to job detail page
    window.location.href = `/${locale}/careers/${position.slug}`;
  };

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t("positionsTitle")}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{t("positionsSubtitle")}</p>
      </div>

      <div className="space-y-6">
        {allJobs.map((position) => (
          <JobCard 
            key={position.id} 
            position={{
              title: position.title[locale],
              department: position.department[locale],
              location: position.location[locale],
              type: position.type[locale],
              description: position.description[locale],
              requirements: position.requirements[locale],
              benefits: position.benefits[locale]
            }}
            onApply={() => handleApply(position)}
            onLearnMore={() => handleLearnMore(position)}
          />
        ))}
      </div>
    </section>
  );
}