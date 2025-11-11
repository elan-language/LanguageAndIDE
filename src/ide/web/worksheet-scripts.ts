/* eslint-disable @typescript-eslint/no-explicit-any */

const questionsSelector = "input.question, textarea.question, select.question";
const questions = document.querySelectorAll(questionsSelector);
const notes = document.querySelectorAll("textarea.notes");
const hints = document.querySelectorAll("div.hint");
const doneCheckboxes = document.querySelectorAll("div.step > input.step-complete");
const snapshots = document.querySelectorAll("div.snapshot");

const autoSaveButton = document.getElementById("auto-save");

const helps = document.querySelectorAll("a.help");
const loads = document.querySelectorAll("button.load");
const userName = document.getElementById("username") as HTMLInputElement;
const autosave = document.getElementById("auto-save") as HTMLButtonElement;

let fh: FileSystemFileHandle | undefined;

declare const Diff: any;

type change = {
  added: boolean;
  removed: boolean;
  value: string;
  count: number;
};

if (fh) {
  document.getElementById("worksheet")?.classList.add("saved");
  userName.disabled = true;
} else {
  document.getElementById("worksheet")?.classList.remove("saved");
}

if (userName.value) {
  userName.disabled = true;
}

async function write(code: string, fh: FileSystemFileHandle) {
  const writeable = await fh.createWritable();
  await writeable.write(code);
  await writeable.close();
  document.getElementById("worksheet")?.classList.add("saved");
}

async function chromeSave(code: string, newName: string) {
  try {
    const fh = await showSaveFilePicker({
      suggestedName: newName,
      startIn: "documents",
      types: [{ accept: { "text/html": ".html" } }],
      id: "",
    });
    await write(code, fh);
    userName.disabled = true;
    return fh;
  } catch {
    // cancelled
    return undefined;
  }
}

function getUpdatedDocument() {
  for (const e of document.querySelectorAll("input[type=text]") as NodeListOf<HTMLInputElement>) {
    const v = e.value;

    e.setAttribute("value", v);
  }

  for (const e of document.querySelectorAll("input[type=radio]") as NodeListOf<HTMLInputElement>) {
    const v = e.checked ? "true" : "false";

    e.setAttribute("checked", v);
  }

  for (const e of document.querySelectorAll(
    "input[type=checkbox]",
  ) as NodeListOf<HTMLInputElement>) {
    if (e.checked) {
      e.setAttribute("checked", "true");
    }
  }

  for (const e of document.getElementsByTagName("textarea")) {
    const v = e.value;

    e.innerText = v;
  }

  for (const e of document.getElementsByTagName("select")) {
    const options = e.options;
    const index = options.selectedIndex;

    options[index].setAttribute("selected", "");
  }

  const code = new XMLSerializer().serializeToString(document);
  return code;
}

function scrollToActiveElement() {
  const activeAndCompleteSteps = document.querySelectorAll("div.complete, div.active");
  if (activeAndCompleteSteps.length === 0) {
    const firstStep = document.querySelector("div.step");
    firstStep?.classList.add("active");
    firstStep?.scrollIntoView(false);
  } else {
    const arr = Array.from(activeAndCompleteSteps);
    const lastElement = arr[arr.length - 1];
    lastElement.scrollIntoView(false);
  }
}

autoSaveButton!.addEventListener("click", async () => {
  const code = getUpdatedDocument();
  if (autoSaveButton?.classList.contains("test-only")) {
    // fake out saving
    document.getElementById("worksheet")?.classList.add("saved");
  } else {
    const suggestedName = document.getElementsByClassName("docTitle")[0].innerHTML;
    fh = await chromeSave(code, suggestedName);
  }

  scrollToActiveElement();
});

function clearTempMsgs() {
  const allMsgs = document.querySelectorAll(`.temp-msg`);
  for (const m of allMsgs) {
    m.remove();
  }
}

async function save() {
  if (fh) {
    const code = getUpdatedDocument();
    await write(code, fh);
  }
}

