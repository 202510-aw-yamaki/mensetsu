document.addEventListener("keydown", (event) => {
  if (document.querySelector(".image-modal.is-open")) {
    return;
  }

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

(() => {
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  const scriptUrl = document.currentScript?.src || new URL("slide-navigation.js", document.baseURI).href;
  const cursorAssets = {
    pointer: {
      src: new URL("../image/cursor/01_pointer.png", scriptUrl).href,
      width: 88,
      height: 88,
      hotspotX: (22 / 396) * 88,
      hotspotY: (119 / 396) * 88,
    },
    help: {
      src: new URL("../image/cursor/02_help.png", scriptUrl).href,
      width: 82,
      height: 82,
      hotspotX: 18,
      hotspotY: 18,
    },
    wait: {
      src: new URL("../image/cursor/03_wait.png", scriptUrl).href,
      width: 82,
      height: 82,
      hotspotX: 20,
      hotspotY: 20,
    },
    progress: {
      src: new URL("../image/cursor/04_progress.png", scriptUrl).href,
      width: 82,
      height: 82,
      hotspotX: 20,
      hotspotY: 20,
    },
    text: {
      src: new URL("../image/cursor/05_text.png", scriptUrl).href,
      width: 82,
      height: 82,
      hotspotX: 20,
      hotspotY: 20,
    },
    "ns-resize": {
      src: new URL("../image/cursor/06_ns_resize.png", scriptUrl).href,
      width: 82,
      height: 82,
      hotspotX: 20,
      hotspotY: 20,
    },
    "not-allowed": {
      src: new URL("../image/cursor/07_not_allowed.png", scriptUrl).href,
      width: 82,
      height: 82,
      hotspotX: 20,
      hotspotY: 20,
    },
    move: {
      src: new URL("../image/cursor/08_move.png", scriptUrl).href,
      width: 82,
      height: 82,
      hotspotX: 20,
      hotspotY: 20,
    },
  };

  const cursorAliases = new Map([
    ["default", "pointer"],
    ["auto", "pointer"],
    ["pointer", "pointer"],
    ["help", "help"],
    ["wait", "wait"],
    ["progress", "progress"],
    ["text", "text"],
    ["vertical-text", "text"],
    ["ns-resize", "ns-resize"],
    ["row-resize", "ns-resize"],
    ["not-allowed", "not-allowed"],
    ["no-drop", "not-allowed"],
    ["move", "move"],
    ["all-scroll", "move"],
    ["grab", "move"],
    ["grabbing", "move"],
    ["zoom-in", "pointer"],
    ["zoom-out", "pointer"],
  ]);

  let latestX = 0;
  let latestY = 0;
  let isFrameQueued = false;
  let lastCursorKind = "";
  let cursorStyleElement = null;

  function injectCursorStyles() {
    if (document.getElementById("char-cursor-style")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "char-cursor-style";
    style.textContent = `
      html[data-char-cursor-active],
      html[data-char-cursor-active] body,
      html[data-char-cursor-active] body * {
        cursor: none !important;
      }

      #char-cursor {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2147483647;
        width: 82px;
        height: 82px;
        display: none;
        pointer-events: none;
        user-select: none;
        opacity: 1;
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        filter: none !important;
        padding: 0 !important;
        margin: 0 !important;
        outline: 0 !important;
        overflow: visible !important;
        mix-blend-mode: normal !important;
        transform: translate3d(-9999px, -9999px, 0);
      }

      #char-cursor img {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        object-fit: contain !important;
        object-position: left top !important;
        background: transparent !important;
        background-image: none !important;
        border: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        filter: none !important;
        padding: 0 !important;
        margin: 0 !important;
        outline: 0 !important;
        vertical-align: top !important;
      }
    `;

    document.head.appendChild(style);
    cursorStyleElement = style;
    document.documentElement.setAttribute("data-char-cursor-active", "true");
  }

  function createCursor() {
    const cursor = document.createElement("div");
    const image = document.createElement("img");

    cursor.id = "char-cursor";
    cursor.setAttribute("aria-hidden", "true");
    image.alt = "";
    image.decoding = "async";
    image.draggable = false;
    cursor.appendChild(image);
    document.body.appendChild(cursor);

    return { cursor, image };
  }

  function normalizeCursorValue(value) {
    if (!value) {
      return "";
    }

    const normalized = value
      .split(",")
      .map((part) => part.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean)
      .find((part) => !part.startsWith("url("));

    return normalized || "";
  }

  function resolveCursorKind(target) {
    if (cursorStyleElement) {
      cursorStyleElement.disabled = true;
    }

    let node = target instanceof Element ? target : target?.parentElement;

    try {
      while (node) {
        const dataCursor = node.getAttribute("data-cursor");
        if (dataCursor && cursorAliases.has(dataCursor)) {
          return cursorAliases.get(dataCursor);
        }

        const computedCursor = normalizeCursorValue(window.getComputedStyle(node).cursor);
        if (computedCursor && computedCursor !== "inherit" && computedCursor !== "initial" && computedCursor !== "unset" && computedCursor !== "none") {
          return cursorAliases.get(computedCursor) || "pointer";
        }

        node = node.parentElement;
      }
    } finally {
      if (cursorStyleElement) {
        cursorStyleElement.disabled = false;
      }
    }

    return "pointer";
  }

  function applyCursorKind(cursor, image, kind) {
    if (kind === lastCursorKind) {
      return;
    }

    const asset = cursorAssets[kind] || cursorAssets.pointer;
    cursor.style.width = `${asset.width}px`;
    cursor.style.height = `${asset.height}px`;
    cursor.dataset.hotspotX = `${asset.hotspotX}`;
    cursor.dataset.hotspotY = `${asset.hotspotY}`;

    if (image.src !== asset.src) {
      image.src = asset.src;
    }

    lastCursorKind = kind;
  }

  function renderCursor(cursor) {
    isFrameQueued = false;
    const hotspotX = Number(cursor.dataset.hotspotX || 0);
    const hotspotY = Number(cursor.dataset.hotspotY || 0);
    cursor.style.transform = `translate3d(${latestX - hotspotX}px, ${latestY - hotspotY}px, 0)`;
  }

  function queueRender(cursor) {
    if (isFrameQueued) {
      return;
    }

    isFrameQueued = true;
    window.requestAnimationFrame(() => renderCursor(cursor));
  }

  function init() {
    injectCursorStyles();
    const { cursor, image } = createCursor();

    // If a white rectangle still appears after these resets, it is likely baked into the PNG asset itself.
    applyCursorKind(cursor, image, "pointer");

    document.addEventListener(
      "mousemove",
      (event) => {
        latestX = event.clientX;
        latestY = event.clientY;
        cursor.style.display = "block";
        applyCursorKind(cursor, image, resolveCursorKind(event.target));
        queueRender(cursor);
      },
      { passive: true },
    );

    document.addEventListener(
      "mouseover",
      (event) => {
        applyCursorKind(cursor, image, resolveCursorKind(event.target));
      },
      { passive: true },
    );

    document.addEventListener(
      "mouseleave",
      () => {
        cursor.style.display = "none";
      },
      { passive: true },
    );

    window.addEventListener("blur", () => {
      cursor.style.display = "none";
    });

    window.addEventListener("mouseout", (event) => {
      if (!event.relatedTarget) {
        cursor.style.display = "none";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
