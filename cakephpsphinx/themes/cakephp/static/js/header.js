App.Header = (function () {
    "use strict";

    var $header;
    var $win;
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight;

    function hasScrolled() {
        var st = $win.scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta) {
            return;
        }

        // If they scrolled down and are half-past the navbar, add class
        // nav-up. This is necessary so that content isn't being hidden
        // "behind" the navbar.
        if (st > lastScrollTop && st > (navbarHeight / 2)){
            // Scroll Down
            $header.removeClass('nav-down').addClass('nav-up');
        } else if (st + $win.height() < $(document).height()) {
            // Scroll Up
            $header.removeClass('nav-up').addClass('nav-down');
        }

        lastScrollTop = st;
    }

    function init() {
        // Hide Header on scroll down
        $header = $('header');
        $win = $(window);
        navbarHeight = $header.outerHeight();

        $(window).scroll(function() {
            didScroll = true;
        });

        // Debounce the header toggling to every 250ms
        var toggleHeader = function () {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
            setTimeout(toggleHeader, 250);
        };
        setTimeout(toggleHeader, 250);
    }

    return {
        init: init
    }
})();
