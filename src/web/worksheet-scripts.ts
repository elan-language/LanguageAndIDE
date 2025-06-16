/* eslint-disable @typescript-eslint/no-explicit-any */

const updateable = document.querySelectorAll("input, textarea, select");
const hints = document.querySelectorAll("div.hint");
const doneCheckboxes = document.querySelectorAll("div.step > input[type=checkbox]");

const hintsTotal = document.querySelectorAll("span.hints-total");
const hintsTaken = document.querySelectorAll("span.hints-taken");

const autoSaveButton = document.getElementById("auto-save");

let fh: FileSystemFileHandle | undefined;

async function chromeSave(code: string, newName: string) {
  try {
    const fh = await showSaveFilePicker({
      suggestedName: newName,
      startIn: "documents",
      types: [{ accept: { "text/html": ".html" } }],
      id: "",
    });

    const writeable = await fh.createWritable();
    await writeable.write(code);
    await writeable.close();
    document.getElementById("worksheet")?.classList.add("saved");
    return fh;
  } catch {
    // cancelled
    return undefined;
  }
}

function updateDocument() {
  let code = new XMLSerializer().serializeToString(document);

  for (const e of document.querySelectorAll("input[type=text]") as NodeListOf<HTMLInputElement>) {
    const id = e.id;
    const v = e.value;
    const toReplace = `id="${id}" value=".*"`;
    const re = new RegExp(toReplace);

    code = code.replace(re, `id="${id}" value="${v}"`);
  }

  for (const e of document.querySelectorAll("input[type=radio]") as NodeListOf<HTMLInputElement>) {
    const id = e.id;
    const v = e.checked ? "true" : "false";
    const toReplace = `id="${id}" />`;
    const re = new RegExp(toReplace);

    code = code.replace(re, `id="${id}" checked="${v}" />`);
  }

  for (const e of document.querySelectorAll(
    "input[type=checkbox]",
  ) as NodeListOf<HTMLInputElement>) {
    const id = e.id;
    const v = e.checked ? `checked="true"` : "";
    const toReplace = `id="${id}" />`;
    const re = new RegExp(toReplace);

    code = code.replace(re, `id="${id}" ${v} />`);
  }

  for (const e of document.getElementsByTagName("textarea")) {
    const id = e.id;
    const v = e.value;
    const toReplace = `id="${id}">.*<`;
    const re = new RegExp(toReplace);

    code = code.replace(re, `id="${id}">${v}<`);
  }

  for (const e of document.getElementsByTagName("select")) {
    const options = e.options;
    const index = options.selectedIndex;

    const v = options[index].value;

    const toReplace = `option>${v}`;
    const re = new RegExp(toReplace);

    code = code.replace(re, `option selected>${v}`);
  }

  const toReplace = `<button.*id="auto-save".*>Auto-save file locally to continue</button>`;
  const re = new RegExp(toReplace);
  code = code.replace(re, '<button id="auto-save">Auto-save file locally to continue</button>');

  return code;
}

async function getUpdatedDocument() {
  const code = updateDocument();
  return code;
}

autoSaveButton!.addEventListener("click", async () => {
  const code = await getUpdatedDocument();

  fh = await chromeSave(code, "workSheet");

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
});

async function save() {
  if (fh) {
    const code = await getUpdatedDocument();
    const writeable = await fh.createWritable();
    await writeable.write(code);
    await writeable.close();
  }
}

for (const e of updateable) {
  e.addEventListener("input", async (e) => {
    const ie = e as InputEvent;
    const tgt = ie.target as Element;
    const id = tgt.id;
    const d = ie.data ?? "todo";

    tgt.classList.add("answered");

    if ((tgt as HTMLInputElement).type === "radio") {
      const name = (tgt as any).name;
      const allradio = document.querySelectorAll(`input[name=${name}]`);
      for (const e of allradio) {
        e.classList.add("answered");
      }
    }

    const changelist = document.getElementById("changes")!;

    const change = document.createElement("div");

    const changeText = document.createTextNode(`${id}:${d}`);

    change.appendChild(changeText);

    changelist.appendChild(change);

    await save();
  });
}

function updateHintsTaken() {
  for (const ht of hintsTaken as NodeListOf<HTMLSpanElement>) {
    const count = document.getElementsByClassName("taken").length;
    ht.innerText = `${count}`;
  }
}

for (const e of hints) {
  e.addEventListener("click", async (e) => {
    const hint = e.target as HTMLDivElement;
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
    const step = cb.parentElement;
    const id = cb.id.slice(4);
    if (step) {
      const allInputs = step.querySelectorAll("input, textarea, select") as NodeListOf<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >;

      const answeredInputs = step.querySelectorAll(
        "input.answered, textarea.answered, select.answered",
      );
      if (allInputs.length !== answeredInputs.length + 1) {
        /* + 1 is kludge for 'done' checkbox */
        e.preventDefault();
        return;
      }

      cb.disabled = true;
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
  });
}

for (const ht of hintsTotal as NodeListOf<HTMLSpanElement>) {
  const count = hints.length;
  ht.innerText = `${count}`;
}

updateHintsTaken();
