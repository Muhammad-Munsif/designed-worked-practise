// Preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 2000);
});

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
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
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
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your message has been sent successfully.");
  this.reset();
});

document
  .getElementById("newsletterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter!");
    this.reset();
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

// Pricing card buttons
document.querySelectorAll(".pricing-card .btn-primary").forEach((button) => {
  button.addEventListener("click", function () {
    const planTitle =
      this.closest(".pricing-card").querySelector(".pricing-title").textContent;
    alert(
      `Thank you for choosing the ${planTitle} plan! Our team will contact you shortly.`
    );
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

// Initialize tooltips
document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

// Fix for mobile viewport height
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setVH();
window.addEventListener("resize", setVH);
