/* global api */

$(document).ready(function() {
  'use strict';

  // IP Geolocation
  const countryCode = $('body').data('code');

  $.ajax(api).then(
    function success(response) {
      $.each(response, function (letter, countries) {
        $.each(countries, function (index, country) {
          if (country.codes && country.codes.includes(countryCode)) {
            $('#country_name').html(country.name);
            if (country.lang.length == 1) {
              $('#selection').attr('href', country.lang[0].url);
            } else {
              $('#selection .arrow').css('display', 'inline-block');
              $('#selection').addClass('dropdown-toggle');
              let items = ``;
              $.each(country.lang, function(key, lang) {
                items += `<a class="btn btn-secondary dropdown-item" href="${lang.url}">${lang.name}</a>`;
                $('.dropdown-group').html(items);
              });
            }
          }
        });
      });
      $('#loading').hide();
      $('.cta').addClass('open');
    },
    function fail() {
      $('#loading').hide();
      $('.cta').addClass('open');
    }
  );
});
