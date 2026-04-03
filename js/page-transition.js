(() => {
  const root = document.documentElement;

  function revealPage() {
    root.classList.add("page-ready");
  }

  if (document.readyState === "complete") {
    revealPage();
  } else {
    window.addEventListener("load", revealPage, { once: true });
  }
})();
