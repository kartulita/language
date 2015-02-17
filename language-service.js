(function (angular, _) {
	'use strict';

	angular.module('battlesnake.language')
		.factory('languageService', languageService)
		.value('fallbackLanguages', ['en'])
		.factory('defaultLanguage', defaultLanguageGetter)
		;

	function defaultLanguageGetter($locale) {
		return $locale.id;
	}

	function languageService(fallbackLanguages, defaultLanguage) {
		/* Wraps a strings object[lang][id] in a getter function */
		return function languageWrapper(strings) {
			/*
			 * Gets string 'id' in given 'locale'.  If not found or if locale is
			 * not specified, then falls back to 'fallbackLanguage'.  If not
			 * found or fallbackLanguage is not specified, then falls backt to
			 * un-camelCased version of 'id'.
			 */
			return function languageStringGetter(id, locale) {
				var langs = _(fallbackLanguages).clone();
				langs.unshift(defaultLanguage);
				langs.unshift(locale);
				var string;
				for (var i = 0; i < langs.length; i++) {
					if (string = get(langs[i])) {
						return string;
					}
				}
				console.error('languageService: no translation found for ' + id);
				return id.replace(/[a-z][A-Z]/g, '$1 $2');

				function get(locale) {
					if (!locale) {
						return null;
					}
					/* Try locale */
					var string = strings[locale] && strings[locale][id];
					/* Try language */
					if (!string && locale.length > 2) {
						var lang = locale.substr(0, 2);
						string = strings[lang] && strings[lang][id];
					}
					/* Warn if not found */
					if (!string) {
						console.warn('languageService: string "' + id + '" not found for locale/language "' + locale + '"');
					}
					return string;
				}
			}
		};
	}

})(window.angular, window._);
