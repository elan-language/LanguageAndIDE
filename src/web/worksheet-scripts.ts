/* eslint-disable @typescript-eslint/no-explicit-any */

const updateable = document.querySelectorAll("input, textarea, select");
const hints = document.getElementsByTagName("el-hint");
const doneCheckboxes = document.querySelectorAll("input[type=checkbox].step");

/* async function hash(state: string[]) {
  // if no state return empty string
  if (state.length === 0) {
    return "";
  }
  const toHash = state.join(", ");

  const msgUint8 = new TextEncoder().encode(toHash); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
  return hashHex;
} */

/* async function getDocumentHash() {
  return await hash(getDocumentState());
}

async function checkHash() {
  const hash1 = document.getElementById("hash")?.innerHTML;
  const hash2 = await getDocumentHash();
  if (hash1 !== hash2) {
    alert("document has changed outside ide");
  }
}

checkHash(); */

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
/* 
function getDocumentState() {
  const state: string[] = [];

  for (const e of document.querySelectorAll(
    "input[type=text].answered",
  ) as NodeListOf<HTMLInputElement>) {
    const id = e.id;
    const v = e.value;
    state.push(`${id}:${v}`);
  }

  for (const e of document.querySelectorAll(
    "input[type=radio].answered",
  ) as NodeListOf<HTMLInputElement>) {
    const id = e.id;
    const v = e.checked ? "true" : "false";
    state.push(`${id}:${v}`);
  }

  for (const e of document.querySelectorAll(
    "input[type=checkbox].answered",
  ) as NodeListOf<HTMLInputElement>) {
    const id = e.id;
    const v = e.checked ? "true" : "false";
    state.push(`${id}:${v}`);
  }

  for (const e of document.querySelectorAll(
    "textarea.answered",
  ) as NodeListOf<HTMLTextAreaElement>) {
    const id = e.id;
    const v = e.value;
    state.push(`${id}:${v}`);
  }

  for (const e of document.querySelectorAll("select.answered") as NodeListOf<HTMLSelectElement>) {
    const id = e.id;
    const options = e.options;
    const index = options.selectedIndex;
    const v = options[index].value;

    state.push(`${id}:${v}`);
  }

  for (const e of document.querySelectorAll("el-hint.taken")) {
    const id = e.id;
    const v = e.innerHTML;

    state.push(`${id}:${v}`);
  }

  return state;
} */

async function getUpdatedDocument() {
  const code = updateDocument();
  /*   const hashcode = await getDocumentHash();
  const toReplace = `<div hidden="" id="hash">.*</div>`;
  const re = new RegExp(toReplace); */
  return code; //.replace(re, `<div hidden="" id="hash">${hashcode}</div>`);
}

autoSaveButton!.addEventListener("click", async () => {
  const code = await getUpdatedDocument();

  fh = await chromeSave(code, "workSheet");
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
    const tgt = ke.target as any;
    const id = tgt.id;
    const text = tgt.dataset.hint;
    tgt.innerHTML = atob(text);
    document.title = `${id} shown`;
    tgt.classList.add("taken");
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
  });
}

setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 10);
