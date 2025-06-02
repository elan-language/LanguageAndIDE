const autoSaveButton = document.getElementById("auto-save");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

const hint1 = document.getElementById("hint1");

let fh = undefined;

async function chromeSave(code, newName ) {
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

function getUpdatedDocument() {
   let code = new XMLSerializer().serializeToString(document);

    for (const e of document.getElementsByClassName("simple-input")) {
      const id = e.id;
      const v = e.value;
      const toReplace = `id="${id}" value=".*"`;
      const re = new RegExp(toReplace);

      code = code.replace(re, `id="${id}" value="${v}"`);
    }

    for (const e of document.getElementsByTagName("textarea")) {
      const id = e.id;
      const v = e.value;
      const toReplace = `id="${id}">.*<`;
      const re = new RegExp(toReplace);

      code = code.replace(re, `id="${id}">${v}<`);
    }

     for (const e of document.getElementsByClassName("radio-input")) {
      const id = e.id;
      const v = e.checked ? "true" : "false";
      const toReplace = `id="${id}" />`;
      const re = new RegExp(toReplace);

      code = code.replace(re, `id="${id}" checked="${v}" />`);
    }

    return code;
}


autoSaveButton.addEventListener("click", async () => {
    let code = getUpdatedDocument();

    fh = await chromeSave(code, "workSheet");
});

async function save() {
     if (fh) {
      const code = getUpdatedDocument();
      const writeable = await fh.createWritable();
      await writeable.write(code);
      await writeable.close();
    }
}

for (const e of document.getElementsByClassName("update")) {
  e.addEventListener("input", async (e) => {
    await save();
  });
}

hint1.addEventListener("click", async () => {
    const text = document.getElementById("hint1-text").innerHTML;
    hint1.innerHTML = atob(text);
    document.title = "Hint1 shown";
    await save();
});