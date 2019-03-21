$(document).ready(function() {
  'use strict';

  $('#country').click(function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $('#country-list').offset().top
    }, 1000);
  });

});
