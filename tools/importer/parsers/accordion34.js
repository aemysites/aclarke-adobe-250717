/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as specified
  const headerRow = ['Accordion (accordion34)'];

  // Collect all accordion items that are direct children of the element
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));
  const rows = accordions.map(acc => {
    // Title cell: Find the .w-dropdown-toggle within the accordion
    const toggle = acc.querySelector('.w-dropdown-toggle');
    let titleCell = '';
    if (toggle) {
      // Try to use the .paragraph-lg as the most likely title node, else fallback to direct toggle
      const titleNode = toggle.querySelector('.paragraph-lg');
      titleCell = titleNode ? titleNode : toggle;
    }
    // Content cell: The nav.accordion-content contains a div.rich-text, but might just have text/children
    const nav = acc.querySelector('nav.accordion-content');
    let contentCell = '';
    if (nav) {
      // Usually a div.rich-text, but fallback to nav's children
      const rich = nav.querySelector('.rich-text, .w-richtext');
      if (rich) {
        contentCell = rich;
      } else {
        // Compose all child nodes except for empty whitespace
        const nodes = Array.from(nav.childNodes).filter(n => {
          if (n.nodeType === 3) return n.textContent.trim().length > 0;
          if (n.nodeType === 1) return true;
          return false;
        });
        contentCell = nodes.length === 1 ? nodes[0] : nodes;
      }
    }
    // Return a row of [title, content]
    return [titleCell, contentCell];
  });

  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element in the DOM
  element.replaceWith(table);
}
