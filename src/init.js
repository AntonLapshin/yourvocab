import { Trie, createTrieFromArray } from "trie";
import { loadWords, saveWords } from "./storage";
import { getUnknownWords } from "./lookup";
import { highlight, unmarkWord, unmarkAll } from "./mark";
import { addStyle } from "./addStyle";
import debounce from "lodash/debounce";

const saveWordsDebounced = debounce(
  () => saveWords(window.__yv.trie.getWords()),
  5000
);

export const init = async global => {
  //
  // Toggle the extension
  //
  global.toggle = async () => {
    global.state = !global.state;
    const action = global.state ? "addEventListener" : "removeEventListener";
    document[action]("mousedown", global.onMouseDown);
    !global.state && unmarkAll();

    if (global.state) {
      const el = document.body;
      const unknownWords = getUnknownWords(global.trie)(el);
      highlight(el, unknownWords);
    }
  };

  global.onMouseDown = e => {
    const el = e.target;
    if (!el.matches("mark")) {
      return;
    }
    const word = el.innerText.toLowerCase();
    console.log(word);
    global.trie.addWord(word);
    saveWordsDebounced();
    unmarkWord(word);
  };

  addStyle(`
  mark {
    background: orange;
    color: black;
    cursor: pointer;
  }

  mark.added {
    background: none;
    color: inherit;
  }
  `);

  global.initialized = true;

  const words = await loadWords();
  global.trie = !words ? new Trie() : createTrieFromArray(words);
  await global.toggle();
};
