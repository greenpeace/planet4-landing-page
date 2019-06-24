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
  let dropdown = false;
  $(document).on('click', '.dropdown-toggle', function() {
    if (dropdown) {
      $('.dropdown').removeClass('open');
      dropdown = false;
    } else {
      $('.dropdown').addClass('open');
      dropdown = true;
    }
    return false;
  });
  $('body').click(function() {
    $('.dropdown').removeClass('open');
  });

});
