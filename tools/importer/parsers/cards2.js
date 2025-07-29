/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the example
  const headerRow = ['Cards (cards2)'];
  const cells = [headerRow];

  // Find main card container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return; // Defensive: avoid errors if missing

  const gridChildren = Array.from(grid.children);

  // Helper to extract from a card with image and text
  function extractCard(cardEl) {
    // Find image
    let img = cardEl.querySelector('img');
    // Tag group (may not exist)
    let tagGroup = cardEl.querySelector('.tag-group');
    // Heading (may vary)
    let heading = cardEl.querySelector('h3');
    // Paragraph (description)
    let desc = cardEl.querySelector('p');

    // Compose content in second cell as in source order
    const content = [];
    if (tagGroup) content.push(tagGroup);
    if (heading) content.push(heading);
    if (desc) content.push(desc);

    return [img || '', content];
  }

  // 1. Feature card (left column, first child, has image)
  const mainCard = gridChildren[0];
  if (mainCard && mainCard.matches('a.utility-link-content-block')) {
    cells.push(extractCard(mainCard));
  }

  // 2. Right stacked cards with images (second child: vertical flex)
  const stackedContainer = gridChildren[1];
  if (stackedContainer) {
    const cardLinks = Array.from(stackedContainer.querySelectorAll(':scope > a.utility-link-content-block'));
    cardLinks.forEach(cardEl => {
      cells.push(extractCard(cardEl));
    });
  }

  // 3. Text-only cards (third child: vertical flex)
  const textContainer = gridChildren[2];
  if (textContainer) {
    const cardLinks = Array.from(textContainer.querySelectorAll(':scope > a.utility-link-content-block'));
    cardLinks.forEach(cardEl => {
      let heading = cardEl.querySelector('h3');
      let desc = cardEl.querySelector('p');
      const content = [];
      if (heading) content.push(heading);
      if (desc) content.push(desc);
      cells.push(['', content]);
    });
  }

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
