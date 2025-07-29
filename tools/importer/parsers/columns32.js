/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Find first image (left column)
  const imgCol = columns.find((el) => el.tagName === 'IMG') || '';
  // Find first div (right column) - holds all text
  const textCol = columns.find((el) => el.tagName === 'DIV') || '';

  // Table header as per block spec and example
  const header = ['Columns (columns32)'];

  // Second row: two columns, referencing existing elements
  const row = [imgCol, textCol];

  // Build and replace
  const table = WebImporter.DOMUtils.createTable([header, row], document);
  element.replaceWith(table);
}
