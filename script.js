/* CONFIGURACIÓN COMERCIAL: reemplaza estos valores con los datos oficiales antes de publicar. */
const HESED_CONFIG = {
  whatsapp: {
    shalom: "5210000000000", // Formato internacional sin + ni espacios
    befit: "5210000000000"
  },
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
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.business-card,.menu-item,.location-card,.section-heading,.coach-placeholder,.plans-panel').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});