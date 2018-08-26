export const saveWords = words =>
  new Promise(resolve => {
    console.log("saving words:", words);
    chrome.storage.local.set(
      {
        words
      },
      resolve
    );
  });

export const loadWords = () =>
  new Promise(resolve => {
    console.log("loading words...");
    chrome.storage.local.get("words", ({ words }) => {
      resolve(words);
    });
  });
