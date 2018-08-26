import { Trie, createTrieFromArray } from "trie";
import { loadWords, saveWords } from "./storage";
import { getUnknownWords } from "./lookup";
import { highlight, unmark } from "./highlight";
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
  global.toggle = () => {
    global.state = !global.state;
    const action = global.state ? "addEventListener" : "removeEventListener";
    document[action]("mousedown", global.onMouseDown);
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
    unmark(word);
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
  global.toggle();

  const words = await loadWords();
  global.trie = !words ? new Trie() : createTrieFromArray(words);

  const el = document.body; //document.querySelector('.vxK8q');

  const unknownWords = getUnknownWords(global.trie, el);
  highlight(el, unknownWords);
};
