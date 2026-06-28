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

syncHeader();
configureWhatsApp();
syncFloatingWhatsApp();
