/* Datos comerciales: sustituir los números de prueba por los oficiales. */
const HESED_CONFIG = {
  whatsapp: { shalom: "5210000000000", befit: "5210000000000" },
  messages: {
    shalom: "Hola, quiero información sobre Shalom y hacer una reservación.",
    befit: "Hola, quiero información sobre BEFIT: sedes, precios y horarios."
  }
};
document.querySelectorAll('[data-wa]').forEach(link => {
  const business=link.dataset.wa, number=HESED_CONFIG.whatsapp[business];
  link.href='https://wa.me/'+number+'?text='+encodeURIComponent(HESED_CONFIG.messages[business]||'Hola, quisiera más información.');
  link.target='_blank'; link.rel='noopener noreferrer';
});
const year=document.getElementById('year'); if(year) year.textContent=new Date().getFullYear();
const header=document.querySelector('.site-header'), wordmark=header?.querySelector('.wordmark');
const nav=header?.querySelector('.main-nav'), headerLink=header?.querySelector('.header-link'), toggle=header?.querySelector('.menu-toggle');
const configs={
 hesed:{brand:'<span class="mark">H</span><span>GRUPO <b>HESED</b></span>',links:[['Inicio','#inicio'],['Negocios','#negocios'],['Contacto','#contacto']],action:'DESCUBRIR ↗',href:'#negocios'},
 shalom:{brand:'<span class="mark">S</span><span class="shalom-word">SHALOM <b>· SABOR Y PAZ</b></span>',links:[['Inicio','#shalom'],['Menú','#menu-shalom'],['Galería','#shalom-galeria'],['Reservar','#reservar']],action:'← GRUPO HESED',href:'#inicio'},
 befit:{brand:'<span class="mark">B</span><span>BE<b>FIT</b><small style="display:block;font-size:7px;letter-spacing:2px">TRAINING CLUB</small></span>',links:[['Inicio','#befit'],['Sedes','#sedes-befit'],['Planes','#precios-befit'],['Horarios','#befit']],action:'← GRUPO HESED',href:'#inicio'}
};
let mode='hesed', transitionTimer;
const overlay=document.createElement('div');
overlay.id='brand-transition';
overlay.innerHTML='<div class="transition-inner"><div class="transition-kicker">GRUPO HESED PRESENTA</div><div class="transition-name"></div><div class="transition-sub"></div></div>';
overlay.setAttribute('aria-hidden','true'); document.body.appendChild(overlay);
function applyMode(next){
 mode=configs[next]?next:'hesed';
 document.body.classList.remove('mode-hesed','mode-shalom','mode-befit');
 document.body.classList.add('mode-'+mode);
 const cfg=configs[mode];
 if(wordmark) wordmark.innerHTML=cfg.brand;
 if(nav){nav.innerHTML=cfg.links.map(([label,href])=>'<a href="'+href+'">'+label+'</a>').join('');nav.classList.remove('open');}
 if(headerLink){headerLink.textContent=cfg.action;headerLink.href=cfg.href;}
 if(toggle){toggle.setAttribute('aria-label','Abrir menú');toggle.textContent='☰';}
 document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
}
function changeMode(next,animate=true){
 if(!configs[next]) return;
 clearTimeout(transitionTimer);
 if(!animate||next===mode){applyMode(next);window.scrollTo({top:0,behavior:'instant'});return;}
 const labels={hesed:['GRUPO','HESED · HOSPITALIDAD Y BIENESTAR'],shalom:['shalom.','SABOR Y PAZ · RESTAURANTE'],befit:['BEFIT','TRAINING CLUB · FUERZA Y MOVIMIENTO']};
 overlay.dataset.brand=next;
 overlay.querySelector('.transition-name').textContent=labels[next][0];
 overlay.querySelector('.transition-sub').textContent=labels[next][1];
 overlay.classList.add('is-active');
 transitionTimer=setTimeout(()=>{
   applyMode(next);
   history.pushState({mode:next},'',next==='hesed'?'#inicio':'#'+next);
   window.scrollTo({top:0,behavior:'instant'});
   requestAnimationFrame(()=>setTimeout(()=>overlay.classList.remove('is-active'),100));
 },360);
}
document.querySelectorAll('.shalom-card').forEach(card=>card.addEventListener('click',e=>{e.preventDefault();changeMode('shalom');}));
document.querySelectorAll('.befit-card').forEach(card=>card.addEventListener('click',e=>{e.preventDefault();changeMode('befit');}));
document.addEventListener('click',e=>{
 const link=e.target.closest('a'); if(!link)return;
 if(link===wordmark||link.getAttribute('href')==='#inicio'){
   if(mode!=='hesed'){e.preventDefault();changeMode('hesed');return;}
 }
 if(link.getAttribute('href')==='#shalom'&&mode==='hesed'){e.preventDefault();changeMode('shalom');return;}
 if(link.getAttribute('href')==='#befit'&&mode==='hesed'){e.preventDefault();changeMode('befit');return;}
 if(nav?.contains(link)) nav.classList.remove('open');
});
window.addEventListener('popstate',e=>{
 const next=e.state?.mode||(location.hash==='#shalom'?'shalom':location.hash==='#befit'?'befit':'hesed');
 applyMode(next);window.scrollTo({top:0,behavior:'instant'});
});
if(toggle&&nav)toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.textContent=nav.classList.contains('open')?'×':'☰';toggle.setAttribute('aria-label',nav.classList.contains('open')?'Cerrar menú':'Abrir menú');});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.business-card,.menu-item,.location-card,.section-heading,.coach-placeholder,.plans-panel').forEach(el=>{el.classList.add('reveal');revealObserver.observe(el);});
const initial=location.hash==='#shalom'?'shalom':location.hash==='#befit'?'befit':'hesed';applyMode(initial);
