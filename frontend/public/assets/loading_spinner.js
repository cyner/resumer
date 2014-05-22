$(function() {
  var left = $(window).width() / 2;
  var top = $(window).height() / 2;

  // Spinner
  var opts = {
    lines: 13, // The number of lines to draw
    length: 20, // The length of each line
    width: 10, // The line thickness
    radius: 30, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 20000, // The z-index (defaults to 2000000000)
    position: 'relative',
    top: 0, // Top position relative to parent in px
    left: 0 // Left position relative to parent in px
  };
  var target = document.getElementById('loading_spinner');
  var spinner = new Spinner(opts).spin(target);
});

$(document).ajaxSend(function(evt, request, settings) {
  if(settings.type != "GET") $("#loading_modal").fadeIn(400);
});

$(document).ajaxStop(function() {
  $("#loading_modal").fadeOut(400);
});
