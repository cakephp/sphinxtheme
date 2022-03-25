/**
 * @typedef {Object} App~InlineSearch~Config
 * @property {App~Search~searchCallback} search
 * @property {App~Search~validateQueryCallback} validateQuery
 * @property {App~Search~TemplatesConfig} templates
 * @property {Function} [onResultsInteraction]
 * @property {Function} [onDeactivate]
 */

/**
 * @typedef {Object} App~InlineSearch~ResultStackItem
 * @property {JQuery} $element
 * @property {App~Search~Result} result
 */

App.InlineSearch = (function () {
    "use strict";

    /**
     * @type {App~InlineSearch~Config}
     */
    var _config = {};

    /**
     * @param {HTMLElement} input
     */
    function createWidget (input) {
        /**
         * @type {App~InlineSearch~ResultStackItem[]}
         */
        var resultsStack = [];
        var currentResultsStackIndex = -1;
        var resultsVisible = false;
        var query;

        var $window = $(window);
        var $input = $(input);

        var $results = $('<div class="inline-search results"></div>');
        $input.parent().append($results);

        /**
         * This could be done purely in CSS, but mobile browsers still
         * don't have their stuff together, their top/bottom bars still
         * mess up what 100vh means.
         */
        function adjustResultsMaxHeight() {
            var vh = $window.innerHeight();
            var top = $results.offset().top;
            var margin = 10;

            $results.css('max-height', (vh - top - margin) + 'px');
        }

        function showResults() {
            resultsVisible = true;
            if ($results.is(':empty')) {
                $results.append(_config.templates.instructions());
            }
            $results.show();
            adjustResultsMaxHeight();
        }

        function hideResults() {
            resultsVisible = false;
            $results.hide();
        }

        function clearResults() {
            clearResultsStack();
            $results.empty();
        }

        function setPendingState() {
            clearResults();
            $results.append(
              _config.templates.instructions(),
              _config.templates.pending()
            );
        }

        function setEmptyState() {
            clearResults();
            $results.append(
              _config.templates.instructions(),
              _config.templates.empty()
            );
        }

        function setSyntaxErrorState() {
            clearResults();
            $results.append(
              _config.templates.instructions(),
              _config.templates.error('syntax')
            );
        }

        function setGenericErrorState() {
            clearResults();
            $results.append(
              _config.templates.instructions(),
              _config.templates.error('generic')
            );
        }

        function clearResultsStack() {
            resultsStack = [];
            currentResultsStackIndex = -1;
        }

        /**
         * @param {App~Search~Result} result
         */
        function addResult(result) {
            var $result = $(_config.templates.result(result));
            $results.append($result);
            resultsStack.push({$element: $result, result: result});
        }

        function resetResultCursor() {
            clearResultCursor();
            currentResultsStackIndex = -1;
        }

        function clearResultCursor() {
            $.each(resultsStack, function (index, item) {
                item.$element.removeClass('cursor');
            });
        }

        /**
         * @param {number} index
         */
        function setResultCursor(index) {
            clearResultCursor();
            resultsStack[index].$element.addClass('cursor');
            $input.val(resultsStack[index].result.hierarchy.join(' > '));
        }

        function resetInput() {
            $input.val(query);
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

        $input.on('input', function () {
            clearResults();
            showResults();

            query = $input.val().trim();
            if (!_config.validateQuery(query)) {
                return;
            }

            setPendingState();

            _config
                .search(query)
                .done(function (response) {
                    if (!$.isArray(response.data) || !response.data.length) {
                        setEmptyState();
                        return;
                    }

                    clearResults();

                    $.each(response.data, function (index, result) {
                        addResult(result);
                    });
                })
                .fail(function (jqXHR) {
                    if (jqXHR.getResponseHeader('X-Reason') === 'invalid-syntax') {
                        setSyntaxErrorState();
                    } else {
                        setGenericErrorState();
                    }
                });
        });

        $input.on('keyup', function (event) {
            switch(event.which) {
                case 27: // ESC
                    hideResults();
                    resetResultCursor();
                    resetInput();
                    break;
            }
        });

        $input.on('keydown', function (event) {
            switch(event.which) {
                case 38: // UP
                    if (resultsStack.length) {
                        if (currentResultsStackIndex < 0) {
                            currentResultsStackIndex = resultsStack.length;
                        }
                        if (-- currentResultsStackIndex < 0) {
                            resetResultCursor();
                            resetInput();
                        } else {
                            setResultCursor(currentResultsStackIndex);
                            showResults();
                            triggerOnResultsInteraction();
                        }
                    }
                    break;

                case 40: // DOWN
                    if (resultsStack.length) {
                        if (++ currentResultsStackIndex >= resultsStack.length) {
                            resetResultCursor();
                            resetInput();
                        } else {
                            setResultCursor(currentResultsStackIndex);
                            showResults();
                            triggerOnResultsInteraction();
                        }
                    }
                    break;

                case 9: // TAB
                case 13: // ENTER
                case 39: // RIGHT
                    if (
                        resultsVisible &&
                        currentResultsStackIndex !== -1
                    ) {
                        event.preventDefault();
                        window.location.href = resultsStack[currentResultsStackIndex].result.url;
                    }
                    break;
            }
        });

        $results.on('mousedown', function (event) {
            event.preventDefault();
        });

        $results.on('mouseover', '.result', function () {
            triggerOnResultsInteraction();
        });

        $input.on('blur', function () {
            hideResults();
            resetResultCursor();
            resetInput();
            triggerOnDeactivate();
        });

        $input.on('focus', function () {
            showResults();
        });

        $window.on('resize', adjustResultsMaxHeight);

        hideResults();
    }

    /**
     * @param {App~InlineSearch~Config} config
     */
    function init(config) {
        _config = $.extend(true, _config, config);

        $('.search input[type=search]').each(function () {
            createWidget(this);
        });
    }

    return {
        init: init
    };
})();
