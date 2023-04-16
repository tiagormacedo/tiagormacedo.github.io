// Wait for the document to be ready before executing the script.
$(function() {
  // Set up responsive breakpoints.
  skel.breakpoints({
    wide: "(min-width: 961px) and (max-width: 1880px)",
    normal: "(min-width: 961px) and (max-width: 1620px)",
    narrow: "(min-width: 961px) and (max-width: 1320px)",
    narrower: "(max-width: 960px)",
    mobile: "(max-width: 736px)"
  });

  // Disable animations/transitions until the page has loaded.
  $("body").addClass("is-loading");
  $(window).on("load", function() {
    $("body").removeClass("is-loading");
  });

  // Apply CSS polyfills (IE<9).
  if (skel.vars.IEVersion < 9) {
    $("*:last-child").addClass("last-child");
  }

  // Apply the placeholder polyfill.
  $("form").placeholder();

  // Prioritize "important" elements on mobile.
  skel.on("+mobile -mobile", function() {
    $.prioritize(".important\\28 mobile\\29", skel.breakpoint("mobile").active);
  });

  // Initialize scrolly links.
  $(".scrolly").scrolly();

  // Set up the navigation bar to scroll to sections within the page.
  var $nav_a = $("#nav a");

  $nav_a.scrolly().on("click", function(e) {
    var $this = $(this),
      href = $this.attr("href");

    if (href[0] !== "#") {
      return;
    }

    e.preventDefault();

    // Clear active and lock scrollzer until scrolling has stopped.
    $nav_a.removeClass("active").addClass("scrollzer-locked");

    // Set this link to active.
    $this.addClass("active");
  });

  // Initialize scrollzer.
  var ids = [];

  $nav_a.each(function() {
    var href = $(this).attr("href");

    if (href[0] !== "#") {
      return;
    }

    ids.push(href.substring(1));
  });

  $.scrollzer(ids, { pad: 200, lastHack: true });

  // Set up the header toggle and panel for mobile devices.
  $("<div id='headerToggle'><a href='#header' class='toggle'></a></div>").appendTo("body");

  $("#header").panel({
    delay: 500,
    hideOnClick: true,
    hideOnSwipe: true,
    resetScroll: true,
    resetForms: true,
    side: "left",
    target: $("body"),
    visibleClass: "header-visible"
  });

  // Disable transitions on WP<10 (poor/buggy performance).
  if (skel.vars.os === "wp" && skel.vars.osVersion < 10) {
    $("#headerToggle, #header, #main").css("transition", "none");
  }
});


window.onload = function() {
    var header = document.querySelector('.header');
    header.style.left = "0";
}