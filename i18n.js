import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import de from './languages/de.json';
import en from './languages/en.json';
import es from './languages/es.json';
import fr from './languages/fr.json';
import ja from './languages/ja.json';
import ko from './languages/ko.json';
import vi from './languages/vi.json';
import zh from './languages/zh.json';

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  en,
  vi,
  de,
  es,
  fr,
  ja,
  ko,
  zh,
});

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode;
i18n.defaultLocale = 'en-US';
i18n.enableFallback = true;
export { i18n };
