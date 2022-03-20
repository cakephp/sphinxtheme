App.MegaMenu = (function () {
    "use strict";

    /**
     * @param {JQuery} $menu
     * @param {boolean} isMobileDevice
     */
    function desktopMenu($menu, isMobileDevice) {
        $menu.children("li").show();

        if (isMobileDevice) {
            // Mobile touch for tablets > 768px
            $menu.on("click touchstart","a", function(e){
                if ($(this).attr('href') === '#') {
                    e.preventDefault();
                    e.stopPropagation();
                }

                var $this = $(this),
                    $sub = $this.siblings(".submenu, .megamenu");

                $this
                  .parent("li")
                  .siblings("li")
                  .find(".submenu, .megamenu")
                  .stop(true, true)
                  .fadeOut(300);

                if ($sub.css("display") === "none") {
                    $sub
                      .stop(true, true)
                      .fadeIn(300);
                } else {
                    $sub
                      .stop(true, true)
                      .fadeOut(300);
                    $this
                      .siblings(".submenu")
                      .find(".submenu")
                      .stop(true, true)
                      .fadeOut(300);
                }
            });

            $(document).on("click.menu touchstart.menu", function(e){
                if ($(e.target).closest($menu).length === 0) {
                    $menu.find(".submenu, .megamenu").fadeOut(300);
                }
            });
        } else {
            // Desktop hover effect
            $menu.find('li').on({
                "mouseenter": function() {
                    $(this).children(".submenu, .megamenu").stop(true, true).fadeIn(300);
                },
                "mouseleave": function() {
                    $(this).children(".submenu, .megamenu").stop(true, true).fadeOut(300);
                }
            });
        }
    }

    /**
     * @param {JQuery} $menu
     */
    function mobileMenu($menu) {
        var $children = $menu.children("li");
        var $toggle = $menu.children("li.toggle-menu");

        // TODO this toggle doesn't seem to exist
        $toggle.show(0).on("click", function(){
            if ($children.is(":hidden")){
                $children.slideDown(300);
            } else {
                $toggle.show();
            }
        });

        // Click (touch) effect
        $menu.find("li").not(".toggle-menu").each(function(){
            var el = $(this);
            if (el.children(".submenu, .megamenu").length) {
                el.children("a").on("click", function(e){
                    if ($(this).attr('href') === '#') {
                        e.preventDefault();
                        e.stopPropagation();
                    }

                    var $sub = $(this).siblings(".submenu, .megamenu");

                    if ($sub.hasClass("open")) {
                        $sub.slideUp(300).removeClass("open");
                    } else {
                        $sub.slideDown(300).addClass("open");
                    }
                });
            }
        });
    }

    function init() {
        var $win = $(window);

        // Window width without scrollbar
        var windowWidth = $win.width();

        // Media Query fix (outerWidth -- scrollbar)
        // Media queries width include the scrollbar
        var mqWidth = $win.outerWidth(true, true);

        var isMobileDevice = (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini|Mobi/i) || (mqWidth < 767)) ? true : false;

        var $menu = $(".menu");
        if (windowWidth < 768) {
            mobileMenu($menu);
        } else {
            desktopMenu($menu, isMobileDevice);
        }
    }

    return {
        init: init
    }
})();
