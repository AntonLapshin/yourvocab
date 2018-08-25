import { init } from "./init";

!(() => {
  if (window.__yv && window.__yv.initialized) {
    window.__yv.toggle();
    return;
  }

  const global = (window.__yv = {
    state: false
  });

  init(global);
})();
