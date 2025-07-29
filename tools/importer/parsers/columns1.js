/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find all direct children of the grid (each is a column)
  const columns = Array.from(grid.children).filter(el => el.nodeType === 1);
  if (columns.length === 0) return;

  // The block header row, as specified
  const headerRow = ['Columns (columns1)'];

  // The next row contains the columns as table cells, referencing the existing DOM nodes
  const contentRow = columns;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the source element with the new block table
  element.replaceWith(table);
}
