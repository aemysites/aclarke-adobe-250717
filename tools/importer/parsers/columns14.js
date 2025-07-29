/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (columns wrapper)
  const grid = element.querySelector('.w-layout-grid');
  let columns = [];
  if (grid) {
    // Use immediate children as columns in the block
    columns = Array.from(grid.children);
  } else {
    // fallback: use all direct children of element
    columns = Array.from(element.children);
  }

  // The block name exactly as in the example, as a SINGLE header cell array
  const headerRow = ['Columns (columns14)'];
  // The second row: a single array, each item is a column cell (as per the example)
  const contentRow = [columns];

  // Compose the cells for the table
  const cells = [
    headerRow,
    contentRow,
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
