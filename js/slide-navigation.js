document.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement ? document.activeElement.tagName : "";
  const isTypingContext =
    activeTag === "INPUT" ||
    activeTag === "TEXTAREA" ||
    activeTag === "SELECT" ||
    document.activeElement?.isContentEditable;

  if (isTypingContext) {
    return;
  }

  if (event.key === "ArrowLeft") {
    const prevLink = document.querySelector(".slide-footer .pager-link.is-secondary[href]");
    if (prevLink) {
      window.location.href = prevLink.getAttribute("href");
    }
  }

  if (event.key === "ArrowRight") {
    const nextLink = document.querySelector(".slide-footer .pager-link:not(.is-secondary)[href]");
    if (nextLink) {
      window.location.href = nextLink.getAttribute("href");
    }
  }
});

(() => {
  let startX = 0;
  let startY = 0;
  let activeTouchId = null;

  function isInteractiveTarget(target) {
    return Boolean(target && target.closest("a, button, input, textarea, select, label"));
  }

  document.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) {
        activeTouchId = null;
        return;
      }

      if (isInteractiveTarget(event.target)) {
        activeTouchId = null;
        return;
      }

      const touch = event.touches[0];
      activeTouchId = touch.identifier;
      startX = touch.clientX;
      startY = touch.clientY;
    },
    { passive: true },
  );

  document.addEventListener(
    "touchend",
    (event) => {
      if (activeTouchId === null) {
        return;
      }

      const touch = Array.from(event.changedTouches).find(
        (item) => item.identifier === activeTouchId,
      );

      activeTouchId = null;

      if (!touch) {
        return;
      }

      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const horizontalEnough = Math.abs(deltaX) > 50;
      const mostlyHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

      if (!horizontalEnough || !mostlyHorizontal) {
        return;
      }

      if (deltaX > 0) {
        const prevLink = document.querySelector(".slide-footer .pager-link.is-secondary[href]");
        if (prevLink) {
          window.location.href = prevLink.getAttribute("href");
        }
      } else {
        const nextLink = document.querySelector(".slide-footer .pager-link:not(.is-secondary)[href]");
        if (nextLink) {
          window.location.href = nextLink.getAttribute("href");
        }
      }
    },
    { passive: true },
  );
})();
