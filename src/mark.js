import Mark from "mark.js";
import chunk from "lodash/chunk";

let instance;

const markChunkOfWords = chunk =>
  instance.markRegExp(new RegExp(`\\b(${chunk.join("|")})\\b`, "gmi"));

export const highlight = (el, words) => {
  instance = new Mark(el);
  chunk(words, 50).forEach(markChunkOfWords);
};

export const unmarkWord = word => {
  const marks = document.querySelectorAll("mark:not(.added)");
  [].filter
    .call(marks, mark => mark.innerText.toLowerCase() === word)
    .forEach(mark => mark.classList.toggle("added", true));
  instance.unmark({ className: "added" });
};

export const unmarkAll = () => instance.unmark();
