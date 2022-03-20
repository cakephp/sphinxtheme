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

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
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

        // Debounce the header toggling to ever 250ms
        var toggleHeader = function () {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
            setTimeout(toggleHeader, 250);
        };
        setTimeout(toggleHeader, 250);

        // If we're directly linking to a section, hide the nav.
        if (window.location.hash.length) {
            $header.addClass('nav-up');
        }
    }

    return {
        init: init
    }
})();
