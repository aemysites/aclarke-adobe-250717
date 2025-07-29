/* global WebImporter */
export default function parse(element, { document }) {
  // Find the layout grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid that represent columns
  const columns = Array.from(grid.children);
  // Defensive: ensure at least two columns are present as in the HTML example
  const col1 = columns[0] || document.createElement('div');
  const col2 = columns[1] || document.createElement('div');

  // Header row should be a single cell, not matching content columns!
  const headerRow = ['Columns (columns35)'];
  // Second row contains as many columns (cells) as the visual layout
  const contentRow = [col1, col2];

  const table = WebImporter.DOMUtils.createTable([
    headerRow, // Single cell header
    contentRow // Multiple cells (columns)
  ], document);

  element.replaceWith(table);
}
