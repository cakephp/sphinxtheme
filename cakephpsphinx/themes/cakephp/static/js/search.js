/**
 * @typedef {Object} App~Search~Config
 * @property {string} lang
 * @property {string} version
 * @property {string} url
 * @property {string} [highlightPreTag]
 * @property {string} [highlightPostTag]
 * @property {string} [encoder]
 */

/**
 * @callback App~Search~searchCallback
 * @param {string} query
 * @param {Object} [params]
 * @returns {JQuery.jqXHR}
 */

/**
 * @callback App~Search~validateQueryCallback
 * @param {string} query
 * @returns {boolean}
 */

/**
 * @callback App~Search~instructionsCallback
 * @returns {string}
 */
/**
 * @callback App~Search~pendingCallback
 * @returns {string}
 */
/**
 * @callback App~Search~emptyCallback
 * @returns {string}
 */
/**
 * @callback App~Search~errorCallback
 * @param {string} type
 * @returns {string}
 */
/**
 * @callback App~Search~resultCallback
 * @param {App~Search~Result} result
 * @returns {string}
 */

/**
 * @typedef {Object} App~Search~TemplatesConfig
 * @property {App~Search~instructionsCallback} instructions
 * @property {App~Search~pendingCallback} pending
 * @property {App~Search~emptyCallback} empty
 * @property {App~Search~errorCallback} error
 * @property {App~Search~resultCallback} result
 */

/**
 * @typedef {Object} App~Search~Result
 * @property {string} url
 * @property {string} contents
 * @property {string} hierarchy
 * @property {Object} highlights
 * @property {string[]} highlights.contents
 * @property {string[]} highlights.hierarchy
 */

App.Search = (function () {
    "use strict";

    /**
     * @type {Object}
     * @property {string} lang
     * @property {string} version
     * @property {string} url
     * @property {string} highlightPreTag
     * @property {string} highlightPostTag
     * @property {string} encoder
     */
    var _config = {};

    var _defaultConfig = {
        highlightPreTag: '<em class="highlight">',
        highlightPostTag: '</em>',
        encoder: 'html'
    };

    /**
     * @type string
     */
    var base;

    /**
     * @param {string} query
     * @param {Object} [params]
     * @returns {Promise}
     */
    function search(query, params) {
        if (!params) {
            params = {};
        }
        var defaultParams = {
            lang: _config.lang,
            version: _config.version,
            highlightPreTag: _config.highlightPreTag,
            highlightPostTag: _config.highlightPostTag,
            encoder: _config.encoder,
            q: query
        };
        params = $.extend(defaultParams, params);

        var url = _config.url + '?' + $.param(params);

        return $
            .ajax({
                url: url,
                dataType: 'json',
                type: 'GET'
            })
            .then(function (response) {
                $.map(response.data, function (item) {
                    // If the index contains a relative URL, append the base path.
                    // The primary cookbook has this for historical reasons.
                    if (item.url[0] !== '/') {
                        item.url = base + item.url;
                    }
                    item.modified = true;

                    return item;
                });

                return response;
            });
    }

    /**
     * @param {string} query
     * @returns {boolean}
     */
    function validateQuery(query) {
        return query.trim().length >= 3;
    }

    /**
     * @param {App~Search~Config} config
     */
    function init(config) {
        _config = $.extend(true, _defaultConfig, config);

        base = location.href
            .replace(location.protocol + '//' + location.host, '')
            .split('/').slice(0, 2).join('/') + '/';
    }

    return {
        init: init,
        search: search,
        validateQuery: validateQuery
    }
})();