for (const e of questions) {
  addEventListenerToInput(e);
}

for (const e of notes) {
  addEventListenerToInput(e);
}

function updateHintsTaken() {
  let hintsSoFar = 0;
  let hintsTaken = 0;

  for (const step of document.querySelectorAll(
    "div.complete, div.active",
  ) as NodeListOf<HTMLDivElement>) {
    hintsTaken = hintsTaken + step.querySelectorAll(".taken").length;
    hintsSoFar = hintsSoFar + step.querySelectorAll("div.hint").length;

    const taken = step.querySelectorAll("span.hints-taken");
    const total = step.querySelectorAll("span.hints-total");

    for (const ht of taken as NodeListOf<HTMLSpanElement>) {
      ht.innerText = `${hintsTaken}`;
    }

    for (const ht of total as NodeListOf<HTMLSpanElement>) {
      ht.innerText = `${hintsSoFar}`;
    }
  }
}

for (const hint of hints as NodeListOf<HTMLDivElement>) {
  hint.addEventListener("click", async (_e) => {
    if (!hint.classList.contains("taken")) {
      const encryptedText = hint.dataset.hint || "";
      if (encryptedText !== "") {
        const content = document.getElementById(`${hint.id}content`);
        if (content) {
          content.innerHTML = atob(encryptedText);
          const hintHelps = content.querySelectorAll("a.help") as NodeListOf<HTMLLinkElement>;
          setupHelpLinks(hintHelps);
        }
      }
      hint.classList.add("taken");
      hint.append(getTimestamp());
      updateHintsTaken();
      snapShotCode(hint.id);
    }
  });
}

for (const ss of snapshots as NodeListOf<HTMLDivElement>) {
  ss.classList.add("collapsed");
  ss.addEventListener("click", () => ss.classList.toggle("collapsed"));
}

function addEventListenerToInput(e: Element) {
  e.addEventListener("input", async (e) => {
    const ie = e as InputEvent;
    const tgt = ie.target as Element;

    if (tgt instanceof HTMLTextAreaElement || tgt instanceof HTMLInputElement) {
      if (tgt.value) {
        tgt.classList.add("answered");
      } else {
        tgt.classList.remove("answered");
      }
    }

    if ((tgt as HTMLInputElement).type === "radio") {
      const name = (tgt as any).name;
      const allradio = document.querySelectorAll(`input[name=${name}]`);
      for (const e of allradio) {
        e.classList.add("answered");
      }
    }
    clearTempMsgs();
    await save();
  });
}

function getTimestamp() {
  const dt = new Date();
  const sp = document.createElement("span");
  sp.classList.add("timestamp");
  sp.innerText = `${dt.toLocaleTimeString()} ${dt.toLocaleDateString()}`;
  return sp;
}

for (const cb of doneCheckboxes as NodeListOf<HTMLInputElement>) {
  cb.addEventListener("click", async (e) => {
    clearTempMsgs();
    const step = cb.parentElement;
    const id = cb.id.slice(4);
    if (step) {
      const allInputs = step.querySelectorAll(questionsSelector) as NodeListOf<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >;

      const answeredInputs = step.querySelectorAll(
        "input.question.answered, textarea.question.answered, select.question.answered",
      );
      if (allInputs.length !== answeredInputs.length) {
        const msg = document.createElement("div");
        msg.classList.add("temp-msg");
        msg.innerText = "All required inputs must be completed to continue";
        cb.after(msg);
        e.preventDefault();
        return;
      }

      cb.disabled = true;
      cb.setAttribute("checked", "true");
      step.classList.remove("active");
      step.classList.add("complete");
      for (const inp of allInputs) {
        inp.disabled = true;
      }

      const nextId = parseInt(id!) + 1;
      const nextStep = document.getElementById(`step${nextId}`);
      if (nextStep) {
        nextStep.classList.add("active");
      }
    }

    cb.after(getTimestamp());
    updateHintsTaken();
    snapShotCode(cb.id);
    await save();
  });
}

