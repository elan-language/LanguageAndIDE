/* eslint-disable @typescript-eslint/no-explicit-any */

const updateable = document.querySelectorAll("input, textarea, select");
const hints = document.querySelectorAll("span.show");
const doneCheckboxes = document.querySelectorAll("input[type=checkbox].step");

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
    autoSaveButton?.classList.add("saved");
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

  const le = Array.from(
    document.querySelectorAll(
      "#auto-save.saved + .step, #auto-save.saved ~ .step.complete, #auto-save.saved ~ .step.complete + input + .step",
    ),
  );
  if (le.length > 0) {
    le[le.length - 1].scrollIntoView(false);
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

    const changelist = document.getElementById("changes")!;

    const change = document.createElement("div");

    const changeText = document.createTextNode(`${id}:${d}`);

    change.appendChild(changeText);

    changelist.appendChild(change);

    await save();
  });
}

for (const e of hints) {
  e.addEventListener("click", async (e) => {
    const ke = e as any;
    const span = ke.target as HTMLSpanElement;
    const hint = span.parentElement as HTMLDivElement;
    const id = span.id;
    const text = hint.dataset.hint || "";
    hint.innerText = atob(text);
    document.title = `${id} shown`;
    hint.classList.add("taken");
    await save();
  });
}

for (const cb of doneCheckboxes as NodeListOf<HTMLInputElement>) {
  cb.addEventListener("click", async (_e) => {
    const id = cb.id.slice(4);
    cb.disabled = true;
    const step = document.getElementById(`step${id}`);
    if (step) {
      step.classList.add("complete");
      for (const inp of step.getElementsByTagName("input")) {
        inp.disabled = true;
      }
    }
    const dt = new Date();
    const sp = document.createElement("span");
    sp.classList.add("timestamp");
    sp.innerText = `${dt.toLocaleTimeString()} ${dt.toLocaleDateString()}`;
    cb.append(sp);
  });
}
