const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
const floatingWhatsApp = document.querySelector(".floating-whatsapp");
const contactSection = document.querySelector("#contato");

const whatsappNumber = "5524992517752";
const whatsappMessage = "Olá, gostaria de agendar uma avaliação facial em Angra dos Reis.";

function syncHeader() {
  const isScrolled = window.scrollY > 16;
  header.classList.toggle("is-scrolled", isScrolled);
}

function closeMenu() {
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

function configureWhatsApp() {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  whatsappLinks.forEach((link) => {
    link.setAttribute("href", url);
  });
}

function syncFloatingWhatsApp() {
  if (!floatingWhatsApp || !contactSection || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      floatingWhatsApp.classList.toggle("is-over-contact", entry.isIntersecting);
    },
    { threshold: 0.18 }
  );

  observer.observe(contactSection);
}

function setupScrollReveal() {
  const targets = document.querySelectorAll(
    ".signal-item, .section-heading, .section-lead, .treatment-card, .method-copy, .step, .about-media, .about-panel, .credentials > div, .testimonial-card, .location-copy, .location-media, .map-placeholder, .faq-list details, .contact-copy, .contact-panel"
  );

  if (!targets.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  targets.forEach((target, index) => {
    target.classList.add("reveal-on-scroll");
    target.style.transitionDelay = `${Math.min((index % 5) * 70, 280)}ms`;
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  targets.forEach((target) => observer.observe(target));
}

window.addEventListener("scroll", syncHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

function setupCarousel() {
  const track = document.querySelector("[data-carousel]");
  const prevBtn = document.querySelector("[data-carousel-prev]");
  const nextBtn = document.querySelector("[data-carousel-next]");

  if (!track || !prevBtn || !nextBtn) {
    return;
  }

  const scrollByCard = (direction) => {
    const card = track.querySelector(".treatment-card");
    const distance = card ? card.getBoundingClientRect().width + 20 : 320;
    track.scrollBy({ left: distance * direction, behavior: "smooth" });
  };

  prevBtn.addEventListener("click", () => scrollByCard(-1));
  nextBtn.addEventListener("click", () => scrollByCard(1));
}

syncHeader();
configureWhatsApp();
syncFloatingWhatsApp();
setupScrollReveal();
setupCarousel();
