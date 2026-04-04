(() => {
  const visual = document.querySelector(".usage-device-visual");

  if (!visual) {
    return;
  }

  const frames = Array.from(visual.children).filter((child) =>
    child.matches(".image-frame"),
  );

  if (frames.length < 2) {
    return;
  }

  function clearSpacing() {
    visual.style.removeProperty("gap");
    frames.forEach((frame) => {
      frame.style.removeProperty("margin-top");
    });
  }

  function balanceSpacing() {
    const width = window.innerWidth;

    if (width < 768) {
      clearSpacing();
      return;
    }

    clearSpacing();

    const available = visual.getBoundingClientRect().height -
      frames.reduce((sum, frame) => sum + frame.getBoundingClientRect().height, 0);

    if (available <= 0) {
      return;
    }

    const gap = Math.min(30, available);
    const topOffset = Math.max(0, available - gap);

    visual.style.gap = `${gap}px`;
    frames[0].style.marginTop = `${topOffset}px`;
  }

  const observer = new ResizeObserver(balanceSpacing);
  observer.observe(visual);

  window.addEventListener("resize", balanceSpacing);
  window.addEventListener("load", balanceSpacing);
  balanceSpacing();
})();
