const getTextNodes = el => {
  let n,
    a = [],
    walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  while ((n = walk.nextNode())) a.push(n);
  return a;
};

const regex = /\b([A-Za-z']+)\b/gm;

export const getUnknownWords = (trie, el) => {
  const textNodes = getTextNodes(el);

  const words = new Set();
  for (let textNode of textNodes) {
    const matches = regex.exec(textNode.textContent);
    if (!matches){
      continue;
    }
    for (let word of matches) {
      if (!trie.lookup(word)) {
        words.add(word);
      }
    }
  }

  return [...words];
};
