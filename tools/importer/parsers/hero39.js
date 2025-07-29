/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (MUST match example exactly)
  const headerRow = ['Hero (hero39)'];

  // 2nd row: Background image (optional)
  let bgImg = element.querySelector('img');
  const bgRow = [bgImg ? bgImg : ''];

  // 3rd row: text content (Headline, subheading, CTA)
  // In the provided HTML, this is inside the second main grid child
  // Find all grid-layout direct children
  const gridRows = element.querySelectorAll(':scope > div > div');
  let textContentDiv = null;
  for (const div of gridRows) {
    if (!div.querySelector('img')) {
      textContentDiv = div;
      break;
    }
  }
  let contentCell = '';
  if (textContentDiv) {
    // Look for the grid inside the textContentDiv
    const nestedGrid = textContentDiv.querySelector('.w-layout-grid');
    if (nestedGrid) {
      // Collect all element children (h1, flex containers, etc)
      const contentParts = [];
      nestedGrid.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          contentParts.push(node);
        }
      });
      contentCell = contentParts;
    } else {
      // fallback: use all children
      const contentParts = [];
      textContentDiv.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          contentParts.push(node);
        }
      });
      contentCell = contentParts;
    }
  }
  const contentRow = [contentCell];

  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
