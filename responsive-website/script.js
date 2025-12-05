  
    // Preloader
    window.addEventListener('load', function() {
      const preloader = document.getElementById('preloader');
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 2000);
    });

    // Particle Background
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#8a2be2" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00d4ff",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true
        }
      },
      retina_detect: true
    });

    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 100) {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
      } else {
        header.style.padding = '1.5rem 0';
        header.style.boxShadow = 'none';
      }
    });

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
      observer.observe(el);
    });

    // Counter animation
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const updateCount = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      });
    };

    // Start counter when in view
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(item => {
      counterObserver.observe(item);
    });

    // Form submissions
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you! Your message has been sent successfully.');
      this.reset();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Add hover effect to cards
    document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
      });
      
      card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
          this.style.transform = 'translateY(0)';
        }
      });
    });

    // Theme toggle simulation (can be extended)
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.key === 't') {
        document.body.style.filter = document.body.style.filter === 'invert(1)' ? '' : 'invert(1)';
      }
    });
  