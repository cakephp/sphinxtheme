if (/cakephp\.org/.test(document.domain)) {
    document.domain = 'cakephp.org';
}

/**
 * @typedef {Object} App~Config
 * @property {string} lang
 * @property {string} version
 * @property {Object} search
 * @property {string} search.url
 * @property {string} [search.highlightPreTag]
 * @property {string} [search.highlightPostTag]
 * @property {string} [search.encoder]
 * @property {Object} [search.templates]
 * @property {App~Search~instructionsCallback} [search.templates.instructions]
 * @property {App~Search~pendingCallback} [search.templates.pending]
 * @property {App~Search~emptyCallback} [search.templates.empty]
 * @property {App~Search~errorCallback} [search.templates.error]
 * @property {App~Search~resultCallback} [search.templates.result]
 * @property {Object} [standaloneSearch]
 * @property {number} [standaloneSearch.limit]
 */

App = (function ($) {
    "use strict";

    /**
     * @type {Object}
     * @property {string} lang
     * @property {string} version
     * @property {Object} search
     * @property {string} search.url
     * @property {string} search.highlightPreTag
     * @property {string} search.highlightPostTag
     * @property {string} search.encoder
     * @property {App~Search~TemplatesConfig} search.templates
     * @property {Object} standaloneSearch
     * @property {number} standaloneSearch.limit
     */
    var _config = {};

    var _defaultConfig = {
        search: {
            templates: {
                instructions: function () {
                    return App.Messages.substituteMessages(
                        '<div class="instructions">' +
                            '<p class="intro">{{search.instructions.intro}}</p>' +
                            '<ul class="syntax">' +
                                '<li>{{search.instructions.phrases}}</li>' +
                                '<li>{{search.instructions.modifiers}}</li>' +
                                '<li>{{search.instructions.boolean}}' +
                            '</ul>' +
                            '<p class="notes">{{search.instructions.notes}}</p>' +
                        '</div>'
                    );
                },

                pending: function () {
                    return App.Messages.substituteMessages(
                        '<div class="status pending">{{search.pending}}</div>'
                    );
                },

                empty: function () {
                    return App.Messages.substituteMessages(
                      '<div class="status empty">{{search.empty}}</div>'
                    );
                },

                /**
                 * @param {string} type
                 * @returns {string}
                 */
                error: function (type) {
                    return App.Messages.substituteMessages(
                      '<div class="status error">{{search.error.' + type + '}}</div>'
                    );
                },

                /**
                 * @param {App~Search~Result} result
                 * @returns {string}
                 */
                result: function (result) {
                    var $link = $('<a class="result"></a>');
                    $link.attr('href', result.url);

                    var $article = $('<article></article>');
                    $link.append($article);

                    var $header = $('<header></header>');
                    $article.append($header);

                    var hierarchy = result.hierarchy.slice();
                    if (result.highlights.hierarchy.length) {
                        hierarchy = result.highlights.hierarchy;
                    }

                    var section = hierarchy.shift();
                    $header.append($('<h1 class="section"></h1>').html(section));

                    if (hierarchy.length) {
                        var title = '> ' + hierarchy.join(' > ');
                        $header.append($('<p class="title"></p>').html(title));
                    }

                    var contents = result.contents;
                    if (result.highlights.contents.length) {
                        contents = result.highlights.contents;
                    }
                    if (contents.join) {
                        contents = contents.join("\n");
                    }

                    var $content = $('<p class="content"></p>').html(contents);
                    $article.append($content);

                    return $link.prop('outerHTML');
                }
            }
        },
        standaloneSearch: {}
    };

    /**
     * @param {string} query
     */
    function onSearchCompleted(query) {
        var gaq = _gaq || [];
        gaq.push(['_trackEvent', 'Search', 'Search in ' + _config.version + '/' + _config.lang, query]);
    }

    /**
     * @param {App~Config} config
     */
    function init(config) {
        _config = $.extend(true, _defaultConfig, config);

        App.Messages.init({
            lang: _config.lang
        });
        App.Common.init();
        App.ResponsiveMenus.init();
        App.MegaMenu.init();
        App.Header.init();

        App.Search.init(
            $.extend(
                true,
                {
                    lang: _config.lang,
                    version: _config.version,
                    onSearchCompleted: onSearchCompleted
                },
                _config.search
            )
        );

        var searchConfig = {
            search: App.Search.search,
            validateQuery: App.Search.validateQuery,
            templates: _config.search.templates,

            /**
             * As it's pretty much impossible to tell what makes a "completed search",
             * eg a search where the intended search terms have been entered completely,
             * the trigger is being invoked in multiple different ways to cover a range
             * of scenarios for a somewhat reasonable compromise.
             *
             * 1. Three seconds after a search has been executed.
             * 2. When hovering or navigating the search results.
             * 3. When the input field loses focus.
             *
             * In any case the `onSearchCompleted` callback will only be invoked once
             * for every executed search query, no matter how often the trigger is invoked.
             */
            onResultsInteraction: App.Search.triggerOnSearchCompleted,
            onDeactivate: App.Search.triggerOnSearchCompleted
        };
        App.InlineSearch.init(searchConfig);
        App.StandaloneSearch.init($.extend(true, searchConfig, _config.standaloneSearch));
    }

    return {
        init: init
    };
})(jQuery);
