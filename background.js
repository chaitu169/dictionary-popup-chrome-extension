chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "getMeaning",
      title: "Get Meaning",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "getMeaning") {
      const selectedText = info.selectionText;
      chrome.storage.local.set({ selectedWord: selectedText }, () => {
        chrome.action.openPopup();
      });
    }
  });