window.addEventListener("message", (m => {
  if (typeof m.data === "string" && m.data.startsWith("language:")) {
    const l = m.data.slice(9);
    const ws = document.querySelector("body");
    ws.classList.remove(...ws.classList);
    ws.classList.add(l);
  }
}))
