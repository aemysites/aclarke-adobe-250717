/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example
  const headerRow = ['Hero (hero6)'];

  // --- Extract background image row ---
  // Try to get main image (background/decorative image)
  let imgEl = null;
  // Find first grid, then first 'img' inside it
  const grids = element.querySelectorAll(':scope > div');
  for (const grid of grids) {
    const img = grid.querySelector('img');
    if (img) {
      imgEl = img;
      break;
    }
  }
  // Fallback: look anywhere for an img (to be robust)
  if (!imgEl) imgEl = element.querySelector('img');

  // --- Extract content row (headline, subheading, CTAs) ---
  let contentEl = null;
  // Try to find the most likely content container
  for (const grid of grids) {
    // Look for .card, which should contain all text/buttons
    const card = grid.querySelector('.card');
    if (card) {
      contentEl = card;
      break;
    }
  }
  // Fallback: find .card anywhere
  if (!contentEl) contentEl = element.querySelector('.card');

  // Defensive: if missing, create empty placeholder
  const imgCell = imgEl ? [imgEl] : [];
  const contentCell = contentEl ? [contentEl] : [];

  const cells = [
    headerRow,
    imgCell,
    contentCell,
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
