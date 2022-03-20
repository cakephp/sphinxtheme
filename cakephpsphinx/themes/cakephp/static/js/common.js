App.Common = (function () {
    "use strict";

    function init() {
        $('#back-to-contents').on('click', function () {
            $('html,body').animate({scrollTop: 0}, 200);

            return false;
        });

        $("[data-toggle='tooltip']").tooltip();
    }

    return {
        init: init
    }
})();
