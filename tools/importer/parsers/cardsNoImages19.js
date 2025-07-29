/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as in the example
  const headerRow = ['Cards'];
  // Select all direct child divs (each card)
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [headerRow];

  cardDivs.forEach(card => {
    // Each card: icon div(s) and a <p> with the text
    const p = card.querySelector('p');
    if (p) {
      rows.push([p]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
