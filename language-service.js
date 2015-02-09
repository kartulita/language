(function (angular) {
	'use strict';

	angular.module('battlesnake.language')
		.value('fallbackLanguage', 'et')
		.factory('languageService', languageService)
		;

	function languageService(fallbackLanguage, $locale) {
		/* Wraps a strings object[lang][id] in a getter function */
		return function languageWrapper(strings) {
			/*
			 * Gets string 'id' in given 'locale'.  If not found or if locale is
			 * not specified, then falls back to 'fallbackLanguage'.  If not
			 * found or fallbackLanguage is not specified, then falls backt to
			 * un-camelCased version of 'id'.
			 */
			return function languageStringGetter(id, locale) {
				var string;
				/* Try given locale if specified */
				if (string = get(locale)) {
					return string;
				}
				/* Try browser locale */
				if (locale !== $locale.id && (string = get($locale.id))) {
					return string;
				}
				/* Try fallback/default language */
				if ($locale.id !== fallbackLanguage && (string = get(fallbackLanguage))) {
					return string;
				}
				/* Worst case: un-camelCase the ID and return it */
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

})(window.angular);
