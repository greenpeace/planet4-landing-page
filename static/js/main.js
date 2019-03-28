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

  // Render countries list
  $.ajax('static/countries.json')
    .then(
      function success(response) {
        let international_html = ``;
        let sublist_html = ``;
        $.each(response, function (letter, countries) {
          if ( '0' === letter ) {
            international_html += `<a class="international" href="${countries[0].url}">${countries[0].name}</a>`;
          } else {
            sublist_html += `<li><h3 class="country-group-letter">${letter}</h3>
              <ul class="countries_sublist">`;
            $.each(countries, function (index, country) {
              $.each(country.lang, function(key, lang) {
                sublist_html += `<li>
                  <a href="${lang.url}">${country.name} | ${lang.name}</a>
                  </li>`;
              });
            });
            sublist_html += `</ul></li>`;
          }
        });
        let countries_html = `<h2>All countries</h2>${international_html}<ul class="countries_list">${sublist_html}</ul>`;
        $('#country-list').html(countries_html);
      }
    );

  // IP Geolocation
  function ipLookUp () {
    $.ajax('https://ipinfo.io/json')
      .then(
        function success(response) {
          const countryCode = response.country;
          $.ajax('static/countries.json')
            .then(
              function success(response) {
                $.each(response, function (letter, countries) {
                  $.each(countries, function (index, country) {
                    if (countryCode == country.code) {
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
              }
            );
        }
      );
  }
  ipLookUp();
});
