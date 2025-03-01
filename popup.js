// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "generateQRCode") {
      const selectedText = request.text;
      generateQRCode(selectedText);
    }
  });
  
  // Generate QR code from the selected text
  function generateQRCode(text) {
    const qrCodeElement = document.getElementById("qr-code");
    qrCodeElement.innerHTML = ""; // Clear previous QR code
  
    QRCode.toCanvas(text, { width: 200, height: 200 }, (error, canvas) => {
      if (error) {
        console.error("Error generating QR code:", error);
        qrCodeElement.innerText = "Failed to generate QR code.";
      } else {
        qrCodeElement.appendChild(canvas);
      }
    });
  }
  
  // Request the selected text from the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getSelectedText,
    });
  });
  
  // Function to get the selected text
  function getSelectedText() {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      chrome.runtime.sendMessage({ action: "generateQRCode", text: selectedText });
    } else {
      alert("No text selected. Please select some text and try again.");
    }
  }

document.addEventListener('DOMContentLoaded', () => {
    // Check if we have text passed via URL (from context menu)
    const urlParams = new URLSearchParams(window.location.search);
    const textFromUrl = urlParams.get('text');
    
    if (textFromUrl) {
        // If we have text from URL, generate QR code immediately
        generateQRCode(decodeURIComponent(textFromUrl));
    } else {
        // Otherwise, request selected text from the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: getSelectedText,
            });
        });
    }
});

// Listen for messages from the background script or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "generateQRCode") {
        generateQRCode(request.text);
    }
});

// Generate QR code from the selected text
function generateQRCode(text) {
    const qrCodeElement = document.getElementById("qr-code");
    qrCodeElement.innerHTML = ""; // Clear previous QR code

    QRCode.toCanvas(text, { width: 200, height: 200 }, (error, canvas) => {
        if (error) {
            console.error("Error generating QR code:", error);
            qrCodeElement.innerText = "Failed to generate QR code.";
        } else {
            qrCodeElement.appendChild(canvas);
        }
    });
}

// Function to get selected text from the active tab
function getSelectedText() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        chrome.runtime.sendMessage({
            action: "generateQRCode",
            text: selectedText
        });
    }
}