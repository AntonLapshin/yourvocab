import { Trie, createTrieFromArray } from "trie";
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
      // global.trie.addWord("home");
      global.save();
    } else {
      console.log("load:", words);
      global.trie = createTrieFromArray(words);
    }
  });

  global.initialized = true;
  global.toggle();
})();
