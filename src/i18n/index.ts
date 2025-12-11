import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import kn from './kn.json';
import hi from './hi.json';

const savedLanguage = localStorage.getItem('app-language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      kn: { translation: kn },
      hi: { translation: hi },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
