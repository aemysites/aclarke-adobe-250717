/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid of columns inside the footer
  const mainGrid = element.querySelector('.w-layout-grid');
  if (!mainGrid) return;

  // Each child of the grid is a column
  const columns = Array.from(mainGrid.children);
  if (!columns.length) return;

  // Header row must be a single cell
  const headerRow = ['Columns (columns9)'];
  // Content row: one cell for each column
  const contentRow = columns;

  // Build the block table: header row (1 cell), content row (N cells)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
