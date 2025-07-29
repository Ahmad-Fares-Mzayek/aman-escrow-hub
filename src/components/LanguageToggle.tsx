import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  
  const currentLanguage = i18n.language;
  const isArabic = currentLanguage === 'ar';
  
  const toggleLanguage = () => {
    const newLang = isArabic ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="h-9 px-3 flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {isArabic ? 'EN' : 'ع'}
      </span>
    </Button>
  );
};