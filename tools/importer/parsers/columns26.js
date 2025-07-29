/* global WebImporter */
export default function parse(element, { document }) {
  // The block header as per block description
  const headerRow = ['Columns (columns26)'];

  // Find the main content grid (usually a grid inside .container)
  // Find the first grid that contains the heading and quote
  const container = element.querySelector(':scope > div');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Extract the left column: heading + avatar + name/role (vertically stacked)
  // Extract the right column: quote + logo-svg/branding (vertically stacked)
  // Find the heading & quote
  const heading = mainGrid.querySelector('p.h2-heading');
  const quote = mainGrid.querySelector('p.paragraph-lg');

  // Find the testimonial info grid (contains avatar/name/role and svg logo)
  const testimonialGrid = mainGrid.querySelector('.w-layout-grid');

  // Left: heading, avatar, name, role
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (testimonialGrid) {
    // Find the avatar row: .flex-horizontal
    const flexRow = testimonialGrid.querySelector('.flex-horizontal');
    if (flexRow) leftCol.appendChild(flexRow);
  }

  // Right: quote, logo svg
  const rightCol = document.createElement('div');
  if (quote) rightCol.appendChild(quote);
  if (testimonialGrid) {
    // The logo svg is in .utility-display-inline-block (branding)
    const svgBlock = testimonialGrid.querySelector('.utility-display-inline-block');
    if (svgBlock) rightCol.appendChild(svgBlock);
  }

  // The columns block table: header, then a row with two columns
  const table = WebImporter.DOMUtils.createTable(
    [headerRow, [leftCol, rightCol]],
    document
  );

  element.replaceWith(table);
}
