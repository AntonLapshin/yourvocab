import Mark from "mark.js";
import chunk from 'lodash/chunk';

export const highlight = (el, words) => {
  const instance = new Mark(el);
  const chunks = chunk(words, 50);
  for(let c of chunks){
    // console.log(c);
    const exp = `\\b(${c.join("|")})\\b`;
    const rx = new RegExp(exp, 'gmi');
    instance.markRegExp(rx);
  }
}