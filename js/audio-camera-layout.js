(() => {
  const stack = document.querySelector(".audio-camera-stack");
  const visual = document.querySelector(".audio-camera-visual");

  if (!stack || !visual) {
    return;
  }

  function syncHeight() {
    const width = window.innerWidth;

    if (width < 768 || width >= 1024) {
      stack.style.removeProperty("height");
      return;
    }

    stack.style.height = `${visual.offsetHeight}px`;
  }

  const observer = new ResizeObserver(syncHeight);
  observer.observe(visual);

  window.addEventListener("resize", syncHeight);
  window.addEventListener("load", syncHeight);
  syncHeight();
})();
