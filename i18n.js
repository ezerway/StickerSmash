import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import en from './languages/en.json';
import vi from './languages/vi.json';

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  en,
  vi
});

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode;
i18n.defaultLocale = "en-US";
i18n.enableFallback = true;
export { i18n };