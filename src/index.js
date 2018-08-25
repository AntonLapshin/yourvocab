import { Trie, createTrieFromArray } from "trie";
import { getUnknownWords } from "./lookup";
import Mark from "mark.js";
import debounce from "lodash/debounce";

!(() => {
  if (window.__yv && window.__yv.initialized) {
    window.__yv.toggle();
    return;
  }

  const global = (window.__yv = {
    state: false,
    trie: null
  });

  //
  // Toggle the extension
  //
  global.toggle = () => {
    global.state = !global.state;
    console.log(global.state);
  };

  global.save = debounce(() => {
    const words = global.trie.getWords();
    console.log("save:", words);
    chrome.storage.local.set({
      words
    });
  }, 5000);

  //
  // Initialization
  //
  chrome.storage.local.get("words", ({ words }) => {
    if (!words) {
      global.trie = new Trie();
      global.save();
    } else {
      console.log("load:", words);
      global.trie = createTrieFromArray(words);
    }

    const context = document.body;
    const instance = new Mark(context);
    const unknownWords = getUnknownWords(global.trie, document.body).filter(
      (v, i) => i < 10
    );
    const expression = `\\b(${unknownWords.join("|")})\\b`;
    console.log(expression);
    const regex = new RegExp(expression, "gm");
    instance.markRegExp(regex);
  });

  global.initialized = true;
  global.toggle();
})();
