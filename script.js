/* CONFIGURACIÓN COMERCIAL: reemplaza estos valores con los datos oficiales antes de publicar. */
const HESED_CONFIG = {
  whatsapp: { shalom: "5210000000000", befit: "5210000000000" },
  messages: {
    shalom: "Hola, quiero información sobre Shalom y hacer una reservación.",
    befit: "Hola, quiero información sobre BEFIT: sedes, precios y horarios."
  }
};

document.querySelectorAll('[data-wa]').forEach(link => {
  const business = link.dataset.wa;
  const number = HESED_CONFIG.whatsapp[business];
  const message = encodeURIComponent(HESED_CONFIG.messages[business] || "Hola, quisiera más información.");
  link.href = 'https://wa.me/' + number + '?text=' + message;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const wordmark = document.querySelector('.site-header .wordmark');
const nav = document.querySelector('.main-nav');
const headerLink = document.querySelector('.header-link');
const toggle = document.querySelector('.menu-toggle');

const navigation = {
  hesed: {
    brand: '<span class="mark">H</span><span>GRUPO <b>HESED</b></span>',
    links: [['Inicio','#inicio'],['Negocios','#negocios'],['Contacto','#contacto']],
    action: 'DESCUBRIR', href: '#negocios'
  },
  shalom: {
    brand: '<span class="mark">S</span><span class="shalom-word">SHALOM <b>· SABOR Y PAZ</b></span>',
    links: [['Experiencia','#shalom'],['Menú','#menu-shalom'],['Galería','#shalom-galeria'],['Reservar','#reservar']],
    action: '← GRUPO HESED', href: '#inicio'
  },
  befit: {
    brand: '<span class="mark">B</span><span>BE<b>FIT</b> <small style="display:block;font-size:7px;letter-spacing:2px">TRAINING CLUB</small></span>',
    links: [['Experiencia','#befit'],['Sedes','#sedes-befit'],['Planes','#precios-befit'],['Horarios','#befit']],
    action: '← GRUPO HESED', href: '#inicio'
  }
};

let currentMode = 'hesed';
function setMode(mode) {
  if (!navigation[mode]) mode = 'hesed';
  currentMode = mode;
  document.body.classList.remove('mode-hesed','mode-shalom','mode-befit');
  document.body.classList.add('mode-' + mode);
  const config = navigation[mode];
  if (wordmark) wordmark.innerHTML = config.brand;
  if (nav) {
    nav.innerHTML = config.links.map(([label,href]) => '<a href="' + href + '">' + label + '</a>').join('');
    nav.classList.remove('open');
  }
  if (headerLink) {
    headerLink.textContent = config.action + ' ↗';
    headerLink.href = config.href;
  }
  if (toggle) toggle.setAttribute('aria-label', nav && nav.classList.contains('open') ? 'Cerrar menú' : 'Abrir menú');
  document.querySelectorAll('.business-card').forEach(card => {
    card.setAttribute('aria-label', card.classList.contains('shalom-card') ? 'Entrar a la experiencia Shalom' : 'Entrar a la experiencia BEFIT');
  });
}
document.querySelectorAll('.shalom-card').forEach(card => card.addEventListener('click', event => {
  event.preventDefault(); setMode('shalom'); history.pushState({mode:'shalom'}, '', '#shalom'); window.scrollTo({top:0,behavior:'smooth'});
}));
document.querySelectorAll('.befit-card').forEach(card => card.addEventListener('click', event => {
  event.preventDefault(); setMode('befit'); history.pushState({mode:'befit'}, '', '#befit'); window.scrollTo({top:0,behavior:'smooth'});
}));
document.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  if (link.getAttribute('href') === '#inicio' && currentMode !== 'hesed') {
    event.preventDefault(); setMode('hesed'); history.pushState({mode:'hesed'}, '', '#inicio'); window.scrollTo({top:0,behavior:'smooth'}); return;
  }
  if (link.getAttribute('href') === '#shalom' && currentMode === 'hesed') {
    event.preventDefault(); setMode('shalom'); history.pushState({mode:'shalom'}, '', '#shalom'); window.scrollTo({top:0,behavior:'smooth'}); return;
  }
  if (link.getAttribute('href') === '#befit' && currentMode === 'hesed') {
    event.preventDefault(); setMode('befit'); history.pushState({mode:'befit'}, '', '#befit'); window.scrollTo({top:0,behavior:'smooth'}); return;
  }
  if (nav && nav.contains(link)) nav.classList.remove('open');
});
window.addEventListener('popstate', event => {
  const mode = event.state && event.state.mode ? event.state.mode : (location.hash === '#shalom' ? 'shalom' : location.hash === '#befit' ? 'befit' : 'hesed');
  setMode(mode);
});
if (toggle && nav) toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  toggle.setAttribute('aria-label', nav.classList.contains('open') ? 'Cerrar menú' : 'Abrir menú');
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  });
}, {threshold:0.12});
document.querySelectorAll('.business-card,.menu-item,.location-card,.section-heading,.coach-placeholder,.plans-panel').forEach(el => {
  el.classList.add('reveal'); revealObserver.observe(el);
});
setMode(location.hash === '#shalom' ? 'shalom' : location.hash === '#befit' ? 'befit' : 'hesed');
