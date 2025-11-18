/* eslint-disable @typescript-eslint/no-explicit-any */

import { createModelFromDocument, IWorksheetModel } from "./worksheet-model";

const questionsSelector = "input.question, textarea.question, select.question";
const questions = document.querySelectorAll(questionsSelector);
const notes = document.querySelectorAll("textarea.notes");
const hints = document.querySelectorAll("div.hint");
const doneCheckboxes = document.querySelectorAll("div.step > input.step-complete");
const snapshots = document.querySelectorAll("div.snapshot");

const autoSaveButton = document.getElementById("auto-save");

const loadAnswersButton = document.getElementById("load-answers");

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

const wsModel = createModelFromDocument(document);
const usernameModel = wsModel.username;

if (fh) {
  document.getElementById("worksheet")?.classList.add("saved");
  userName.disabled = true;
} else {
  document.getElementById("worksheet")?.classList.remove("saved");
}

if (usernameModel.isAnswered()) {
  userName.disabled = true;
}

async function write(jsonModel: string, fh: FileSystemFileHandle) {
  const writeable = await fh.createWritable();
  await writeable.write(jsonModel);
  await writeable.close();
  document.getElementById("worksheet")?.classList.add("saved");
}

async function chromeSave(jsonModel: string, newName: string) {
  try {
    const fh = await showSaveFilePicker({
      suggestedName: newName,
      startIn: "documents",
      types: [{ accept: { "application/json": ".json" } }],
      id: "",
    });
    await write(jsonModel, fh);
    userName.disabled = true;
    return fh;
  } catch {
    // cancelled
    return undefined;
  }
}

async function chromeRead() {
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      startIn: "documents",
      types: [{ accept: { "application/json": ".json" } }],
      id: "",
    });
    const codeFile = await fileHandle.getFile();
    return await codeFile.text();
  } catch (_e) {
    // user cancelled
    return;
  }
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
  const code = JSON.stringify(wsModel);

  const suggestedName = document.getElementsByClassName("docTitle")[0].innerHTML;
  fh = await chromeSave(code, suggestedName);

  scrollToActiveElement();
});

loadAnswersButton!.addEventListener("click", async () => {
  const txt = await chromeRead();
  if (txt) {
    const answers = JSON.parse(txt) as IWorksheetModel;
    wsModel.setAnswers(answers);

    (document.getElementById(wsModel.username.id) as HTMLInputElement).value =
      wsModel.username.value;
    for (const step of wsModel.steps) {
      if (step.done) {
        const st = document.getElementById(step.id) as HTMLElement;
        const cb = document.getElementById(step.id.replace("step", "done")) as HTMLInputElement;
        markStepComplete(cb, st);
      }

      for (const hint of step.hints) {
        

      }
    }
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
    const code = JSON.stringify(wsModel);
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
    const hintModel = wsModel.getHintById(hint.id)!;

    if (!hintModel?.taken) {
      const encryptedText = hint.dataset.hint || "";
      if (encryptedText !== "") {
        const content = document.getElementById(`${hint.id}content`);
        if (content) {
          content.innerHTML = atob(encryptedText);
          const hintHelps = content.querySelectorAll("a.help") as NodeListOf<HTMLLinkElement>;
          setupHelpLinks(hintHelps);
        }
      }
      hintModel?.setTaken();
      hint.classList.add("taken");
      hint.append(getTimestamp(hintModel.timeTaken));
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
      const q = wsModel.getQuestionById(tgt.id);
      q?.setValue(tgt.value);

      if (q?.isAnswered()) {
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

function getTimestamp(time: string) {
  const sp = document.createElement("span");
  sp.classList.add("timestamp");
  sp.innerText = time;
  return sp;
}

function markStepComplete(cb: HTMLInputElement, step: HTMLElement) {
  cb.disabled = true;
  cb.setAttribute("checked", "true");
  step.classList.remove("active");
  step.classList.add("complete");
  // for (const inp of allInputs) {
  //   inp.disabled = true;
  // }
  const nextId = wsModel.getNextStep()?.id;
  const nextStep = document.getElementById(nextId!);
  if (nextStep) {
    nextStep.classList.add("active");
  }
   cb.after(getTimestamp(wsModel.getStepById(step.id)!.timeDone));
}

for (const cb of doneCheckboxes as NodeListOf<HTMLInputElement>) {
  cb.addEventListener("click", async (e) => {
    clearTempMsgs();
    const step = cb.parentElement;
    if (step) {
      const stepModel = wsModel.getStepById(step.id);
      stepModel?.conditionalSetDone();

      if (stepModel?.done) {
        markStepComplete(cb, step);

        updateHintsTaken();
        snapShotCode(cb.id);
        await save();
      } else {
        const msg = document.createElement("div");
        msg.classList.add("temp-msg");
        msg.innerText = "All required inputs must be completed to continue";
        cb.after(msg);
        e.preventDefault();
      }
    }
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

      if (id.startsWith("hint")) {
        const hintModel = wsModel.getHintById(id);
        hintModel?.setDiff(text);
      } else {
        const stepModel = wsModel.getStepById(id.replace("done", "step"));
        stepModel?.setDiff(text);
      }

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

userName.addEventListener("change", (e) => {
  usernameModel.setValue((e.target as any).value);
  autosave.disabled = !usernameModel?.isAnswered();
});

autosave.disabled = !usernameModel?.isAnswered();

function snapShotCode(id: string) {
  window.parent.postMessage(`snapshot:${id}`, "*");
}

snapShotCode("initial");
