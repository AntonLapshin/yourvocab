!(() => {
  if (window.__yv && window.__yv.initialized) {
    window.__yv.toggle();
    return;
  }

  const global = (window.__yv = {
    state: false
  });

  //
  // Toggle the extension
  //
  global.toggle = () => {
    global.state = !global.state;
    console.log(global.state);
  };

  global.initialized = true;
  global.toggle();
})();
