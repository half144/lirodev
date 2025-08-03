"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobCardProps } from "../types";

export function JobCard({ position, onApply, onLearnMore }: JobCardProps) {
  const t = useTranslations("careers");

  const handleApply = () => {
    onApply?.(position);
  };

  const handleLearnMore = () => {
    onLearnMore?.(position);
  };

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{position.title}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{position.department}</Badge>
                <Badge variant="outline">{position.location}</Badge>
                <Badge variant="outline">{position.type}</Badge>
              </div>
            </div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            {position.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-white">
                {t("requirementsTitle")}
              </h4>
              <ul className="space-y-2">
                {position.requirements.map((req, reqIndex) => (
                  <li
                    key={reqIndex}
                    className="text-gray-400 text-sm flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-white">
                {t("benefitsTitle")}
              </h4>
              <ul className="space-y-2">
                {position.benefits.map((benefit, benefitIndex) => (
                  <li
                    key={benefitIndex}
                    className="text-gray-400 text-sm flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleApply}
          >
            {t("applyNow")}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleLearnMore}
          >
            {t("learnMore")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
