!(() => {
  if (window.__yv && window.__yv.initialized) {
    window.__yv.toggle();
    return;
  }

  const yv = (window.__yv = {
    state: false
  });
})();
