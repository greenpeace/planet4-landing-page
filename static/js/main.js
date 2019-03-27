$(document).ready(function() {
  'use strict';

  $('#country').click(function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $('#country-list').offset().top
    }, 1000);
  });

  $('.dropdown-toggle').click(function(event) {
    event.stopPropagation();
    $('.dropdown').toggleClass('open');
  });

  $('.dropdown-toggle').mouseover(function() {
    $('.dropdown').addClass('open');
  });

  $('.dropdown-toggle').mouseout(function() {
    $('.dropdown').removeClass('open');
  });

  $('body').click(function() {
    $('.dropdown').removeClass('open');
  });

});
