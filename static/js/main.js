$(document).ready(function() {
  'use strict';

  // Country selection CTA
  $('#country').click(function() {
    $('html, body').animate({
      scrollTop: $('#country-list').offset().top
    }, 1000);
    return false;
  });

  // Language selection button dropdown
  $('.dropdown-toggle').click(function() {
    if($('.dropdown').hasClass('open')) {
      $('.dropdown').removeClass('open');
    } else {
      $('.dropdown').addClass('open');
    }
    return false;
  });
  $('body').click(function() {
    $('.dropdown').removeClass('open');
  });

});
