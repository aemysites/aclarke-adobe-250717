/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Get all direct child divs (each is a card or image)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(cardDiv => {
    // Look for the image (must be present in every card)
    const img = cardDiv.querySelector('img');
    // Find the text content. Sometimes it is in a nested div, sometimes not.
    let textContent = '';
    // Best: a div inside with utility-padding-all-2rem (which contains h3 & p)
    const padDiv = cardDiv.querySelector('.utility-padding-all-2rem');
    if (padDiv) {
      textContent = padDiv;
    } else {
      // Fallback: a utility-position-relative div
      const relDiv = cardDiv.querySelector('.utility-position-relative');
      if (relDiv) {
        textContent = relDiv;
      } else {
        // Fallback: if h3 or p is directly in cardDiv, wrap in a div
        const h3 = cardDiv.querySelector('h3');
        const p = cardDiv.querySelector('p');
        if (h3 || p) {
          const wrapper = document.createElement('div');
          if (h3) wrapper.appendChild(h3);
          if (p) wrapper.appendChild(p);
          textContent = wrapper;
        }
      }
    }
    // Only make a row if we have an img (as per Cards block definition)
    if (img) {
      rows.push([
        img,
        textContent || ''
      ]);
    }
  });
  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
