/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards21)'];

  // Find the card container (rotated card wrapper)
  let cardRotate = element.querySelector('.ix-card-rotate-2, .ix-backdrop-filter-blur');
  if (!cardRotate && element.classList.contains('ix-card-rotate-2')) cardRotate = element;

  // Find the card body (holds image & content)
  let cardBody = cardRotate ? cardRotate.querySelector('.card-body') : null;
  if (!cardBody) cardBody = element;

  // Extract the image (mandatory first cell)
  const cardImage = cardBody.querySelector('img');

  // Extract the heading/title (mandatory for cards)
  let cardHeading = cardBody.querySelector('h1, h2, h3, h4, h5, h6, .h4-heading');

  // Compose the text cell content
  const textCell = [];
  if (cardHeading) textCell.push(cardHeading);
  // If there were description or CTA, we would extract and include here

  // Build the cards table: header, then one row per card
  const cells = [
    headerRow,
    [cardImage, textCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
