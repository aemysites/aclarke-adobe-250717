/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the example exactly
  const headerRow = ['Hero (hero5)'];

  // Find the main grid: section > div.grid-layout (first direct child)
  const mainGrid = element.querySelector(':scope > div');
  if (!mainGrid) {
    // fallback - if structure is different
    element.replaceWith(WebImporter.DOMUtils.createTable([headerRow], document));
    return;
  }

  // Find the image for the second row (direct <img> under the grid)
  let img = mainGrid.querySelector(':scope > img');
  if (!img) {
    // fallback: try anywhere under mainGrid
    img = mainGrid.querySelector('img');
  }

  // Find the left content area (usually grid > grid > section)
  let contentDiv = null;
  const grids = mainGrid.querySelectorAll(':scope > div');
  for (const grid of grids) {
    const maybeSection = grid.querySelector(':scope > div.section');
    if (maybeSection) {
      contentDiv = maybeSection;
      break;
    }
  }
  // fallback: just in case structure is slightly different
  if (!contentDiv) {
    contentDiv = mainGrid.querySelector('div.section');
  }
  // fallback: if contentDiv is still null, create an empty div
  if (!contentDiv) {
    contentDiv = document.createElement('div');
  }

  // Compose the block table: 1 column, 3 rows
  const cells = [
    headerRow,
    [img || ''],
    [contentDiv],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
