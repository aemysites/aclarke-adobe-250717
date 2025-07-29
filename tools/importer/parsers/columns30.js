/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout with 3 columns
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  if (!grid) return;
  const columns = Array.from(grid.children);
  // columns expected: [name, tags, heading, rich text]

  // Left column: name (if present) + tags
  const leftColNodes = [];
  if (columns[0] && columns[0].textContent.trim()) leftColNodes.push(columns[0]);
  if (columns[1] && columns[1].childNodes.length) leftColNodes.push(columns[1]);

  // Center column: heading (h2)
  const centerCol = columns[2] || null;
  // Right column: paragraph/richtext
  const rightCol = columns[3] || null;

  // The block header must exactly match the instruction and be a single cell
  // The number of columns in the content row determines the colspan
  const numCols = 3;
  // Create the table manually to set colspan on the header cell
  const table = document.createElement('table');
  const headerTr = document.createElement('tr');
  const th = document.createElement('th');
  th.setAttribute('colspan', numCols);
  th.innerHTML = 'Columns (columns30)';
  headerTr.appendChild(th);
  table.appendChild(headerTr);

  const contentTr = document.createElement('tr');
  const leftTd = document.createElement('td');
  if (leftColNodes.length === 1) {
    leftTd.append(leftColNodes[0]);
  } else {
    leftColNodes.forEach((node) => leftTd.append(node));
  }
  const centerTd = document.createElement('td');
  if (centerCol) centerTd.append(centerCol);
  const rightTd = document.createElement('td');
  if (rightCol) rightTd.append(rightCol);
  contentTr.appendChild(leftTd);
  contentTr.appendChild(centerTd);
  contentTr.appendChild(rightTd);
  table.appendChild(contentTr);

  element.replaceWith(table);
}
