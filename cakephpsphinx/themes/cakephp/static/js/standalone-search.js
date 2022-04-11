/**
 * @typedef {Object} App~StandaloneSearch~Config
 * @property {number} [limit]
 * @property {App~Search~searchCallback} search
 * @property {App~Search~validateQueryCallback} validateQuery
 * @property {App~Search~TemplatesConfig} templates
 * @property {Function} [onResultsInteraction]
 * @property {Function} [onDeactivate]
 */

App.StandaloneSearch = (function () {
    "use strict";

    /**
     * @type {Object}
     * @property {number} limit
     * @property {App~Search~searchCallback} search
     * @property {App~Search~validateQueryCallback} validateQuery
     * @property {App~Search~TemplatesConfig} templates
     * @property {Function} [onResultsInteraction]
     * @property {Function} [onDeactivate]
     */
    var _config = {};

    var _defaultConfig = {
        limit: 25
    };

    var $element,
      $input,
      $status,
      $results,
      $pagination;

    /**
     * @param {string} x
     * @returns {string}
     */
    function urldecode(x) {
        return decodeURIComponent(x).replace(/\+/g, ' ');
    }

    /**
     * This function returns the parsed url parameters of the
     * current request. Multiple values per key are supported,
     * it will always return arrays of strings for the value parts.
     *
     * @return {Object.<string, string>}
     */
    function getQueryParameters() {
        var s = document.location.search;
        var parts = s.substring(s.indexOf('?') + 1).split('&');

        var result = {};
        for (var i in parts) {
            var tmp = parts[i].split('=', 2);
            var key = urldecode(tmp[0]);
            var value = urldecode(tmp[1]);
            if (key in result) {
                result[key].push(value);
            } else {
                result[key] = [value];
            }
        }

        return result;
    }

    function clearResults() {
        $results.empty();
        $status.empty();
    }

    function setPendingState() {
        clearResults();
        $status.append($(_config.templates.pending()));
    }

    function setEmptyState() {
        clearResults();
        $status.append($(_config.templates.empty()));
    }

    function setSyntaxErrorState() {
        clearResults();
        $status.append(_config.templates.error('syntax'));
    }

    function setGenericErrorState() {
        clearResults();
        $status.append(_config.templates.error('generic'));
    }

    function triggerOnResultsInteraction() {
        if (_config.onResultsInteraction) {
            _config.onResultsInteraction();
        }
    }

    function triggerOnDeactivate() {
        if (_config.onDeactivate) {
            _config.onDeactivate();
        }
    }

    /**
     * Generate the result HTML.
     *
     * @param {App~Search~Result[]} results
     */
    function createResults(results) {
        if (results.length === 0) {
            setEmptyState();
            return;
        }

        $status.empty();
        $results.empty();

        $.each(results, function (index, item) {
            $results.append(
                $('<li></li>').append($(_config.templates.result(item)))
            );
        });
    }

    /**
     * Create the pagination links for a result set.
     *
     * @param {number} total
     * @param {number} page
     */
    function createPagination(total, page) {
        var $element, i;
        var pages = Math.floor(total / _config.limit);

        $pagination.empty();

        for (i = 1; i <= pages; i ++) {
            $element = $('<a href="#"></a>')
                .text(i)
                .attr('page', i);

            if (i === page) {
                $element.addClass('active');
            }

            $pagination.append($element);
        }
    }

    /**
     * @param {string} query
     * @param {number} page
     */
    function executeSearch(query, page) {
        $results.empty();
        $pagination.empty();

        if (!_config.validateQuery(query)) {
            return;
        }

        setPendingState();

        _config
            .search(query, {page: page, limit: _config.limit})
            .done(function (response) {
                createResults(response.data);
                createPagination(response.total, response.page);
            })
            .fail(function (jqXHR) {
                if (jqXHR.getResponseHeader('X-Reason') === 'invalid-syntax') {
                    setSyntaxErrorState();
                } else {
                    setGenericErrorState();
                }
            });
    }

    /**
     * @param {App~StandaloneSearch~Config} config
     */
    function init(config) {
        _config = $.extend(true, _defaultConfig, config);

        $element = $('#standalone-search');
        $element.prepend($(_config.templates.instructions()));

        $input = $element.find('input[type=search]');

        $status = $('<div class="status-container"></div>');
        $element.find('.results').append($status);

        $results = $('<ol class="list"></ol>');
        $element.find('.results').append($results);

        $pagination = $element.find('.pagination');

        $results.on('mouseover focus', '.result', function () {
            triggerOnResultsInteraction();
        });

        $input.bind('input', function () {
            executeSearch($input.val(), 1);
        });

        $input.on('blur', function () {
            triggerOnDeactivate();
        });

        $pagination.on('click', 'a', function (event) {
            event.preventDefault();
            $('html,body').animate({scrollTop: 0}, 200);

            executeSearch($input.val(), $(event.target).attr('page'));
        });

        var params = getQueryParameters();
        if (params.q) {
            $input.val(params.q).trigger('input');
        }
    }

    return {
        init: init
    };
})();
