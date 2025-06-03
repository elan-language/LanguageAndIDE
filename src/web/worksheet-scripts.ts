/* eslint-disable @typescript-eslint/no-explicit-any */

const updateable = document.querySelectorAll("input, textarea, select");
const hints = document.getElementsByTagName("el-hint");

async function hash(toHash: string) {
  const msgUint8 = new TextEncoder().encode(toHash); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
  return hashHex;
}

async function checkHash() {
  const hash1 = document.getElementById("hash")!.innerHTML;

  let code = new XMLSerializer().serializeToString(document);

  const toReplace = `<div hidden="" id="hash">.*</div>`;
  const re = new RegExp(toReplace);

  code = code.replace(re, `<div hidden="" id="hash"></div>`);

  const hash2 = await hash(code);

  if (hash1 !== hash2) {
    alert("document has changed outside ide");
  }
}

checkHash();

const autoSaveButton = document.getElementById("auto-save");

let fh: FileSystemFileHandle | undefined;

async function chromeSave(code: string, newName: string) {
  const fh = await showSaveFilePicker({
    suggestedName: newName,
    startIn: "documents",
    types: [{ accept: { "text/html": ".html" } }],
    id: "",
  });

  const writeable = await fh.createWritable();
  await writeable.write(code);
  await writeable.close();
  return fh;
}

async function getUpdatedDocument() {
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

  const toReplace = `<div hidden="" id="hash">.*</div>`;
  const re = new RegExp(toReplace);

  code = code.replace(re, `<div hidden="" id="hash"></div>`);

  const hashcode = await hash(code);

  code = code.replace(
    `<div hidden="" id="hash"></div>`,
    `<div hidden="" id="hash">${hashcode}</div>`,
  );

  return code;
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
    const id = (ie.target as Element).id;
    const d = ie.data ?? "todo";

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
    const id = ke.target.id;
    const text = ke.target.dataset.hint;
    ke.target.innerHTML = atob(text);
    document.title = `${id} shown`;
    await save();
  });
}
