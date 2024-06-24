// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome to React",
          // other translations
        }
      },
      // other languages
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React already protects from XSS
    }
  });

export default i18n;
