const strings = {
  el: {
    subtitle: 'Ψάξαμε παντού...',
    text: 'αλλά φαίνεται πως αυτή η σελίδα δεν υπάρχει',
  },
};

const l10n = document.querySelectorAll('[data-l10n-key]');
const lang = navigator.language.split('-')[0];

l10n.forEach(function(item){
  const locale = strings[lang];
  if (locale) {
    item.innerHTML = locale[item.dataset.l10nKey];
  }
});
