addEventListener("paste", (event) => {
  let currentSelection = window.getSelection();
  let paste = (event.clipboardData || window.clipboardData).getData('text').trim();
  if (isUrl(paste) && !currentSelection.isCollapsed) {
    // Stop the event from being handled by Gmail.
    event.preventDefault();
    event.stopPropagation();
    // Copy the contents of the selection.
    let contents = currentSelection.getRangeAt(0).cloneContents();
    // Remove existing anchors.
    contents.querySelectorAll("a").forEach(a => a.replaceWith(...a.childNodes));
    // Create new anchor.
    let a = document.createElement('a');
    a.href = paste;
    a.appendChild(contents);
    // Replace current selection with new anchor.
    currentSelection.deleteFromDocument();
    currentSelection.getRangeAt(0).insertNode(a);
  }
}, true);

function isUrl(str) {
  let url;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }
  return url.protocol == "http:" || url.protocol == "https:";
}