for (const step of document.querySelectorAll("div.step") as NodeListOf<HTMLDivElement>) {
  const hintsTaken = step.querySelectorAll("span.hints-taken");
  const total = step.querySelectorAll("span.hints-total");

  for (const ht of hintsTaken as NodeListOf<HTMLSpanElement>) {
    ht.innerText = `${0}`;
  }

  for (const ht of total as NodeListOf<HTMLSpanElement>) {
    ht.innerText = `${0}`;
  }
}

function transformHeader(s: string): string {
  if (s.startsWith("#")) {
    const tokens = s.split(" ");
    if (tokens.length === 7 && tokens[0] === "#" && tokens[2] === "Elan") {
      return `${tokens[0]} ${tokens[2]} ${tokens[3]}\r\n`;
    }
  }
  return s;
}

function fixHeader(s: string): string {
  const firstNL = s.indexOf("\n");
  if (firstNL !== -1) {
    let firstLine = s.slice(0, firstNL);
    firstLine = transformHeader(firstLine);
    return `${firstLine}${s.slice(firstNL + 1)}`;
  }
  return s;
}

window.addEventListener("message", async (m: MessageEvent<string>) => {
  if (m.data === "hasFocus") {
    scrollToActiveElement();
  }

  if (m.data.startsWith("code:")) {
    const idPrefixed = m.data.slice(5);
    const indexOfColon = idPrefixed.indexOf(":");
    const id = idPrefixed.slice(0, indexOfColon);
    const newCode = idPrefixed.slice(indexOfColon + 1);

    const oldCode = localStorage.getItem("code_snapshot") ?? "";
    localStorage.setItem("code_snapshot", newCode);

    if (id.startsWith("done") || id.startsWith("hint")) {
      let diff = Diff.diffLines(fixHeader(oldCode), fixHeader(newCode), {
        newLineIsToken: true,
      }) as change[];

      diff = diff.map((d) => {
        if (d.added || d.removed) {
          return d;
        }

        if (d.count > 2) {
          const all = d.value
            .split("\n")
            .map((s) => s.trimEnd())
            .filter((s) => s);

          if (all.length > 2) {
            const result = [all[0], "...", all[all.length - 1]];

            return {
              added: false,
              removed: false,
              value: result.join("\n"),
              count: result.length,
            };
          }
        }

        return d;
      });

      const text = Diff.convertChangesToXML(diff);

      const diffDiv = document.createElement("div");
      diffDiv.classList.add("diff");
      diffDiv.innerHTML = text;

      const snapshotDiv = document.createElement("div");
      snapshotDiv.classList.add("snapshot");
      snapshotDiv.classList.add("collapsed");
      snapshotDiv.appendChild(diffDiv);

      document.getElementById(id)?.before(snapshotDiv);

      snapshotDiv.addEventListener("click", () => snapshotDiv.classList.toggle("collapsed"));
    }
    await save();
  }
});

function setupLoadLinks(loadLinks: NodeListOf<HTMLButtonElement>) {
  for (const b of loadLinks) {
    b.addEventListener("click", (_e) => {
      const code = document.getElementById(`code-${b.id}`)?.textContent ?? "";
      window.parent.postMessage(`code:${code}`, "*");
      snapShotCode("reset");
    });
  }
}

function setupHelpLinks(helpLinks: NodeListOf<HTMLLinkElement>) {
  for (const b of helpLinks) {
    b.addEventListener("click", (e) => {
      const link = b.href;
      window.parent.postMessage(`help:${link}`, "*");
      e.preventDefault();
      e.stopPropagation();
    });
  }
}

setupLoadLinks(loads as NodeListOf<HTMLButtonElement>);
setupHelpLinks(helps as NodeListOf<HTMLLinkElement>);
updateHintsTaken();

userName.addEventListener("change", () => {
  autosave.disabled = !userName.classList.contains("answered");
});

autosave.disabled = !userName.classList.contains("answered");

function snapShotCode(id: string) {
  window.parent.postMessage(`snapshot:${id}`, "*");
}

snapShotCode("initial");
