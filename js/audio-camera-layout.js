(() => {
  const stack = document.querySelector(".audio-camera-stack");
  const visual = document.querySelector(".audio-camera-visual");

  if (!stack || !visual) {
    return;
  }

  const stackItems = Array.from(stack.children).filter((item) =>
    item.matches(".card, .note"),
  );

  function clearStackSpacing() {
    stack.style.removeProperty("gap");
    stackItems.forEach((item) => {
      item.style.removeProperty("--audio-camera-extra-pad");
    });
  }

  function balanceStackSpacing() {
    if (stackItems.length < 2) {
      return;
    }

    stack.style.gap = "0px";
    stackItems.forEach((item) => {
      item.style.removeProperty("--audio-camera-extra-pad");
    });

    const stackHeight = stack.getBoundingClientRect().height;
    const contentHeight = stackItems.reduce(
      (sum, item) => sum + item.getBoundingClientRect().height,
      0,
    );
    const available = stackHeight - contentHeight;

    if (available <= 0) {
      stack.style.gap = "0px";
      return;
    }

    const count = stackItems.length;
    const naturalGap = available / (count - 1);
    const gap = Math.min(20, naturalGap);
    stack.style.gap = `${gap}px`;

    if (naturalGap > 20) {
      const leftover = available - gap * (count - 1);
      const extraPad = leftover / count / 2;
      stackItems.forEach((item) => {
        item.style.setProperty("--audio-camera-extra-pad", `${extraPad}px`);
      });
    }
  }

  function syncHeight() {
    const width = window.innerWidth;

    if (width < 768 || width >= 1024) {
      stack.style.removeProperty("height");
      clearStackSpacing();
      if (width >= 1024) {
        balanceStackSpacing();
      }
      return;
    }

    stack.style.height = `${visual.offsetHeight}px`;
    balanceStackSpacing();
  }

  const observer = new ResizeObserver(syncHeight);
  observer.observe(visual);

  window.addEventListener("resize", syncHeight);
  window.addEventListener("load", syncHeight);
  syncHeight();
})();
