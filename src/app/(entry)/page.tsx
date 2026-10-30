import {
  defaultLocale,
  localeLabels,
  localePath,
  locales,
  localeStorageKey,
} from "@/i18n/config";

// Elige el idioma guardado, si no el del navegador y, por defecto, español. Conserva el ancla.
const redirectScript = `(function(){
  var supported = ${JSON.stringify(locales)};
  var locale = null;
  try { locale = localStorage.getItem(${JSON.stringify(localeStorageKey)}); } catch (e) {}
  if (supported.indexOf(locale) === -1) {
    var langs = navigator.languages || [navigator.language || ""];
    locale = ${JSON.stringify(defaultLocale)};
    for (var i = 0; i < langs.length; i++) {
      var code = String(langs[i]).slice(0, 2).toLowerCase();
      if (supported.indexOf(code) !== -1) { locale = code; break; }
    }
  }
  location.replace("/" + locale + "/" + location.hash);
})();`;

export default function EntryPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta
          httpEquiv="refresh"
          content={`0; url=${localePath(defaultLocale)}`}
        />
      </noscript>
      <nav
        aria-label="Idioma / Language"
        className="font-display flex gap-4 text-lg"
      >
        {locales.map((locale) => (
          <a
            key={locale}
            href={localePath(locale)}
            hrefLang={locale}
            lang={locale}
            className="text-pearl-white underline"
          >
            {localeLabels[locale].name}
          </a>
        ))}
      </nav>
    </>
  );
}
