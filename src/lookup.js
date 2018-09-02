import flow from "lodash/flow";
import curryRight from "lodash/curryRight";
import flatMap from "lodash/flatMap";
import filter from "lodash/filter";
import reduce from "lodash/reduce";

const getTextNodes = el => {
  let node,
    nodes = [],
    walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  while ((node = walker.nextNode())) {
    nodes.push(node);
  }
  return nodes;
};

const onlyUnknownWords = trie => word => !trie.lookup(word);

const getWordsFromTextNode = textNode =>
  textNode.textContent.toLowerCase().match(/([a-z'’äüöß]+)/gim);

const countWord = (total, word) => (
  (total[word] = total[word] !== undefined ? total[word] + 1 : 0), total
);

const sortWords = words =>
  Object.keys(words).sort((a, b) => words[b] - words[a]);

export const getUnknownWords = trie =>
  flow(
    getTextNodes,
    curryRight(flatMap)(getWordsFromTextNode),
    curryRight(filter)(onlyUnknownWords(trie)),
    curryRight(reduce)({})(countWord),
    sortWords
  );
