/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row must match exactly
  const headerRow = ['Cards (cards33)'];

  // Find all card links - these represent the cards
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // For each card, build a row: [image, text content]
  const rows = cardLinks.map(link => {
    // First cell: image (reference existing img element)
    const img = link.querySelector('img');
    
    // Second cell: all text content (title, tag, meta, description, CTA)
    // We'll reference the full content area (the div after the image in the grid)
    // Find the inner grid, then its children: [img, contentDiv]
    let textCell = '';
    const innerGrid = link.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Find the first non-img div child after the img
      const children = Array.from(innerGrid.children);
      // Typically, children[0] is img, children[1] is content
      const contentDiv = children.find(child => child !== img && child.tagName === 'DIV');
      if (contentDiv) {
        textCell = contentDiv;
      }
    }
    return [img || '', textCell || ''];
  });

  // Create table with header and card rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
