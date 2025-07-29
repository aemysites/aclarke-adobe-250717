/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  let grid = element.querySelector('.container .grid-layout');
  if (!grid) grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children (columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // For each column, preserve all content (including text, images, etc.)
  const contentRow = columns.map((col) => col);

  // Header row: exactly one cell, as required
  const headerRow = ['Columns (columns15)'];

  // Create the table, header row must be a single column
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
