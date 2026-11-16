(() => {
  // 1. Menu móvel: abre, fecha e atualiza os atributos de acessibilidade.
  const nav = document.querySelector(".nav");
  const mobileButton = document.querySelector(".mobile-menu");
  const navLinks = document.querySelectorAll(".nav a");

  mobileButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    mobileButton.setAttribute("aria-expanded", String(open));
    mobileButton.setAttribute(
      "aria-label",
      open ? "Fechar menu" : "Abrir menu",
    );
  });
  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      mobileButton.setAttribute("aria-expanded", "false");
      mobileButton.setAttribute("aria-label", "Abrir menu");
    }),
  );

  // 2. Projetos: filtra os cartões pela categoria escolhida.
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll(".project");

  filterButtons.forEach((button) =>
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      filterButtons.forEach((b) =>
        b.setAttribute("aria-pressed", String(b === button)),
      );
      projectCards.forEach((card) => {
        card.hidden =
          category !== "todos" && card.dataset.category !== category;
      });
    }),
  );

  // 3. Paletas: aplica as cores e marca a opção selecionada.
  const paletteButtons = document.querySelectorAll("[data-palette-choice]");

  paletteButtons.forEach((button) =>
    button.addEventListener("click", () => {
      document.body.dataset.palette = button.dataset.paletteChoice;
      paletteButtons.forEach((b) =>
        b.setAttribute("aria-pressed", String(b === button)),
      );
    }),
  );

  // 4. Detalhes: preenche e controla a janela de cada projeto.
  const dialog = document.querySelector("#project-dialog");
  const modalTitle = document.querySelector("#modal-title");
  const modalDescription = document.querySelector("#modal-description");

  document.querySelectorAll("[data-details]").forEach((button) =>
    button.addEventListener("click", () => {
      const project = button.closest(".project");
      modalTitle.textContent = project.dataset.title;
      modalDescription.textContent = project.dataset.description;
      dialog.showModal();
    }),
  );
  document
    .querySelector("#close-dialog")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // 5. Rodapé: mantém o ano atualizado automaticamente.
  document.querySelector("#year").textContent = new Date().getFullYear();

  // 6. Navegação: destaca no menu a seção visível na tela.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id,
            ),
          );
        });
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
  }
})();
