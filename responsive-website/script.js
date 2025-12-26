// Enhanced Website Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 1500);

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme
  const savedTheme = localStorage.getItem("nexus-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon.className = "fas fa-sun";
  }

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      themeIcon.className = "fas fa-sun";
      localStorage.setItem("nexus-theme", "light");
      showToast("Light mode activated");
    } else {
      themeIcon.className = "fas fa-moon";
      localStorage.setItem("nexus-theme", "dark");
      showToast("Dark mode activated");
    }
  });

  // Text-to-Speech Functionality
  const textToSpeechBtn = document.getElementById("textToSpeechBtn");
  let isSpeaking = false;
  let speech = null;

  if ("speechSynthesis" in window) {
    textToSpeechBtn.addEventListener("click", function () {
      const heroSection = document.querySelector(".hero-content");
      const text = heroSection.innerText;

      if (!isSpeaking) {
        speech = new SpeechSynthesisUtterance(text);
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;
        speech.lang = "en-US";

        speech.onstart = function () {
          isSpeaking = true;
          textToSpeechBtn.innerHTML =
            '<i class="fas fa-pause"></i> Pause Reading';
          textToSpeechBtn.classList.add("btn-primary");
          textToSpeechBtn.classList.remove("btn-secondary");
        };

        speech.onend = function () {
          isSpeaking = false;
          textToSpeechBtn.innerHTML =
            '<i class="fas fa-volume-up"></i> Listen to this section';
          textToSpeechBtn.classList.remove("btn-primary");
          textToSpeechBtn.classList.add("btn-secondary");
        };

        window.speechSynthesis.speak(speech);
      } else {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          isSpeaking = false;
          textToSpeechBtn.innerHTML =
            '<i class="fas fa-volume-up"></i> Listen to this section';
          textToSpeechBtn.classList.remove("btn-primary");
          textToSpeechBtn.classList.add("btn-secondary");
        }
      }
    });
  } else {
    textToSpeechBtn.style.display = "none";
  }

  // Language Selector
  const languageOptions = document.querySelectorAll(".language-option");
  languageOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedLang = this.getAttribute("data-lang");
      document.querySelector(".language-btn span").textContent =
        this.textContent;
      showToast(`Language changed to ${this.textContent}`);

      // In a real implementation, you would load translations here
      // This is just a demo
      localStorage.setItem("nexus-language", selectedLang);
    });
  });

  // Notification Toast System
  function showToast(message) {
    const toast = document.getElementById("notificationToast");
    const toastMessage = document.getElementById("toastMessage");

    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Progress Indicator
  const progressIndicator = document.querySelector(".progress-indicator");
  window.addEventListener("scroll", function () {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressIndicator.style.width = scrolled + "%";
  });

  // Set current year
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Back to Top Button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.padding = "1rem 0";
      header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
    } else {
      header.style.padding = "1.5rem 0";
      header.style.boxShadow = "none";
    }
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".fade-in, .slide-left, .slide-right")
    .forEach((el) => {
      observer.observe(el);
    });

  // Counter animation
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200;

  const updateCount = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-count");
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
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCount();
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-item").forEach((item) => {
    counterObserver.observe(item);
  });

  // Form submissions
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("Thank you! Your message has been sent successfully.");
      this.reset();
    });

  document
    .getElementById("newsletterForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("Thank you for subscribing to our newsletter!");
      this.reset();
    });

  // Pricing card selection
  document.querySelectorAll(".pricing-select").forEach((button) => {
    button.addEventListener("click", function () {
      const planTitle =
        this.closest(".pricing-card").querySelector(
          ".pricing-title"
        ).textContent;
      showToast(
        `Thank you for selecting the ${planTitle} plan! Our team will contact you shortly.`
      );

      // Add visual feedback
      this.closest(".pricing-card").style.boxShadow =
        "0 0 30px rgba(138, 43, 226, 0.3)";
      setTimeout(() => {
        this.closest(".pricing-card").style.boxShadow = "";
      }, 1000);
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        const headerHeight = document.querySelector("header").offsetHeight;
        window.scrollTo({
          top: target.offsetTop - headerHeight,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.getElementById("navbarNav");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      }
    });
  });

  // Add hover effect to cards
  document
    .querySelectorAll(".feature-card, .pricing-card, .service-card")
    .forEach((card) => {
      card.addEventListener("mouseenter", function () {
        if (!this.classList.contains("featured")) {
          this.style.transform = "translateY(-15px)";
        }
      });

      card.addEventListener("mouseleave", function () {
        if (!this.classList.contains("featured")) {
          this.style.transform = "translateY(0)";
        }
      });
    });

  // Mobile menu improvements
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      // Add active state
      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Cookie Settings
  document
    .getElementById("cookieSettings")
    .addEventListener("click", function (e) {
      e.preventDefault();
      showToast(
        "Cookie preferences opened. In a real implementation, this would show a modal with cookie options."
      );
    });

  // Privacy Policy
  document
    .getElementById("privacyPolicy")
    .addEventListener("click", function (e) {
      e.preventDefault();
      showToast("Privacy policy page would open here. This is a demo.");
    });

  // Fix for mobile viewport height
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  setVH();
  window.addEventListener("resize", setVH);

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Alt + T to toggle theme
    if (e.altKey && e.key === "t") {
      themeToggle.click();
    }
    // Alt + H to go home
    if (e.altKey && e.key === "h") {
      document.querySelector('a[href="#home"]').click();
    }
    // Escape to stop speech
    if (e.key === "Escape" && isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      if (textToSpeechBtn) {
        textToSpeechBtn.innerHTML =
          '<i class="fas fa-volume-up"></i> Listen to this section';
        textToSpeechBtn.classList.remove("btn-primary");
        textToSpeechBtn.classList.add("btn-secondary");
      }
    }
  });

  // Add tooltip for keyboard shortcuts
  showToast("Tip: Use Alt+T to toggle theme, Alt+H to go home");

  // Particle Background
  if (typeof particlesJS !== "undefined") {
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
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
      },
      retina_detect: true,
    });
  }

  // Initialize tooltips if needed
  if (typeof bootstrap !== "undefined") {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Add a read time calculator for articles (demo)
  function calculateReadTime() {
    const article = document.querySelector(".hero-content");
    if (article) {
      const text = article.innerText;
      const wordCount = text.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200); // 200 words per minute

      // Create and display read time badge
      const readTimeBadge = document.createElement("div");
      readTimeBadge.className = "read-time-badge";
      readTimeBadge.innerHTML = `<i class="fas fa-clock"></i> ${readTime} min read`;
      readTimeBadge.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: var(--gradient);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: none;
          `;

      article.style.position = "relative";
      article.appendChild(readTimeBadge);

      // Show on hover
      article.addEventListener("mouseenter", () => {
        readTimeBadge.style.display = "block";
      });

      article.addEventListener("mouseleave", () => {
        readTimeBadge.style.display = "none";
      });
    }
  }

  // Calculate read time for hero section
  calculateReadTime();
});
