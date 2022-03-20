/**
 * @typedef {Object} App~Messages~Config
 * @property {string} lang
 */

/**
 * @typedef {Object.<string, string|App~Messages~MessageMap>} App~Messages~MessageMap
 */

App.Messages = (function () {
    "use strict";

    /**
     * @type {App~Messages~Config}
     */
    var _config = {};

    /**
     * @param {App~Messages~MessageMap} messages
     */
    var _messages = {};

    /**
     * @param {string} lang
     * @param {App~Messages~MessageMap} messages
     */
    function addMessages(lang, messages) {
        _messages[lang] = $.extend(_messages[lang] || {}, messages);
    }

    /**
     * @param {string} key
     * @returns {string|App~Messages~MessageMap}
     */
    function getMessage(key) {
        var message;
        $.each(key.split('.'), function (index, key) {
            message = !!message ? message[key] : _messages[key];
        });

        if (message === null) {
            throw new Error('Message with key `' + key + '` not found.');
        }

        return message;
    }

    /**
     * @param {string} template
     * @return {string}
     */
    function substituteMessages(template) {
        var regex = new RegExp('\{\{(.+?)\}\}', 'g');

        var matches;
        while (matches = regex.exec(template)) {
            var message = getMessage(_config.lang  + '.' + matches[1]);
            template = template.replace(matches[0], message);
        }

        return template;
    }

    /**
     * @param {App~Messages~Config} config
     */
    function init(config) {
        _config = $.extend(true, _config, config);
    }

    return {
        init: init,
        addMessages: addMessages,
        substituteMessages: substituteMessages
    }
})();
