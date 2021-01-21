const strings = {
  el: {
    title: 'Ψάξαμε παντού...',
    text: 'αλλά φαίνεται πως αυτή η σελίδα δεν υπάρχει',
    cta: 'Επιστροφή στην Αρχική'
  },
  es: {
    title: 'Buscamos en todas partes...',
    text: 'pero parece que esa página no existe',
    cta: 'Ir a la Página de Inicio'
  },
  fr: {
    title: 'Nous avons cherché partout...',
    text: 'mais il semble que cette page n\'existe pas',
    cta: 'Aller à l\'accueil'
  },
  hu: {
    title: 'Mindenhol kerestük...',
    text: 'de ezt az oldalt sajnos nem találtuk.',
    cta: 'Tovább a főoldalra'
  },
  in: {
    title: 'हमने हर जगह देखा...',
    text: 'लेकिन ऐसा लगता है कि यह पृष्ठ उपलब्ध नहीं है |',
    cta: 'मुखपृष्ठ पर जाएं'
  },
  it: {
    title: 'Abbiamo cercato dappertutto...',
    text: 'ma sembra che questa pagina non sia raggiungibile',
    cta: 'Vai alla home'
  },
  nl: {
    title: 'We hebben overal gezocht...',
    text: 'maar konden deze pagina nergens vinden',
    cta: 'Naar de startpagina'
  },
  pt: {
    title: 'Procuramos por todos os lados...',
    text: 'mas parece que essa página não existe. ',
    cta: 'Ir para a página principal'
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
