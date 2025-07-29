/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // The first child: image (mobile game character)
  const firstCol = gridChildren[0];
  // Find the main image inside
  const leftImage = firstCol.querySelector('img');

  // The second child: container with the card
  const secondCol = gridChildren[1];
  // Find the card content
  const card = secondCol.querySelector('.card');
  if (!card) return;
  const cardBody = card.querySelector('.card-body');
  if (!cardBody) return;
  // Get the grid inside the card (3 columns on desktop)
  const cardGrid = cardBody.querySelector('.grid-layout.desktop-3-column');
  if (!cardGrid) return;
  const cardCols = Array.from(cardGrid.children);

  // First col: image (concert crowd)
  const middleImage = cardCols[0].querySelector('img') || cardCols[0];

  // Second col: content (heading, list items, buttons)
  // This is a div containing everything for the right column
  const rightCol = cardCols[1];

  // Build the table as in the example: header and one row of 3 columns
  const headerRow = ['Columns (columns12)'];
  const cells = [
    headerRow,
    [leftImage, middleImage, rightCol]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
