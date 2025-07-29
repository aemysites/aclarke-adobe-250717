/* global WebImporter */
export default function parse(element, { document }) {
  // Block header
  const headerRow = ['Columns (columns11)'];

  // Find the main grid (text left, side content right)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let leftContent = null;
  let rightContent = null;
  if (mainGrid) {
    // Left side: Trend alert + heading
    leftContent = mainGrid.children[0];
    // Right side: Description, author, button
    rightContent = mainGrid.children[1];
  }

  // Find the image grid (two images)
  const imgGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imgCell1 = null;
  let imgCell2 = null;
  if (imgGrid) {
    const imgDivs = imgGrid.querySelectorAll('.utility-aspect-1x1');
    // Each imgDiv contains an img
    imgCell1 = imgDivs[0];
    imgCell2 = imgDivs[1];
  }

  // Prepare the table structure
  const rows = [
    headerRow,
    [leftContent, rightContent],
    [imgCell1, imgCell2]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
