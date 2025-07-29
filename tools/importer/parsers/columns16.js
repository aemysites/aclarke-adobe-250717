/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  
  // Get all direct children, each representing a column
  const columnDivs = Array.from(grid.children);

  // For each column, extract the direct content (usually the innermost div)
  // Each column may have nested divs, so we want to grab the main content (usually an img)
  const columns = columnDivs.map(colDiv => {
    // Find the innermost element with an image
    // Some structures: colDiv > div > img
    let content = '';
    const innerDiv = colDiv.querySelector('div');
    if (innerDiv) {
      const img = innerDiv.querySelector('img');
      if (img) content = img;
    } else {
      const img = colDiv.querySelector('img');
      if (img) content = img;
    }
    return content;
  });

  // Compose the table - header row is single cell, second row has one cell per column
  const cells = [
    ['Columns (columns16)'],
    columns
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
