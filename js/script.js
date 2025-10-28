// Rellena el año en el pie de página
document.addEventListener('DOMContentLoaded', function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if(stored === 'dark') root.setAttribute('data-theme','dark');

  if(toggle){
    toggle.addEventListener('click', ()=>{
      const isDark = root.getAttribute('data-theme') === 'dark';
      if(isDark){
        root.removeAttribute('data-theme');
        localStorage.setItem('theme','light');
      } else {
        root.setAttribute('data-theme','dark');
        localStorage.setItem('theme','dark');
      }
    });
  }

  // Mobile nav toggle
  const nav = document.getElementById('main-nav');
  const navToggle = document.getElementById('nav-toggle');
  if(nav && navToggle){
    navToggle.addEventListener('click', ()=>{
      const opened = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
      navToggle.setAttribute('aria-label', opened ? 'Cerrar menú' : 'Abrir menú');
    });

    // Close mobile menu when a nav link is clicked
    nav.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', ()=>{
        if(nav.classList.contains('open')){
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded','false');
          navToggle.setAttribute('aria-label','Abrir menú');
        }
      });
    });

    // Close on resize to large screens
    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 900 && nav.classList.contains('open')){
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
        navToggle.setAttribute('aria-label','Abrir menú');
      }
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});
