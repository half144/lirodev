'use client';

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const t = useTranslations("careers");

  const handleViewAllPositions = () => {
    // TODO: Implement view all positions logic
    console.log("View all positions");
  };

  const handleSubmitResume = () => {
    // TODO: Implement submit resume logic
    console.log("Submit resume");
  };

  return (
    <section className="w-full max-w-4xl mt-16 sm:mt-24 mb-16">
      <Card className="p-8 sm:p-12 text-center">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">{t("ctaTitle")}</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t("ctaSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={handleViewAllPositions}
            >
              {t("viewAllPositions")}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleSubmitResume}
            >
              {t("submitResume")}
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}