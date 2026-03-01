chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "play-sound") {
    const audio = new Audio(message.url);
    audio.play();
  }
});
