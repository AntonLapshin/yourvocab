export const saveWords = words =>
  new Promise(resolve =>
    chrome.storage.local.set(
      {
        words
      },
      resolve
    )
  );

export const loadWords = () =>
  new Promise(resolve =>
    chrome.storage.local.get("words", ({ words }) => {
      resolve(words);
    })
  );
