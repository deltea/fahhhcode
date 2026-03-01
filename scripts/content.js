const errorMessages = ["Wrong Answer", "Runtime Error", "Time Limit Exceeded", "Memory Limit Exceeded"];

let isVisible = false;

const observer = new MutationObserver(() => {
  const target = document.querySelector("div[data-e2e-locator='console-result']");
  if (target && !isVisible) {
    isVisible = true;

    const text = target.textContent;
    if (errorMessages.some((errorMessage) => text.includes(errorMessage))) {
      chrome.runtime.sendMessage({ type: "element-appeared" });
    }
  } else if (!target) {
    isVisible = false;
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
