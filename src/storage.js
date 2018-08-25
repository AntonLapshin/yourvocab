import debounce from "lodash/debounce";

export const saveWords = debounce(
  words =>
    new Promise(resolve => {
      console.log("saving words:", words);
      chrome.storage.local.set(
        {
          words
        },
        resolve
      );
    }),
  5000
);

export const loadWords = () =>
  new Promise(resolve => {
    console.log("loading words...");
    chrome.storage.local.get("words", ({ words }) => {
      resolve(words);
    });
  });
