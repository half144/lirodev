import { getTranslations } from 'next-intl/server';
import { Meteors } from '@/components/magicui/meteors';
import { HeroSection } from '@/components/hero-section';
import { LetsTalkForm } from '@/components/lets-talk-form';
import { Footer } from '@/components/footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LetsTalk' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}

export default async function LetsTalkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LetsTalk' });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Meteors number={20} />
      
      <main className="flex flex-col items-center pt-6 sm:pt-12 gap-6 sm:gap-8 px-4 relative z-10">
        <HeroSection
          badge={t('hero.badge')}
          badgeText={t('hero.badgeText')}
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
        />

        {/* Form Section */}
        <div className="w-full max-w-2xl mt-8 sm:mt-12">
          <LetsTalkForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}