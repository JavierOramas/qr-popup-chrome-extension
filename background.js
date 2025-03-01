// Create the context menu item
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "generateQRCode",
      title: "Generate QR Code",
      contexts: ["selection"], // Show only when text is selected
    });
  });
  
// Listen for context menu clicks
// Create the context menu item
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "generateQRCode",
      title: "Generate QR Code",
      contexts: ["selection"],
    });
});
  
// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "generateQRCode") {
        chrome.action.openPopup();
    }
});