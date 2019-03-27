$(document).ready(function() {
  'use strict';

  $('#country').click(function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $('#country-list').offset().top
    }, 1000);
  });

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
