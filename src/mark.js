import Mark from "mark.js";
import chunk from "lodash/chunk";

let instance;

export const highlight = (el, words) => {
  instance = new Mark(el);
  const chunks = chunk(words, 50);
  for (let c of chunks) {
    const exp = `\\b(${c.join("|")})\\b`;
    const rx = new RegExp(exp, "gmi");
    instance.markRegExp(rx);
  }
};

export const unmarkWord = word => {
  const marks = document.querySelectorAll("mark:not(.added)");
  [].forEach.call(marks, mark => {
    if (mark.innerText.toLowerCase() === word) {
      mark.classList.toggle("added", true);
    }
  });
  instance.unmark({ className: "added" });
};

export const unmarkAll = () => {
  instance.unmark();
};
