$(document).ready(function() {
  'use strict';

  // Render countries list
  $.ajax('static/countries.json').then(
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
});
