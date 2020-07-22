/* global urls, byID */
'use strict';

function redirectFromCookie(cookie, location) {
  if (!Array.isArray(urls) || !urls.length || cookie.trim() == '') {
    return;
  }

  // Avoid redirection loop
  let currentUrlIndex = urls.indexOf(location);
  if (currentUrlIndex > -1) {
    urls.splice(currentUrlIndex, 1);
  }

  const nroEntry = cookie
    .split('; ')
    .find(row => row.startsWith('gp_nro'));
  if (nroEntry == undefined || nroEntry.indexOf('=') == -1) {
    return;
  }

  // Only redirect on allow-list
  const urlList = urls.map((entry) => entry[0]);
  const nroUrl = nroEntry.split('=')[1].trim().replace(/\/$/, '');
  if (!urlList.includes(nroUrl)) {
    return;
  }
  const nroName = urls[urlList.indexOf(nroUrl)][1];

  // Redirect with spinner and link
  byID('cta').innerHTML = `<div id="dropdown" class="dropdown">
    <a id="selection" class="btn btn-primary solo" href="${nroUrl}">Redirecting to <span class="nro-name">Greenpeace ${nroName}</span></a>
    </div>`;
  try {
    window.location.replace(nroUrl);
  } catch (e) {
    byID('loading').style.display = 'none';
  }
}

redirectFromCookie(document.cookie, document.location);