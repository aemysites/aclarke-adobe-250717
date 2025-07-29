/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Hero (hero28)'];

  // 2. Find the background image (if any)
  let backgroundImg = null;
  // The image is inside a div with class 'ix-parallax-scale-out-hero'
  const parallaxDiv = element.querySelector('.ix-parallax-scale-out-hero');
  if (parallaxDiv) {
    const img = parallaxDiv.querySelector('img');
    if (img) {
      backgroundImg = img;
    }
  }

  // 3. Find the headline container (with h1 and possibly CTA)
  let contentCell = '';
  // It's inside a .container in the grid
  const containerDiv = element.querySelector('.container');
  if (containerDiv) {
    // .utility-margin-bottom-6rem contains the heading and (possibly) button group
    const contentDiv = containerDiv.querySelector('.utility-margin-bottom-6rem');
    if (contentDiv) {
      contentCell = contentDiv;
    } else {
      contentCell = containerDiv;
    }
  }

  // Compose the table data
  const cells = [
    headerRow,                        // Header: block name
    [backgroundImg ? backgroundImg : ''], // Row 2: background image (optional)
    [contentCell]                    // Row 3: title and other content
  ];

  // Create and insert the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
