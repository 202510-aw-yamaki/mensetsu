(() => {
  const stack = document.querySelector(".platform-overview-stack");
  const visual = document.querySelector(".platform-overview-visual");

  if (!stack || !visual) {
    return;
  }

  function clearSizing() {
    stack.style.removeProperty("height");
  }

  function syncHeight() {
    if (window.innerWidth < 1024) {
      clearSizing();
      return;
    }

    clearSizing();
    const visualHeight = visual.getBoundingClientRect().height;

    if (visualHeight <= 0) {
      return;
    }

    stack.style.height = `${visualHeight}px`;
  }

  const observer = new ResizeObserver(syncHeight);
  observer.observe(visual);

  window.addEventListener("resize", syncHeight);
  window.addEventListener("load", syncHeight);
  syncHeight();
})();
