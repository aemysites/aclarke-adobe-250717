/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as required by instructions and example
  const rows = [['Accordion (accordion13)']];

  // Select all direct children with class 'divider' (each is an accordion item)
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach(divider => {
    // Within each divider: .w-layout-grid contains two children: title and content
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    const children = grid.querySelectorAll(':scope > *');
    if (children.length < 2) return; // Defensive: need both title and content

    // Use the actual element nodes for the cells
    const titleEl = children[0];
    const contentEl = children[1];
    rows.push([titleEl, contentEl]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
