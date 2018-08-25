const getTextNodes = el => {
  let n,
    a = [],
    walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  while ((n = walk.nextNode())) a.push(n);
  return a;
};

const createElementFromHTML = html => {
  const div = document.createElement('div');
  div.innerHTML = html;

  // Change this to div.childNodes to support multiple top-level nodes
  return div.childNodes; //firstChild
}

export const walk = () => {
  const textNodes = getTextNodes(document);
  for(let textNode of textNodes){
    const textContent = textNode.textContent;
    const html = textContent.replace(/\b([A-Za-z']+)\b/gm, '<mark class="_yv">$1</mark>');
    console.log(html);
    const nodes = createElementFromHTML(html);
    const parent = textNode.parentNode;
    // const node = document.createElement('span');
    // node.innerText = textContent;
    // parent.insertBefore(node, textNode);
    for (let node of nodes){
      parent.insertBefore(node, textNode);
    }
    parent.removeChild(textNode);
  }
};
