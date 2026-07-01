window.addEventListener("message", (m => {
  if (typeof m.data === "string" && m.data.startsWith("language:")) {
    const l = m.data.slice(9);
    const ws = document.querySelector("body");
    if (ws) {
      ws.classList.remove("elan", "python", "cs", "vb", "java");
      ws.classList.add(l);
    }
  }
  if (typeof m.data === "string" && m.data.startsWith("paradigm:")) {
    const p = m.data.slice(8);
    const ws = document.querySelector("body");
    if (ws) {
      ws.classList.remove("procedural", "oop", "functional");
      ws.classList.add(p);
    }
  }
}))
