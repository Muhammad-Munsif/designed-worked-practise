<script>
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

      // Theme Toggle - Fixed positioning
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

      // Share Page Functionality
      const sharePageBtn = document.getElementById("sharePageBtn");
      sharePageBtn.addEventListener("click", function () {
        if (navigator.share) {
          navigator.share({
            title: 'NEXUS - Next-Gen Digital Experiences',
            text: 'Check out this amazing website!',
            url: window.location.href
          })
            .then(() => showToast('Page shared successfully!'))
            .catch(err => showToast('Sharing failed: ' + err));
        } else {
          // Fallback for browsers that don't support Web Share API
          navigator.clipboard.writeText(window.location.href)
            .then(() => showToast('Link copied to clipboard!'))
            .catch(err => showToast('Failed to copy link: ' + err));
        }
      });

      // Language Selector
      const languageOptions = document.querySelectorAll(".language-option");
      languageOptions.forEach((option) => {
        option.addEventListener("click", function () {
          const selectedLang = this.getAttribute("data-lang");
          const langText = this.textContent.replace('English', '').replace('Español', '').replace('Français', '').replace('Deutsch', '').trim();
          document.querySelector(".language-btn span").textContent =
            langText;
          showToast(`Language changed to ${langText}`);

          localStorage.setItem("nexus-language", selectedLang);
        });
      });

      // NEW: Accessibility Panel
      const accessibilityToggle = document.getElementById("accessibilityToggle");
      const accessibilityPanel = document.getElementById("accessibilityPanel");
      const fontSizeSlider = document.getElementById("fontSize");
      const fontSizeValue = document.getElementById("fontSizeValue");
      const contrastToggle = document.getElementById("contrast");
      const reducedMotionToggle = document.getElementById("reducedMotion");
      const playPageAudioBtn = document.getElementById("playPageAudio");
      const resetAccessibilityBtn = document.getElementById("resetAccessibility");

      // Toggle accessibility panel
      accessibilityToggle.addEventListener("click", function () {
        accessibilityPanel.classList.toggle("open");
      });

      // Font size control
      fontSizeSlider.addEventListener("input", function () {
        const fontSize = this.value;
        fontSizeValue.textContent = `${fontSize}%`;
        document.documentElement.style.fontSize = `${fontSize}%`;
        localStorage.setItem("nexus-font-size", fontSize);
      });

      // Load saved font size
      const savedFontSize = localStorage.getItem("nexus-font-size");
      if (savedFontSize) {
        fontSizeSlider.value = savedFontSize;
        fontSizeValue.textContent = `${savedFontSize}%`;
        document.documentElement.style.fontSize = `${savedFontSize}%`;
      }

      // High contrast mode
      contrastToggle.addEventListener("change", function () {
        if (this.checked) {
          document.body.classList.add("high-contrast");
          localStorage.setItem("nexus-high-contrast", "true");
          showToast("High contrast mode enabled");
        } else {
          document.body.classList.remove("high-contrast");
          localStorage.removeItem("nexus-high-contrast");
          showToast("High contrast mode disabled");
        }
      });

      // Load high contrast setting
      if (localStorage.getItem("nexus-high-contrast") === "true") {
        contrastToggle.checked = true;
        document.body.classList.add("high-contrast");
      }

      // Reduced motion
      reducedMotionToggle.addEventListener("change", function () {
        if (this.checked) {
          document.body.classList.add("reduced-motion");
          localStorage.setItem("nexus-reduced-motion", "true");
          showToast("Reduced motion enabled");
        } else {
          document.body.classList.remove("reduced-motion");
          localStorage.removeItem("nexus-reduced-motion");
          showToast("Reduced motion disabled");
        }
      });

      // Load reduced motion setting
      if (localStorage.getItem("nexus-reduced-motion") === "true") {
        reducedMotionToggle.checked = true;
        document.body.classList.add("reduced-motion");
      }

      // Play page audio
      playPageAudioBtn.addEventListener("click", function () {
        const mainContent = document.querySelector("main") || document.body;
        const text = mainContent.innerText.substring(0, 10000); // Limit text

        if ("speechSynthesis" in window) {
          const speech = new SpeechSynthesisUtterance(text);
          speech.rate = 0.9;
          speech.pitch = 1;
          speech.volume = 1;
          speech.lang = "en-US";

          speech.onstart = function () {
            playPageAudioBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            playPageAudioBtn.classList.add("btn-primary");
            playPageAudioBtn.classList.remove("btn-secondary");
          };

          speech.onend = function () {
            playPageAudioBtn.innerHTML = '<i class="fas fa-play"></i> Play';
            playPageAudioBtn.classList.remove("btn-primary");
            playPageAudioBtn.classList.add("btn-secondary");
          };

          window.speechSynthesis.speak(speech);
        }
      });

      // Reset accessibility settings
      resetAccessibilityBtn.addEventListener("click", function () {
        fontSizeSlider.value = 100;
        fontSizeValue.textContent = "100%";
        document.documentElement.style.fontSize = "100%";
        contrastToggle.checked = false;
        document.body.classList.remove("high-contrast");
        reducedMotionToggle.checked = false;
        document.body.classList.remove("reduced-motion");

        localStorage.removeItem("nexus-font-size");
        localStorage.removeItem("nexus-high-contrast");
        localStorage.removeItem("nexus-reduced-motion");

        showToast("Accessibility settings reset");
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

      // Reading Progress
      const readingProgressBar = document.querySelector('.reading-progress-bar');
      const sections = document.querySelectorAll('section');
      let totalSections = sections.length;
      let currentSection = 0;

      function updateReadingProgress() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let currentSectionIndex = 0;

        sections.forEach((section, index) => {
          if (scrollPosition >= section.offsetTop) {
            currentSectionIndex = index;
          }
        });

        const progress = ((currentSectionIndex + 1) / totalSections) * 100;
        readingProgressBar.style.width = `${progress}%`;
      }

      window.addEventListener('scroll', updateReadingProgress);
      updateReadingProgress();

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

            // Close accessibility panel if open
            accessibilityPanel.classList.remove("open");
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
        // Alt + A for accessibility panel
        if (e.altKey && e.key === "a") {
          accessibilityToggle.click();
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
      setTimeout(() => {
        showToast("Tip: Use Alt+T for theme, Alt+A for accessibility, Alt+H for home");
      }, 3000);

      // Particle Background
      if (typeof particlesJS !== "undefined") {
        particlesJS("particles-js", {
          particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
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

      // Initialize tooltips
      if (typeof bootstrap !== "undefined") {
        const tooltipTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
      }

      // Add offline detection
      window.addEventListener('online', () => {
        showToast('You are back online!');
      });

      window.addEventListener('offline', () => {
        showToast('You are offline. Some features may not work.');
      });

      // Add service worker registration for PWA
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }

      // Add copy email functionality
      const emailElements = document.querySelectorAll('[href*="mailto:"]');
      emailElements.forEach(emailElement => {
        emailElement.addEventListener('click', function (e) {
          if (navigator.clipboard) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            navigator.clipboard.writeText(email)
              .then(() => showToast('Email copied to clipboard!'))
              .catch(err => console.log('Failed to copy email: ', err));
          }
        });
      });

      // Add print functionality
      const printBtn = document.createElement('button');
      printBtn.innerHTML = '<i class="fas fa-print"></i>';
      printBtn.className = 'btn-secondary';
      printBtn.style.position = 'fixed';
      printBtn.style.bottom = '30px';
      printBtn.style.left = '100px';
      printBtn.style.zIndex = '999';
      printBtn.style.width = '50px';
      printBtn.style.height = '50px';
      printBtn.style.borderRadius = '50%';
      printBtn.style.display = 'flex';
      printBtn.style.alignItems = 'center';
      printBtn.style.justifyContent = 'center';
      printBtn.addEventListener('click', () => window.print());
      document.body.appendChild(printBtn);

      // Adjust print button position for mobile
      window.addEventListener('resize', function () {
        if (window.innerWidth <= 768) {
          printBtn.style.left = '85px';
          printBtn.style.bottom = '20px';
        } else {
          printBtn.style.left = '100px';
          printBtn.style.bottom = '30px';
        }
      });

      // Initialize with correct position
      window.dispatchEvent(new Event('resize'));
    });
  </script>