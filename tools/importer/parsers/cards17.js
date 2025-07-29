/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block name
  const headerRow = ['Cards (cards17)'];
  // Each card is an immediate child div
  const cardDivs = element.querySelectorAll(':scope > div');
  // Each card contains an image; this variant has no text content, so second cell is blank
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find the img (or other visual element if present in future variants)
    const visual = cardDiv.querySelector('img, svg, picture') || cardDiv;
    return [visual, ''];
  });
  // Compose table contents
  const table = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(table, document);
  // Replace the old element with the new block table
  element.replaceWith(block);
}
