/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the row of columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct child divs of the grid: each is a column
  const columns = Array.from(grid.children);
  // Create the header row as a single cell
  const headerRow = ['Columns (columns31)'];
  // Content row: multiple cells, one per column
  const contentRow = columns;
  // Compose the table data: header is one cell, content row is n cells
  const tableData = [headerRow, contentRow];
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the original element
  element.replaceWith(block);
}
