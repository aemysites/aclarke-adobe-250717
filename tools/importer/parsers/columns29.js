/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct children of the grid (i.e., columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const numCols = columns.length;

  // Header row: one cell that spans all columns (the importer will render it as a single <th> cell)
  // By putting only one cell in the header row, that's consistent with the requirements and importer logic
  const headerRow = ['Columns (columns29)'];

  // Content row: one cell for each column
  const contentRow = columns;

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
