/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Header row: exactly one cell (single column header)
  const headerRow = ['Columns (columns38)'];
  // Content row: as many columns as needed
  const contentRow = columns;
  // Compose the table data as in the example
  const cells = [headerRow, contentRow];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the created table
  element.replaceWith(table);
}
