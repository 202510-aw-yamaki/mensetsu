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
