async function playSound(soundFile) {
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"]
  });

  if (existingContexts.length === 0) {
    await chrome.offscreen.createDocument({
      url: chrome.runtime.getURL("offscreen.html"),
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Play notification sound"
    });
  }

  chrome.runtime.sendMessage({
    type: "play-sound",
    url: chrome.runtime.getURL(soundFile)
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "element-appeared") {
    playSound("/fahhh.mp3");
  }
});
