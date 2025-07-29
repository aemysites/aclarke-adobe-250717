/* global WebImporter */
export default function parse(element, { document }) {
  // Find the multi-column grid (immediate child of .container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid, which are the columns
  const columns = Array.from(grid.children);

  // For this block, the first column is the info (title, subtitle, p),
  // the second is the contact list, the third is the image
  let col1 = null, col2 = null, col3 = null;
  columns.forEach(col => {
    if (col.tagName === 'DIV' && !col1) col1 = col;
    else if (col.tagName === 'UL' && !col2) col2 = col;
    else if (col.tagName === 'IMG' && !col3) col3 = col;
  });

  // Compose left cell: the heading info and the contact list
  const leftCellContent = document.createElement('div');
  if (col1) leftCellContent.appendChild(col1);
  if (col2) leftCellContent.appendChild(col2);

  // Right cell is the image
  const rightCellContent = col3;

  // Header row: exactly one column as per the example
  const cells = [
    ['Columns (columns18)'], // single cell header row
    [leftCellContent, rightCellContent] // content row with two columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
