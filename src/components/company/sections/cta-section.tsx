'use client';

import { useTranslations } from "next-intl";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Particles } from "@/components/magicui/particles";

export function CTASection() {
  const t = useTranslations("company");

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-32 mb-16 sm:mb-24 relative">
      <Particles className="absolute inset-0 opacity-40" />
      
      <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            <TextAnimate animation="slideUp">
              {t("ctaTitle")}
            </TextAnimate>
          </h2>
          
          <p className="text-gray-300 text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed">
            <TextAnimate animation="blurIn" delay={0.2}>
              {t("ctaSubtitle")}
            </TextAnimate>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ShimmerButton className="text-white text-base sm:text-lg px-8 py-4">
              <TextAnimate animation="slideUp" delay={0.3}>
                {t("ctaButton")}
              </TextAnimate>
            </ShimmerButton>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary/10 text-base sm:text-lg px-8 py-4"
            >
              <TextAnimate animation="slideUp" delay={0.4}>
                {t("ctaSecondary")}
              </TextAnimate>
            </Button>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-primary/20 blur-xl opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-primary/15 blur-2xl opacity-50"></div>
      </div>
    </section>
  );
}