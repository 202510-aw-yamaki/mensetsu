(() => {
  const chapterGrid = document.querySelector(".chapter-grid");
  const chapterIntro = document.querySelector(".chapter-intro");
  const chapterToc = document.querySelector(".chapter-toc");
  const chapterVisual = document.querySelector(".chapter-visual");

  if (!chapterGrid || !chapterIntro || !chapterToc || !chapterVisual) {
    return;
  }

  function syncChapterVisualHeight() {
    const width = window.innerWidth;

    if (width <= 767) {
      chapterVisual.style.removeProperty("height");
      return;
    }

    if (width <= 1023) {
      chapterVisual.style.height = `${chapterToc.offsetHeight}px`;
      return;
    }

    const rowGap = parseFloat(window.getComputedStyle(chapterGrid).gap || "0");
    const leftHeight = chapterIntro.offsetHeight + chapterToc.offsetHeight + rowGap;
    chapterVisual.style.height = `${leftHeight}px`;
  }

  const observer = new ResizeObserver(syncChapterVisualHeight);
  observer.observe(chapterIntro);
  observer.observe(chapterToc);

  window.addEventListener("resize", syncChapterVisualHeight);
  window.addEventListener("load", syncChapterVisualHeight);
  syncChapterVisualHeight();
})();
