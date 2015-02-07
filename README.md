# language
Language service - simple way to make Angular templates multi-lingual.

# Example usage

## greet-directive.js
```js
  /* Define a directive which supports multiple languages */
  angular.module('demo', ['battlesnake.language'])
    .factory('greetStrings', greetStrings)
    .directive('greet', greetDirective)
    ;
  
  /* Override the default fallback language with English */
  angular.module('battlesnake.language')
    .value('fallbackLanguage', 'en_AU')  
  
  /* Define our strings for each language */
  function greetStrings() {
    return {
      /* British English */
      'en_GB': {
        hello: 'Hi',
        how_are_you: 'How\'s it hanging?'
      },
      /* Aussie English */
      'en_AU': {
        hello: 'G\'day',
        how_are_you: null  /* I don't speak Australian unless I'm very drunk */
      },
      /* English */
      'en': {
        hello: 'Hello',
        how_are_you: 'How are you?'
      },
      /* Estonian */
      'et': {
        hello: 'Tere',
        how_are_you: 'Kuidas läheb?'
      },
      /* French */
      'fr': {
        hello: 'Bonjour',
        how_are_you: 'Ça va?'
      },
      /* Spanish */
      'es': {
        hello: 'Hola',
        how_are_you: null  /* I failed Spanish at school, so this will fall back to the default language */
      }
    };
  }
  
  /* Define the directive */
  function greetDirective() {
    return {
      controller: greetController,
      scope: {
        name: '@',
      },
      templateUrl: 'greet-template.html'
    };
  }
  
  function greetController(greetStrings, languageService, $scope) {
    $scope.strings = languageService(greetStrings);
  }
  
```

## Greet-template.html
```html
<strong>{{ strings('hello') }}, {{ name }}!</strong>
<p>{{ strings('how_are_you') }}</p>
```

## Demo
```html
<div greet name="Marili">
</div>
```

 * Where a string cannot be found, the fallback pattern is:
 
   `user-locale -> user-language -> default-locale -> default-language`

 * In this example, if the user has locale `en_GB`, then then strings for en_GB will be used:
 
   `Hi Marili!  
   How's it hanging?`

 * If the user has locale `es_CO`:
    + We have no definitions for this locale, it will fall back to the language `es`.
    + We have a 'hello' string for `es`, so this will be used.
    + We do not have a 'how_are_you' string for `es`, so this will fall back to the default locale (overridden as `en_AU`).
    + `en_AU` has no 'how_are_you' string, so this will fall back to the language `en`.
    + `en` has a 'how_are_you' string, hooray!  This will be used, and we just hope that Spanish users can understand it until we get Spanish translation added :)
    
   `Hola Marili!
   How are you?`
