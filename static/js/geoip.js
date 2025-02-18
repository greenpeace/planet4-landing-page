/* global data, byID */
'use strict';

// IP Geolocation
const countryCode = document.querySelector('body').dataset.code;

Object.entries(data).forEach(letter => {
  letter[1].forEach(country => {
    if (country.codes && country.codes.includes(countryCode)) {
      byID('country-name').innerHTML = country.name;
      byID('selection').setAttribute('href', country.lang[0].url);
    }
  });
});

byID('loading').style.display = 'none';
