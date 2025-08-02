"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  
  const isPortuguese = currentLocale === 'pt';
  
  const switchLanguage = () => {
    const newLocale = isPortuguese ? 'en' : 'pt';
    
    // Remove current locale from pathname if it exists
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
    
    // Build new path based on next-intl's localePrefix: 'as-needed' configuration
    // PT is default locale, so it doesn't need prefix
    let newPath;
    if (newLocale === 'pt') {
      // Default locale doesn't need prefix
      newPath = pathWithoutLocale === '/' ? '/' : pathWithoutLocale;
    } else {
      // Non-default locales need prefix
      newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    }
    
    router.push(newPath);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLanguage}
      className="ml-2"
    >
      {isPortuguese ? 'EN' : 'PT'}
    </Button>
  );
}