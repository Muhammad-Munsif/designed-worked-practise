// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }
  });

  // Set current year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function setTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    themeToggle.innerHTML =
      theme === "dark"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  // Initialize theme
  const savedTheme =
    localStorage.getItem("theme") || (prefersDark.matches ? "dark" : "light");
  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu
        const navbar = document.querySelector(".navbar-collapse");
        if (navbar.classList.contains("show")) {
          new bootstrap.Collapse(navbar).hide();
        }
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => {
      observer.observe(el);
    });

  // Counter animation
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target.querySelector(".counter-number");
          const target = parseInt(counter.getAttribute("data-target"));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              setTimeout(updateCounter, 16);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".counter-item").forEach((el) => {
    counterObserver.observe(el);
  });

  // Back to top button
  const backTop = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Form submissions
  const contactForm = document.getElementById("contactForm");
  const newsletterForm = document.getElementById("newsletterForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const msg = document.getElementById("contactMsg");
      msg.innerHTML =
        '<div class="alert alert-success">Thank you! Your message has been sent successfully.</div>';
      contactForm.reset();
      setTimeout(() => {
        msg.innerHTML = "";
      }, 5000);
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const msg = document.getElementById("newsletterMsg");
      msg.innerHTML =
        '<div class="text-success">Thank you for subscribing!</div>';
      newsletterForm.reset();
      setTimeout(() => {
        msg.innerHTML = "";
      }, 5000);
    });
  }

  // Add focus-visible class for keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("user-is-tabbing");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("user-is-tabbing");
  });
});
