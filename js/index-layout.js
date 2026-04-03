(() => {
  const heroGrid = document.querySelector(".hero-grid");
  const indexIntro = document.querySelector(".index-intro");
  const indexToc = document.querySelector(".index-toc");
  const heroVisual = document.querySelector(".hero-visual");

  if (!heroGrid || !indexIntro || !indexToc || !heroVisual) {
    return;
  }

  function syncIndexVisualHeight() {
    const width = window.innerWidth;

    if (width <= 767) {
      heroVisual.style.removeProperty("height");
      return;
    }

    if (width <= 1023) {
      heroVisual.style.height = `${indexToc.offsetHeight}px`;
      return;
    }

    const rowGap = parseFloat(window.getComputedStyle(heroGrid).gap || "0");
    const leftHeight = indexIntro.offsetHeight + indexToc.offsetHeight + rowGap;
    heroVisual.style.height = `${leftHeight}px`;
  }

  const observer = new ResizeObserver(syncIndexVisualHeight);
  observer.observe(indexIntro);
  observer.observe(indexToc);

  window.addEventListener("resize", syncIndexVisualHeight);
  window.addEventListener("load", syncIndexVisualHeight);
  syncIndexVisualHeight();
})();
