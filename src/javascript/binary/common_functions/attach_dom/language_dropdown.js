var getLanguage = require('../../base/language').getLanguage;
var getAllLanguages = require('../../base/language').getAllLanguages;
var onChangeLanguage = require('../../base/language').onChangeLanguage;

var $languages,
    languageCode,
    languageText;

function create_language_drop_down(languages) {
    $languages = $('.languages');
    var selectLanguage = 'ul#select_language',
        $selectLanguage = $languages.find(selectLanguage);
    if ($languages.length === 0 || $selectLanguage.find('li span.language').text() !== '') return;
    languages.sort(function(a, b) {
        return (a === 'EN' || a < b) ? -1 : 1;
    });
    var displayLanguage = 'ul#display_language';
    languageCode = getLanguage();
    languageText = map_code_to_language(languageCode);
    add_display_language(displayLanguage);
    add_display_language(selectLanguage);
    for (var i = 0; i < languages.length; i++) {
        $selectLanguage.append('<li class="' + languages[i] + '">' + map_code_to_language(languages[i]) + '</li>');
    }
    $selectLanguage.find('li.' + languageCode + ':eq(1)').addClass('invisible');
    onChangeLanguage();
    $('.languages').removeClass('invisible');
}

function add_display_language(id) {
    $languages.find(id + ' li')
              .addClass(languageCode)
              .find('span.language')
              .text(languageText);
}

function map_code_to_language(code) {
    var map = getAllLanguages();
    return map[code];
}

module.exports = {
    create_language_drop_down: create_language_drop_down,
};
