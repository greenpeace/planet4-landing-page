/* exported dropdown_toggle */
'use strict';

const dropdown_toggle = () => {
  const selection = document.getElementById('dropdown');
  let classes = selection.className.split(' ');
  let existingIndex = classes.indexOf('open');
  if (existingIndex >= 0) {
    classes.splice(existingIndex, 1);
  } else {
    classes.push('open');
  }
  selection.className = classes.join(' ');
  return false;
};
