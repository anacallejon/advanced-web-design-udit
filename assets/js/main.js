document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("compact");
    } else {
      header.classList.remove("compact");
    }
  });
});

// Siempre empezar arriba al recargar o cambiar de página
window.history.scrollRestoration = "manual";

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
