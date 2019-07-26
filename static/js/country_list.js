/* global data, byID */
'use strict';

// Render countries list
let international_html = ``;
let sublist_html = ``;
Object.entries(data).forEach(letter => {
  if ( '0' === letter[0] ) {
    international_html += `<a class="international" href="${letter[1][0].url}">${letter[1][0].name}</a>`;
  } else {
    sublist_html += `<li><h3 class="country-group-letter">${letter[0]}</h3>
      <ul class="countries_sublist">`;
    letter[1].forEach(country => {
      const lang = country.lang;
      lang.forEach(item => {
        sublist_html += `<li>
          <a href="${item.url}">${country.name} | ${item.name}</a>
          </li>`;
      });
    });
    sublist_html += `</ul></li>`;
  }
});
let countries_html = `<h2>All countries and regions</h2>${international_html}<ul class="countries_list">${sublist_html}</ul>`;
byID('country-list').innerHTML = countries_html;
