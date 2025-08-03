import { Footer } from "@/components/footer";
import { PageHero } from "@/components/ui/page-hero";
import {
  ValuesSection,
  PositionsSection,
  CTASection,
} from "@/components/careers";

export default async function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center pt-6 sm:pt-12 gap-6 sm:gap-8 px-4">
        <PageHero translationNamespace="careers" />
        <ValuesSection />
        <PositionsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
