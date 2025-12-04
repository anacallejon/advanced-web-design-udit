document.addEventListener("DOMContentLoaded", () => {
  // ===== CUSTOM CURSOR =====
  const cursor = document.querySelector(".custom-cursor");

  if (cursor) {
    const COLOR1 = "rgb(178, 193, 237)"; // #b2c1ed
    const COLOR2 = "rgb(139, 147, 188)"; // #8b93bc

    document.addEventListener("mousemove", (e) => {
      cursor.style.opacity = "1";
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;

      // Truco: ocultar el cursor para poder "ver" lo que hay debajo
      cursor.style.visibility = "hidden";
      const el = document.elementFromPoint(e.clientX, e.clientY);
      cursor.style.visibility = "visible";

      if (!el) return;

      // Si estamos sobre un link/botón y quieres mantener el efecto .is-link,
      // NO cambiamos colores aquí
      if (cursor.classList.contains("is-link")) {
        return;
      }

      // Leer color de fondo real del elemento (subiendo por los padres si es transparente)
      let node = el;
      let bgColor = "rgba(0, 0, 0, 0)";

      while (node && node !== document.documentElement) {
        const computed = window.getComputedStyle(node);
        bgColor = computed.backgroundColor;

        if (bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
          break;
        }
        node = node.parentElement;
      }

      // Cambiar color del cursor según el fondo
      if (bgColor === COLOR1) {
        // si el fondo es #b2c1ed → cursor pasa a #8b93bc
        cursor.style.backgroundColor = COLOR2;
        cursor.style.borderColor = COLOR2;
      } else if (bgColor === COLOR2) {
        // si el fondo es #8b93bc → cursor pasa a #b2c1ed
        cursor.style.backgroundColor = COLOR1;
        cursor.style.borderColor = COLOR1;
      } else {
        // en cualquier otro fondo: color base
        cursor.style.backgroundColor = COLOR1;
        cursor.style.borderColor = COLOR1;
      }
    });

    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
    });

    // Hover en enlaces/botones → mantiene tu efecto "is-link"
    const interactive = document.querySelectorAll("a, button");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-link"));
      el.addEventListener("mouseleave", () =>
        cursor.classList.remove("is-link")
      );
    });
  }

  // ===== MODAL DE PROYECTOS (tu código actual debajo, sin tocar) =====
  if (document.body.classList.contains("projects-page")) {
    const cards = document.querySelectorAll(".card");
    const backdrop = document.querySelector(".project-modal-backdrop");
    const modalText = document.querySelector(".project-modal-text");
    const modalImages = document.querySelector(".project-modal-images");

    if (backdrop && cards.length > 0 && modalText && modalImages) {
      cards.forEach((card) => {
        card.addEventListener("click", () => {
          const projectId = card.getAttribute("data-project");
          const detail = projectId ? document.getElementById(projectId) : null;

          // Texto largo o fallback
          modalText.innerHTML = "";

          if (detail) {
            const detailTitle = detail.querySelector("h3");
            const detailText = detail.querySelector("p");
            if (detailTitle) modalText.appendChild(detailTitle.cloneNode(true));
            if (detailText) modalText.appendChild(detailText.cloneNode(true));
          } else {
            const titleEl = card.querySelector(".card-title");
            const textEl = card.querySelector(".card-text");
            if (titleEl) modalText.appendChild(titleEl.cloneNode(true));
            if (textEl) modalText.appendChild(textEl.cloneNode(true));
          }

          // Imágenes
          modalImages.innerHTML = "";
          const dataImages = card.getAttribute("data-images");
          const imgEl = card.querySelector(".card-img");
          let sources = [];

          if (dataImages && dataImages.trim() !== "") {
            sources = dataImages.split(",").map((s) => s.trim());
          } else if (imgEl && imgEl.src) {
            sources = [imgEl.src];
          }

          sources.forEach((src) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = "";
            modalImages.appendChild(img);
          });

          backdrop.classList.add("is-open");
          document.body.classList.add("modal-open");
        });
      });

      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove("is-open");
          document.body.classList.remove("modal-open");
        }
      });
    }
  }
});
