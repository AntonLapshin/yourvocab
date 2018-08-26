const getTextNodes = el => {
  let n,
    a = [],
    walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  while ((n = walk.nextNode())) a.push(n);
  return a;
};

export const getUnknownWords = (trie, el) => {
  const textNodes = getTextNodes(el);
  let regex, match;

  const words = new Set();
  for (let textNode of textNodes) {
    regex = /([a-z'’]+)/gmi;
    while ((match = regex.exec(textNode.textContent))) {
      const word = match[1].toLowerCase();
      if (!trie.lookup(word)) {
        words.add(word);
      }
    }
  }

  return [...words];
};