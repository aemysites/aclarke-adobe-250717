/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block name
  const headerRow = ['Cards (cards23)'];
  const cards = [];
  // Select all .w-tab-pane sections (each tab's content)
  const panes = element.querySelectorAll('.w-tab-pane');
  panes.forEach((pane) => {
    // Within each pane, select its immediate grid
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> within the grid
    const cardLinks = grid.querySelectorAll('a.utility-link-content-block, a.card-link.secondary-card-link.utility-link-content-block, a.card-link.secondary-card-link, a.w-inline-block');
    cardLinks.forEach((card) => {
      // IMAGE CELL
      let img = card.querySelector('img.cover-image');
      let imageCell = img || '';
      // TEXT CELL: Title (h3/h4) and description .paragraph-sm
      let textCellContent = [];
      // Title: prefer h3, fall back to h4, then .h4-heading
      let title = card.querySelector('h3, h4, .h4-heading');
      if (title) textCellContent.push(title);
      // Description: .paragraph-sm (if present)
      let desc = card.querySelector('.paragraph-sm');
      if (desc) textCellContent.push(desc);
      // Fallback: if nothing present, use text node
      if (textCellContent.length === 0) {
        const txt = card.textContent.trim();
        if (txt) textCellContent.push(document.createTextNode(txt));
      }
      cards.push([imageCell, textCellContent]);
    });
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...cards
  ], document);
  element.replaceWith(table);
}
