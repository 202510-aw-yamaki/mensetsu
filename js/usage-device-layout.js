(() => {
  const stack = document.querySelector(".usage-device-stack");
  const visual = document.querySelector(".usage-device-visual");

  if (!stack || !visual) {
    return;
  }

  const stackItems = Array.from(stack.children).filter((item) =>
    item.matches(".card, .note"),
  );
  const frames = Array.from(visual.children).filter((child) =>
    child.matches(".image-frame"),
  );

  if (stackItems.length < 2 || frames.length < 2) {
    return;
  }

  function clearStackSpacing() {
    stack.style.removeProperty("height");
    stack.style.removeProperty("gap");
  }

  function clearSpacing() {
    visual.style.removeProperty("gap");
    frames.forEach((frame) => {
      frame.style.removeProperty("margin-top");
    });
  }

  function balanceStackSpacing() {
    const width = window.innerWidth;

    if (width < 1024) {
      clearStackSpacing();
      return;
    }

    clearStackSpacing();

    const visualHeight = visual.getBoundingClientRect().height;
    const contentHeight = stackItems.reduce(
      (sum, item) => sum + item.getBoundingClientRect().height,
      0,
    );
    const available = visualHeight - contentHeight;

    if (available <= 0) {
      stack.style.height = `${visualHeight}px`;
      stack.style.gap = "0px";
      return;
    }

    const gap = available / (stackItems.length - 1);
    stack.style.height = `${visualHeight}px`;
    stack.style.gap = `${gap}px`;
  }

  function balanceSpacing() {
    const width = window.innerWidth;

    if (width < 768) {
      clearSpacing();
      clearStackSpacing();
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
    balanceStackSpacing();
  }

  const observer = new ResizeObserver(balanceSpacing);
  observer.observe(visual);
  observer.observe(stack);

  window.addEventListener("resize", balanceSpacing);
  window.addEventListener("load", balanceSpacing);
  balanceSpacing();
})();
