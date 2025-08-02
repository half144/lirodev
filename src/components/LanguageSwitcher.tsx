"use client";

import { useRouter, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  
  const switchLanguage = () => {
    const newLocale = currentLocale === 'pt' ? 'en' : 'pt';
    router.push(pathname, { locale: newLocale });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLanguage}
      className="ml-2"
    >
      {currentLocale === 'pt' ? 'EN' : 'PT'}
    </Button>
  );
}