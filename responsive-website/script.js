
    // DOM ready helpers
    const $ = sel => document.querySelector(sel);
    const $$ = sel => Array.from(document.querySelectorAll(sel));

    /* Preloader */
    window.addEventListener('load', () => {
      const pre = $('#preloader');
      if (pre) {
        pre.style.transition = 'opacity .4s ease';
        pre.style.opacity = '0';
        setTimeout(()=> pre.remove(), 450);
      }
    });

    /* Set year */
    $('#year').textContent = new Date().getFullYear();

    /* Theme toggle (persist in localStorage) */
    const themeToggle = $('#themeToggle');
    function applyTheme(theme){
      if(theme === 'dark'){ document.body.classList.add('dark'); themeToggle.textContent = '☀️'; themeToggle.setAttribute('aria-pressed','true'); }
      else { document.body.classList.remove('dark'); themeToggle.textContent = '🌙'; themeToggle.setAttribute('aria-pressed','false'); }
    }
    const savedTheme = localStorage.getItem('site-theme') || 'light';
    applyTheme(savedTheme);
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
      applyTheme(localStorage.getItem('site-theme'));
    });
    themeToggle.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') themeToggle.click(); });

    /* Smooth scroll for internal links */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          // close navbar on mobile if open
          const bsCollapse = document.querySelector('.navbar-collapse');
          if(bsCollapse && bsCollapse.classList.contains('show')) {
            new bootstrap.Collapse(bsCollapse).hide();
          }
        }
      });
    });

    /* IntersectionObserver for reveal animations & counters */
    const observerOptions = {threshold: 0.12};
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // register reveals
    $$('.reveal').forEach(el => revealObserver.observe(el));
    $$('.reveal-left').forEach(el => revealObserver.observe(el));
    $$('.reveal-right').forEach(el => revealObserver.observe(el));
    $$('.zoom-in').forEach(el => revealObserver.observe(el));

    // Counters observer
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const el = entry.target;
          const target = +el.getAttribute('data-target') || 0;
          const duration = 1600; // ms
          const stepTime = Math.max(16, Math.floor(duration / target));
          let current = 0;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const value = Math.floor(progress * target);
            el.textContent = value.toLocaleString();
            if(progress < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString();
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      });
    }, {threshold: 0.35});

    $$('.counter').forEach(c => counterObserver.observe(c));

    /* Hero subtle zoom on load */
    window.addEventListener('load', () => {
      const heroH1 = document.querySelector('.hero h1');
      if(heroH1) heroH1.style.transform = 'scale(1.03)';
      setTimeout(()=> {
        if(heroH1) heroH1.style.transform = 'scale(1)';
      }, 900);
    });

    /* Back to top */
    const backTop = $('#backTop');
    window.addEventListener('scroll', () => {
      if(window.scrollY > 320) backTop.classList.add('show');
      else backTop.classList.remove('show');
    });
    backTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

    /* Contact form (demo) */
    const contactForm = $('#contactForm');
    if(contactForm) contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      $('#contactMsg').textContent = 'Sending...';
      setTimeout(()=>{
        $('#contactMsg').textContent = 'Thanks — your message has been received!';
        contactForm.reset();
      }, 900);
    });

    /* Newsletter form (demo) */
    const newsletterForm = $('#newsletterForm');
    if(newsletterForm) newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = $('#newsletterEmail');
      if(!email.value || !/^\S+@\S+\.\S+$/.test(email.value)){
        $('#newsletterMsg').textContent = 'Please enter a valid email address.';
        $('#newsletterMsg').style.color = 'crimson';
        return;
      }
      $('#newsletterMsg').textContent = 'Subscription successful — thank you!';
      $('#newsletterMsg').style.color = 'green';
      newsletterForm.reset();
      setTimeout(()=> $('#newsletterMsg').textContent = '', 4000);
    });

    /* Accessibility: focus outlines for keyboard users */
    function handleFirstTab(e){
      if(e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
    window.addEventListener('keydown', handleFirstTab);

    // Initialize Bootstrap tooltips (if any)
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (el) { return new bootstrap.Tooltip(el) });

  