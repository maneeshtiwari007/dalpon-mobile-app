import * as Localization from 'expo-localization'
import { I18n } from 'i18n-js'
import en from './en.json';
import pt from './pt.json';
const i18n = new I18n();
// Normalizating locale returns.
const normalizeTranslate = {
    'pt': 'pt-BR',
    'pt-BR': 'pt-BR',
    'en': 'en-US',
    'en-US': 'en-US',
    'en-IN': 'pt'
}
// Configuring translations.
i18n.enableFallback = true
i18n.translations = { en, pt }
i18n.defaultLocale = 'pt'
i18n.locale = (normalizeTranslate[Localization.locale]) ? normalizeTranslate[Localization.locale] : 'en';

// Exports translations lib.
export default i18n;
export function changeLanguage(lang) {
    i18n.locale = lang;
}
