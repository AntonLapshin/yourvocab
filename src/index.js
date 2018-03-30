const init = () => {
    window.YOURVOCAB = {
        on: false
    };
};

const toggle = () => {
  const on = !window.YOURVOCAB.on;
};

(() => {
    !window.YOURVOCAB && init();
    toggle();
})();
