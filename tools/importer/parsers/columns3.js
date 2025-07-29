/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the direct children (columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row must be a single column
  const cells = [['Columns (columns3)']];

  // Create content row with as many columns as found
  cells.push(columns);

  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element
  element.replaceWith(table);
}
