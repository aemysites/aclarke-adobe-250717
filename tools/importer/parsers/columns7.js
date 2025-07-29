/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (these are the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, use the main image or the column div if needed
  const contentCells = columns.map((colDiv) => {
    // Try to get the main image inside the column
    const img = colDiv.querySelector('img');
    // If the only child is an image, use the image directly
    if (img && colDiv.children.length === 1 && colDiv.firstElementChild.tagName === 'IMG') {
      return img;
    }
    // If the only child is a wrapper with an image, use the wrapper
    if (img && colDiv.children.length === 1 && colDiv.firstElementChild.querySelector('img')) {
      return colDiv.firstElementChild;
    }
    // Otherwise, return the whole column div
    return colDiv;
  });

  // The header row MUST be a single cell array (even if multiple columns in content row)
  const headerRow = ["Columns (columns7)"];
  const cells = [headerRow, contentCells];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
