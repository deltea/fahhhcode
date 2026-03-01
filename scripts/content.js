const errorMessages = ["Wrong Answer", "Runtime Error", "Time Limit Exceeded", "Memory Limit Exceeded"];

let isVisible = false;

function observe(selector) {
  const target = document.querySelector(selector);
  if (target && !isVisible) {
    isVisible = true;
    if (selector === "div[data-e2e-locator='console-result']") {
      const text = target.textContent;
      if (errorMessages.some((errorMessage) => text.includes(errorMessage))) {
        chrome.runtime.sendMessage({ type: "element-appeared" });
      }
    } else {
      chrome.runtime.sendMessage({ type: "element-appeared" });
    }
  } else if (!target) {
    isVisible = false;
  }
}

const observer = new MutationObserver(mutations => {
  observe("div[data-e2e-locator='console-result']");
  // observe("button.some_failed");
  for (const mutation of mutations) {
    const classList = mutation.target.classList;
    if (classList.contains("some_failing")) {
      chrome.runtime.sendMessage({ type: "element-appeared" });
    }
  }
});

observer.observe(document.body, {
  childList: true,
  attributeFilter: ["class"],
  attributeOldValue: true,
  attributes: true,
  subtree: true
});
