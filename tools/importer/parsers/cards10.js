/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));
  const rows = cards.map(card => {
    // Image
    const imgDiv = card.querySelector('.utility-aspect-3x2');
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // Text content container
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    const textParts = [];

    // Tag(s) (optional, usually one, but may be multiple)
    const tagGroup = textDiv ? textDiv.querySelector('.tag-group') : null;
    if (tagGroup) {
      const tags = Array.from(tagGroup.querySelectorAll('.tag'));
      tags.forEach((tag, i) => {
        // Just include the tag element as is (don't create new elements)
        textParts.push(tag);
        textParts.push(document.createElement('br'));
      });
    }

    // Title (h3 or .h4-heading)
    const title = textDiv ? textDiv.querySelector('h3, .h4-heading') : null;
    if (title) {
      // Use the existing heading element (preserves semantic meaning)
      textParts.push(title);
      textParts.push(document.createElement('br'));
    }

    // Description (p)
    const desc = textDiv ? textDiv.querySelector('p') : null;
    if (desc) {
      textParts.push(desc);
    }

    return [img, textParts];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
