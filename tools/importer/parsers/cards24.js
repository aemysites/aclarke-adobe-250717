/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards24)'];
  // Each card is an <a> direct child
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  // For each card, extract the image and text content
  const rows = cards.map(card => {
    // The image is in the first div as a direct child of <a>
    const imageDiv = card.querySelector(':scope > div');
    let image = null;
    if (imageDiv) {
      image = imageDiv.querySelector('img');
    }
    // The tag/date bar (optional), heading, no extra description in this markup
    // We'll build a fragment referencing the real elements
    const contentEls = [];
    // Tag + date
    const tagBar = card.querySelector(':scope > .flex-horizontal');
    if (tagBar) contentEls.push(tagBar);
    // Heading (h3)
    const heading = card.querySelector('h3');
    if (heading) contentEls.push(heading);
    return [image, contentEls];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
