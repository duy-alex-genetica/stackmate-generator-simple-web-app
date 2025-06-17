/** @type {{i18n: {defaultLocale: string, locales: string[]}}} */
const path = require("path");

const i18nConfig = {
  // debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: "th",
    locales: ["en", "vi", "th", "ko", "zh", "id", "zh-CN"],
    localePath: path.resolve('./public/locales'),
    fallbackLng: {
      "zh-CN": ["zh"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      transSupportBasicHtmlNodes: true,
    }
  },
  localeDetection: false,
};

module.exports = {
  i18nConfig,
}
