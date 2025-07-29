/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the image (or use the column as fallback)
  const columnCells = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : col;
  });

  // Header row must be a single column (per requirements)
  const cells = [
    ['Columns (columns4)'], // Header row: only a single cell
    columnCells            // Second row: one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
