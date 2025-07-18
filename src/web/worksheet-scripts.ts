/* eslint-disable @typescript-eslint/no-explicit-any */

const answersSelector = "input.question, textarea.question, select.question";
const answers = document.querySelectorAll(answersSelector);
const hints = document.querySelectorAll("div.hint");
const doneCheckboxes = document.querySelectorAll("div.step > input.step-complete");

const hintsTotal = document.querySelectorAll("span.hints-total");
const hintsTaken = document.querySelectorAll("span.hints-taken");

const autoSaveButton = document.getElementById("auto-save");

const accordions = document.getElementsByClassName("acc-title");

for (const item of accordions) {
  item.addEventListener("click", function () {
    item.parentElement!.classList.toggle("active");
  });
}

let fh: FileSystemFileHandle | undefined;

if (fh) {
  document.getElementById("worksheet")?.classList.add("saved");
} else {
  document.getElementById("worksheet")?.classList.remove("saved");
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

for (const e of answers) {
  e.addEventListener("input", async (e) => {
    const ie = e as InputEvent;
    const tgt = ie.target as Element;

    tgt.classList.add("answered");

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

function updateHintsTaken() {
  for (const ht of hintsTaken as NodeListOf<HTMLSpanElement>) {
    const count = document.getElementsByClassName("taken").length;
    ht.innerText = `${count}`;
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
        }
      }
      hint.classList.add("taken");
      hint.append(getTimestamp());
      updateHintsTaken();
      await save();
    }
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
      const allInputs = step.querySelectorAll(answersSelector) as NodeListOf<
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
    await save();
  });
}

for (const ht of hintsTotal as NodeListOf<HTMLSpanElement>) {
  const count = hints.length;
  ht.innerText = `${count}`;
}

updateHintsTaken();

window.addEventListener("message", (m) => {
  if (m.data === "hasFocus") {
    scrollToActiveElement();
  }
});
