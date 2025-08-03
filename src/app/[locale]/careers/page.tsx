import { Footer } from "@/components/footer";
import { 
  HeroSection,
  ValuesSection,
  PositionsSection,
  CTASection
} from "@/components/careers";

interface CareersPageProps {
  params: Promise<{
    locale: 'en' | 'br';
  }>;
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { locale } = await params;
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center pt-6 sm:pt-12 gap-6 sm:gap-8 px-4">
        <HeroSection />
        <ValuesSection />
        <PositionsSection locale={locale} />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}