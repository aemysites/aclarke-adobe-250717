/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card container
  function extractCard(cardEl) {
    // Image: strictly first <img> descendant
    const imgEl = cardEl.querySelector('img');
    // Compose text content for the second column
    const textContent = [];
    // Heading: find first heading (h2-h6) inside cardEl
    const heading = cardEl.querySelector('h2, h3, h4, h5, h6');
    if (heading) textContent.push(heading);
    // Description: first <p> inside cardEl
    const desc = cardEl.querySelector('p');
    if (desc) textContent.push(desc);
    // CTA: find .button (non-link) or a.button (link)
    let cta = cardEl.querySelector('a.button, .button:not(a)');
    if (cta) textContent.push(cta);
    return [imgEl, textContent];
  }

  // Find the main grid containing the card columns
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const mainGrid = container.querySelector(':scope > .w-layout-grid.grid-layout');
  if (!mainGrid) return;
  // First card is a direct <a> child (left/main focus)
  const cards = [];
  const firstCard = mainGrid.querySelector(':scope > a.utility-link-content-block');
  if (firstCard) cards.push(firstCard);
  // Other cards are inside an inner grid
  const innerGrid = mainGrid.querySelector(':scope > .w-layout-grid.grid-layout');
  if (innerGrid) {
    innerGrid.querySelectorAll(':scope > a.utility-link-content-block').forEach(card => {
      cards.push(card);
    });
  }

  // Defensive: Add any other direct card links not already in cards
  mainGrid.querySelectorAll(':scope > a.utility-link-content-block').forEach(card => {
    if (!cards.includes(card)) cards.push(card);
  });
  if (innerGrid) {
    innerGrid.querySelectorAll(':scope > a.utility-link-content-block').forEach(card => {
      if (!cards.includes(card)) cards.push(card);
    });
  }

  // Compose the cells for the cards block table
  const cells = [['Cards (cards37)']];
  cards.forEach(card => {
    const [img, txt] = extractCard(card);
    // If either img or txt missing, fallback to null to avoid empty cells
    cells.push([img || '', txt.length ? txt : '']);
  });

  // Replace the input element with the structured block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
