import { Trie, createTrieFromArray } from "trie";
import { loadWords, saveWords } from "./storage";
import { getUnknownWords } from "./lookup";
import { highlight } from "./highlight";

export const init = async global => {
  //
  // Toggle the extension
  //
  global.toggle = () => {
    global.state = !global.state;
  };

  global.initialized = true;
  global.toggle();

  const words = await loadWords();
  global.trie = !words ? new Trie() : createTrieFromArray(words);

  const el = document.body; //document.querySelector('.vxK8q');

  const unknownWords = getUnknownWords(global.trie, el);
  highlight(el, unknownWords);
};
