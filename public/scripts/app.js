/* jshint undef: true, unused: true */
/* global $, location */



$(function () {

  // Automatically open external links in new tabs
  $("a[href^=http]").each(function () {
    if (this.href.indexOf(location.hostname) == -1) {
      $(this).attr("target", "_blank");
    }
  });

});
