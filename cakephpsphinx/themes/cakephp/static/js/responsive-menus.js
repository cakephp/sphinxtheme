App.ResponsiveMenus = (function () {
    "use strict";

    function init() {
        $('#modal').on(
              'show.bs.modal',
              /**
               * @param {JQuery.TriggeredEvent|{relatedTarget: HTMLElement}} event
               */
              function (event) {
                  var contents, title;
                  switch ($(event.relatedTarget).attr('id')) {
                      case 'btn-toc':
                          title = 'Table of Contents';
                          contents = $('#sidebar-navigation').html();
                          break;

                      case 'btn-nav':
                          title = 'Navigation';
                          contents = $('#nav-cook').html();
                          break;

                      case 'btn-menu':
                          title = 'Menu';
                          contents = $('.navbar-right').html();
                          break;
                  }

                  var $modal = $(this);
                  $modal.find('.modal-body').html(contents);
                  $modal.find('.modal-title-cookbook').text(title);

                  // Bind click events for sub menus.
                  $modal.find('li > a').on('click', function () {
                      var $subMenu = $(this).parent().find('.submenu, .megamenu');
                      if ($subMenu.length === 0) {
                          return;
                      }

                      $subMenu.toggle();

                      return false;
                  });
              }
        );
    }

    return {
        init: init
    };
})();
