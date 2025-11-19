/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  change,
  createModelFromDocument,
  HintModel,
  IWorksheetModel,
  QuestionModel,
} from "./worksheet-model";

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

declare const Diff: {
  diffLines: (s1: string, s2: string, options: { newLineIsToken: boolean }) => change[];
  convertChangesToXML: (diff: change[]) => string;
};

const wsModel = createModelFromDocument(document);

async function write(jsonModel: string, fh: FileSystemFileHandle) {
  try {
    const writeable = await fh.createWritable();
    await writeable.write(jsonModel);
    await writeable.close();
    document.getElementById("worksheet")?.classList.add("saved");
  } catch (_e) {
    document.getElementById("worksheet")?.classList.remove("saved");
    throw _e;
  }
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
    document.getElementById("worksheet")?.classList.remove("saved");
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
    fh = fileHandle;
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
    let answers: IWorksheetModel;
    try {
      answers = JSON.parse(txt);
    } catch {
      fh = undefined;
      alert("Attempting to load an invalid JSON file");
      return;
    }

    const title = document.querySelector("div.docTitle")?.textContent;
    const wsTitle = answers.title;

    if (title !== wsTitle) {
      fh = undefined;
      alert(
        `Attempting to load answers file for a different worksheet Expected: ${title} Actual: ${wsTitle}`,
      );
      return;
    }

    document.getElementById("worksheet")?.classList.add("saved");

    wsModel.setAnswers(answers);
    resetHtml();

    userName.disabled = true;
    userName.value = wsModel.username.value;
    for (const step of wsModel.steps) {
      const st = document.getElementById(step.id) as HTMLElement;
      const notes = document.getElementById(step.notes.id) as HTMLTextAreaElement;
      notes.value = step.notes.value;

      if (step.done) {
        const doneId = step.id.replace("step", "done");

        const cb = document.getElementById(doneId) as HTMLInputElement;
        markStepComplete(cb, st);
        setDiffInHtml(doneId, step.diff);
      }

      for (const hint of step.hints) {
        if (hint.taken) {
          const ht = document.getElementById(hint.id) as HTMLDivElement;
          takeHint(ht, hint);
          setDiffInHtml(hint.id, hint.diff);
        }
      }

      for (const question of step.questions) {
        const q = document.getElementById(question.id) as HTMLTextAreaElement;
        q.value = question.value;
        setAnswered(q, question);
      }
    }
    await save();
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

    try {
      await write(code, fh);
    } catch (_e) {
      document.getElementById("worksheet")?.classList.remove("saved");
      throw _e;
    }
  }
}

for (const e of questions) {
  addEventListenerToInput(e);
}

for (const e of notes) {
  addEventListenerToInput(e);
}

function updateHintsTaken() {
  for (const step of wsModel.steps) {
    const [hintsSoFar, hintsTaken] = wsModel.getHintsTotalAndTakenByStep(step.id);

    const st = document.getElementById(step.id)!;
    const taken = st.querySelector("span.hints-taken") as HTMLSpanElement;
    const total = st.querySelector("span.hints-total") as HTMLSpanElement;
    taken.innerText = `${hintsTaken}`;
    total.innerText = `${hintsSoFar}`;
  }
}

function takeHint(hint: HTMLDivElement, hintModel: HintModel) {
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
  hint.append(getTimestamp(hintModel.timeTaken));
  updateHintsTaken();
}

for (const hint of hints as NodeListOf<HTMLDivElement>) {
  hint.addEventListener("click", async (_e) => {
    const hintModel = wsModel.getHintById(hint.id)!;

    if (!hintModel.stepComplete && !hintModel.taken) {
      hintModel?.setTaken();
      takeHint(hint, hintModel);
      snapShotCode(hint.id);
    }
  });
}

for (const ss of snapshots as NodeListOf<HTMLDivElement>) {
  ss.classList.add("collapsed");
  ss.addEventListener("click", () => ss.classList.toggle("collapsed"));
}

function setAnswered(question: HTMLTextAreaElement, questionModel: QuestionModel) {
  if (questionModel.isAnswered()) {
    question.classList.add("answered");
  } else {
    question.classList.remove("answered");
  }
}

function addEventListenerToInput(e: Element) {
  e.addEventListener("input", async (e) => {
    const ie = e as InputEvent;
    const tgt = ie.target as Element;

    if (tgt instanceof HTMLTextAreaElement) {
      const q = wsModel.getQuestionOrNotesById(tgt.id)!;
      q.setValue(tgt.value);
      setAnswered(tgt, q);
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
  const stepModel = wsModel.getStepById(step.id)!;

  for (const q of stepModel.questions) {
    (document.getElementById(q.id) as HTMLTextAreaElement).disabled = true;
  }

  for (const h of stepModel.hints) {
    h.stepComplete = true;
  }

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
      });

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

      if (id.startsWith("hint")) {
        const hintModel = wsModel.getHintById(id);
        hintModel?.setDiff(diff);
      } else {
        const stepModel = wsModel.getStepById(id.replace("done", "step"));
        stepModel?.setDiff(diff);
      }

      setDiffInHtml(id, diff);
    }
    await save();
  }
});

function resetHtml() {
  const diffs = document.querySelectorAll("div.snapshot");

  for (const diff of diffs) {
    diff.remove();
  }

  const timestamps = document.querySelectorAll("span.timestamp");

  for (const timestamp of timestamps) {
    timestamp.remove();
  }

  clearTempMsgs();
}

function setDiffInHtml(id: string, diff: change[]) {
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
  wsModel.username.setValue((e.target as any).value);
  autosave.disabled = !wsModel.username.isAnswered();
});

function snapShotCode(id: string) {
  window.parent.postMessage(`snapshot:${id}`, "*");
}

snapShotCode("initial");
