/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row: EXACTLY as required
  const headerRow = ['Hero (hero20)'];

  // 2. Background image(s)
  // Find the .grid-layout.desktop-3-column (this holds the bg collage imgs)
  let bgCell = '';
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  if (grid) {
    const imgs = Array.from(grid.querySelectorAll('img'));
    if (imgs.length === 1) {
      bgCell = imgs[0];
    } else if (imgs.length > 1) {
      bgCell = imgs;
    }
  }

  // 3. Content cell: Heading, subheading, CTA(s)
  let contentCell = '';
  const contentWrapper = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentWrapper) {
    // Grab heading(s)
    const h1 = contentWrapper.querySelector('h1');
    // Subheading
    const subheading = contentWrapper.querySelector('p');
    // CTA buttons
    const btnGroup = contentWrapper.querySelector('.button-group');
    let ctas = [];
    if (btnGroup) {
      ctas = Array.from(btnGroup.querySelectorAll('a'));
    }
    // Compose all content in semantic order (heading, subheading, CTAs)
    const arr = [];
    if (h1) arr.push(h1);
    if (subheading) arr.push(subheading);
    if (ctas.length) arr.push(...ctas);
    contentCell = arr;
  }

  // 4. Assemble the table cell structure
  const rows = [
    headerRow,
    [bgCell],
    [contentCell]
  ];

  // 5. Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
