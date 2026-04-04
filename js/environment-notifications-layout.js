(() => {
  const hero = document.querySelector(".environment-notifications-hero");
  const stack = document.querySelector(".environment-notifications-stack");
  const note = stack?.querySelector(".note");

  if (!hero || !stack || !note) {
    return;
  }

  function clearSizing() {
    stack.style.removeProperty("height");
  }

  function syncStackHeight() {
    if (window.innerWidth < 1024) {
      clearSizing();
      return;
    }

    clearSizing();
    const heroHeight = hero.getBoundingClientRect().height;

    if (heroHeight > 0) {
      stack.style.height = `${heroHeight}px`;
    }
  }

  const observer = new ResizeObserver(syncStackHeight);
  observer.observe(hero);

  window.addEventListener("resize", syncStackHeight);
  window.addEventListener("load", syncStackHeight);
  syncStackHeight();
})();
