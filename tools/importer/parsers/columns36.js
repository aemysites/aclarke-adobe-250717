/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Columns (columns36)'];
  
  // Find the grid containing two main columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text content (heading, subheading, buttons)
  const leftCol = columns[0];

  // Right column: images
  // Images are in a nested grid inside the right column
  const rightCol = columns[1];
  let imgs = [];
  const nestedGrid = rightCol.querySelector('.w-layout-grid');
  if (nestedGrid) {
    imgs = Array.from(nestedGrid.querySelectorAll('img'));
  } else {
    imgs = Array.from(rightCol.querySelectorAll('img'));
  }

  // If no images are found, insert an empty array for that cell

  const blockRow = [leftCol, imgs.length ? imgs : ['']];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    blockRow
  ], document);
  element.replaceWith(table);
}
