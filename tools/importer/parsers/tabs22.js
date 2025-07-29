/* global WebImporter */
export default function parse(element, { document }) {
  // Get the tab menu and content container
  const children = element.querySelectorAll(':scope > div');
  if (children.length < 2) return;
  const tabMenu = children[0];
  const tabContentWrap = children[1];

  // Get tab labels from tabMenu <a> elements
  const tabLinks = tabMenu.querySelectorAll(':scope > a');
  // Get tab panes from tabContentWrap
  const tabPanes = tabContentWrap.querySelectorAll(':scope > div.w-tab-pane');

  const numTabs = Math.min(tabLinks.length, tabPanes.length);

  // Build table rows: First row is header
  const rows = [['Tabs']];

  for (let i = 0; i < numTabs; i++) {
    // Tab label extraction
    let labelContent = '';
    const labelDiv = tabLinks[i].querySelector('div');
    labelContent = labelDiv ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();

    // Tab content: use the first (and usually only) child div of the tab pane, or the pane itself if not present
    let contentBlock = tabPanes[i].querySelector(':scope > div') || tabPanes[i];
    rows.push([labelContent, contentBlock]);
  }

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the table
  element.replaceWith(table);
}
