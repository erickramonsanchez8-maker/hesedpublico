(() => {
  const views = {
    hesed: document.getElementById('hesed-view'),
    shalom: document.getElementById('shalom-view'),
    befit: document.getElementById('befit-view')
  };
  let current = 'hesed';
  const titles = { hesed: 'GRUPO HESED', shalom: 'shalom.', befit: 'BEFIT' };
  const config = {
    shalom: { number: '5210000000000', message: 'Hola, quiero información sobre Shalom y hacer una reservación.' },
    befit: { number: '5210000000000', message: 'Hola, quiero información sobre BEFIT: sedes, precios y horarios.' }
  };

  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('[data-wa]').forEach(link => {
    const item = config[link.dataset.wa];
    if (!item) return;
    link.href = 'https://wa.me/' + item.number + '?text=' + encodeURIComponent(item.message);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  function setView(name, options = {}) {
    if (!Object.prototype.hasOwnProperty.call(views, name) || !views[name]) name = 'hesed';
    Object.entries(views).forEach(([key, element]) => {
      element.hidden = key !== name;
      element.setAttribute('aria-hidden', key !== name ? 'true' : 'false');
    });
    current = name;
    document.body.classList.remove('view-hesed', 'view-shalom', 'view-befit');
    document.body.classList.add('view-' + name);
    window.scrollTo(0, 0);
    if (options.push !== false) {
      const hash = name === 'hesed' ? '#inicio' : '#' + name;
      if (location.hash !== hash) history.pushState({ view: name }, '', hash);
    }
  }

  function navigate(name) {
    if (name === current) return;
    const screen = document.getElementById('transition-screen');
    if (!screen) { setView(name); return; }
    const label = screen.querySelector('.transition-label');
    const title = screen.querySelector('strong');
    if (label) label.textContent = name === 'hesed' ? 'UN GRUPO · DOS EXPERIENCIAS' : 'UNA EXPERIENCIA DE GRUPO HESED';
    if (title) title.textContent = titles[name] || titles.hesed;
    screen.style.background = name === 'shalom' ? '#29251f' : name === 'befit' ? '#0d1b2a' : '#20251f';
    screen.classList.add('active');
    window.setTimeout(() => {
      setView(name);
      screen.classList.remove('active');
    }, 220);
  }

  document.addEventListener('click', event => {
    const enter = event.target.closest('[data-enter]');
    if (enter) {
      event.preventDefault();
      navigate(enter.dataset.enter);
      return;
    }
    const home = event.target.closest('[data-home="hesed"]');
    if (home) {
      event.preventDefault();
      navigate('hesed');
      return;
    }
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href === '#inicio' && current !== 'hesed') {
      event.preventDefault();
      navigate('hesed');
      return;
    }
    const activeView = views[current];
    const target = activeView && activeView.querySelector(href);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  window.addEventListener('popstate', () => {
    const hash = location.hash;
    setView(hash === '#shalom' ? 'shalom' : hash === '#befit' ? 'befit' : 'hesed', { push: false });
  });

  const initial = location.hash === '#shalom' ? 'shalom' : location.hash === '#befit' ? 'befit' : 'hesed';
  setView(initial, { push: false });
})();