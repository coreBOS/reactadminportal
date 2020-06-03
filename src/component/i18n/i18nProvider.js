import es from "./lang/es";
import en from "./lang/en";
import polyglotI18nProvider from 'ra-i18n-polyglot';

const i18nProvider = polyglotI18nProvider(locale =>
        locale === 'es' ? es : en,
    'en'
);

export default i18nProvider
