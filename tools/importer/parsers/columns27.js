/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first direct .container > .grid-layout in the section
  const grid = element.querySelector('.container .grid-layout');
  if (!grid) return;

  // Get all immediate column children of the grid (usually two: content and image)
  const gridCols = Array.from(grid.children);
  if (gridCols.length < 2) return;

  // Reference the existing content and image columns directly
  const contentCol = gridCols[0];
  const imageCol = gridCols[1];

  // Table header as specified in the requirements
  const headerRow = ['Columns (columns27)'];

  // Create block table: one header row and one content row with two columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [contentCol, imageCol],
  ], document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}
