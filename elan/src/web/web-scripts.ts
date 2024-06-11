/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleClick, handleDblClick, handleKey } from "../editorHandlers";
import { DefaultProfile } from "../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../frames/file-impl";
import { editorEvent } from "../frames/interfaces/editor-event";
import { File } from "../frames/interfaces/file";
import { Profile } from "../frames/interfaces/profile";
import { CompileStatus, ParseStatus, RunStatus } from "../frames/status-enums";
import { StdLib } from "../std-lib";
import { System } from "../system";
import { doImport, getTestRunner } from "../runner";
import { WebInputOutput } from "./web-input-output";
import { fetchProfile, hash, transforms } from "./web-helpers";

const codeContainer = document.querySelector(".elan-code");
let file: File;
const codeFile = (<any>document.getElementsByClassName("elan-code")?.[0]).dataset.code;
let doOnce = true;
let profile: Profile;

function setup(p: Profile) {
  profile = p;
  file = new FileImpl(hash, profile, transforms());
  displayFile();
}

function resetFile() {
  elanInputOutput.clearConsole();
  file = new FileImpl(hash, profile, transforms());
  file.renderAsHtml().then((c) => updateContent(c));
}

function showError(err: Error, fileName: string) {
  resetFile();
  file.fileName = fileName;
  elanInputOutput.printLine(err.message ?? "Unknown error parsing file");
}

fetchProfile()
  .then((p) => setup(p))
  .catch((e) => {
    console.warn("profile not found - using default");
    setup(new DefaultProfile());
  });

function refreshAndDisplay() {
  elanInputOutput.clearConsole();
  file.refreshAllStatuses(getTestRunner(system, stdlib)).then(() => {
    const ps = file.readParseStatus();
    if (ps === ParseStatus.valid) {
      file.renderAsHtml().then((c) => {
        updateContent(c);
      });
    } else {
      const msg = file.parseError || "Failed load code";
      showError(new Error(msg), file.fileName);
    }
  });
}

function displayFile() {
  if (codeFile) {
    fetch(codeFile, { mode: "same-origin" })
      .then((f) => f.text())
      .then((text) => {
        const code = new CodeSourceFromString(text);
        file.parseFrom(code).then(
          () => {
            refreshAndDisplay();
          },
          (e) => {
            showError(e, file.fileName);
          },
        );
      })
      .catch((e) => {
        console.error(e);
        refreshAndDisplay();
      });
  } else {
    const previousCode = localStorage.getItem("elan-code");
    const previousFileName = localStorage.getItem("elan-file");
    if (previousCode) {
      const code = new CodeSourceFromString(previousCode);
      file.parseFrom(code).then(
        () => {
          file.fileName = previousFileName || file.defaultFileName;
          refreshAndDisplay();
        },
        (e) => {
          showError(e, previousFileName || file.defaultFileName);
        },
      );
    } else {
      refreshAndDisplay();
    }
  }
}

function getModKey(e: KeyboardEvent | MouseEvent) {
  return { control: e.ctrlKey, shift: e.shiftKey, alt: e.altKey };
}

function updateDisplayValues() {
  (document.getElementById("code-title") as HTMLDivElement).innerText = `Program: ${file.fileName}`; // ${getStatus()}`;
  (document.getElementById("parse") as HTMLDivElement).setAttribute(
    "class",
    file.readParseStatusForDashboard(),
  );
  (document.getElementById("compile") as HTMLDivElement).setAttribute(
    "class",
    file.readCompileStatusForDashboard(),
  );
  (document.getElementById("test") as HTMLDivElement).setAttribute(
    "class",
    file.readTestStatusForDashboard(),
  );
  //Display run status
  (document.getElementById("run-status") as HTMLDivElement).setAttribute(
    "class",
    file.readRunStatusForDashboard(),
  );
  // Button control
  const isEmpty = file.readParseStatus() === ParseStatus.default;
  const isParsing = file.readParseStatus() === ParseStatus.valid;
  const isCompiling = file.readCompileStatus() === CompileStatus.ok;
  const isRunning = file.readRunStatus() === RunStatus.running;
  const run = document.getElementById("run-button") as HTMLButtonElement;
  if (isRunning) {
    disable(run, "Program is already running");
  } else if (!file.containsMain()) {
    disable(run, "Code must have a 'main' routine to be run");
  } else if (!isCompiling) {
    disable(run, "Program is not compiling");
  } else {
    enable(run, "Run the program");
  }
  const stop = document.getElementById("stop") as HTMLButtonElement;
  const pause = document.getElementById("pause") as HTMLButtonElement;
  /*   if (isRunning) {
    enable(stop);
    enable(pause);
  } else {
    const msg = "Program is not running";
    disable(stop, msg);
    disable(pause, msg);
  }   */
  const load = document.getElementById("load") as HTMLButtonElement;
  const save = document.getElementById("save") as HTMLButtonElement;
  const newButton = document.getElementById("new") as HTMLButtonElement;
  enable(load, "Load code from a file");
  enable(save, "Save code as file to the Download directory");
  enable(newButton, "Clear the current code and start anew");
  if (isRunning) {
    const msg = "Program is running";
    disable(load, msg);
    disable(save, msg);
    disable(newButton, msg);
  } else if (isEmpty) {
    disable(save, "Some code must be added in order to save");
  } else if (!isParsing) {
    disable(save, "Code must be parsing in order to save");
  }
}

function disable(button: HTMLButtonElement, msg = "") {
  button.setAttribute("disabled", "");
  button.setAttribute("title", msg);
}
function enable(button: HTMLButtonElement, msg = "") {
  button.removeAttribute("disabled");
  button.setAttribute("title", msg);
}

/**
 * Render the document
 */
function updateContent(text: string) {
  file.setRunStatus(RunStatus.default);
  doOnce = doOnce === undefined || doOnce ? true : false;

  codeContainer!.innerHTML = text;

  const frames = document.querySelectorAll(".elan-code [id]");

  for (const frame of frames) {
    const id = frame.id;

    frame.addEventListener("keydown", (event: Event) => {
      const ke = event as KeyboardEvent;
      const msg: editorEvent = {
        type: "key",
        target: "frame",
        id: id,
        key: ke.key,
        modKey: getModKey(ke),
      };
      postMessage(msg);
      event.preventDefault();
      event.stopPropagation();
    });

    frame.addEventListener("click", (event) => {
      const ke = event as PointerEvent;
      const selection = (event.target as HTMLInputElement).selectionStart as number | undefined;
      const msg: editorEvent = {
        type: "click",
        target: "frame",
        id: id,
        modKey: getModKey(ke),
        selection: selection,
      };
      postMessage(msg);
      event.preventDefault();
      event.stopPropagation();
    });

    frame.addEventListener("mousedown", (event) => {
      // mousedown rather than click as click does not seem to pick up shift/ctrl click
      const me = event as MouseEvent;
      if (me.button === 0 && me.shiftKey) {
        // left button only
        const msg: editorEvent = {
          type: "click",
          target: "frame",
          id: id,
          modKey: getModKey(me),
        };
        postMessage(msg);
        event.preventDefault();
        event.stopPropagation();
      }
    });

    frame.addEventListener("mousemove", (event) => {
      event.preventDefault();
    });

    frame.addEventListener("dblclick", (event) => {
      const ke = event as KeyboardEvent;
      const msg: editorEvent = {
        type: "dblclick",
        target: "frame",
        id: id,
        modKey: getModKey(ke),
      };
      postMessage(msg);
      event.preventDefault();
      event.stopPropagation();
    });
  }

  const input = document.querySelector(".focused input") as HTMLInputElement;
  const focused = document.querySelector(".focused") as HTMLUnknownElement;
  const elanCode = document.querySelector(".elan-code") as HTMLDivElement;

  if (doOnce) {
    doOnce = false;

    elanCode!.addEventListener("keydown", (event: Event) => {
      const ke = event as KeyboardEvent;
      const msg: editorEvent = {
        type: "key",
        target: "window",
        key: ke.key,
        modKey: getModKey(ke),
      };
      postMessage(msg);
      event.preventDefault();
      event.stopPropagation();
    });
  }

  if (input) {
    const cursor = input.dataset.cursor as string;
    const pIndex = parseInt(cursor) as number;
    const cursorIndex = Number.isNaN(pIndex) ? input.value.length : pIndex;

    input.setSelectionRange(cursorIndex, cursorIndex);
    input.focus();
  } else if (focused) {
    focused.focus();
  } else {
    elanCode.focus();
  }

  if (file.readParseStatus() === ParseStatus.valid) {
    // save to local store
    file.renderAsSource().then((code) => {
      localStorage.setItem("elan-code", code);
      localStorage.setItem("elan-file", file.fileName);
      (document.getElementById("save") as HTMLButtonElement).classList.add("unsaved");
    });
  }

  updateDisplayValues();

  // debug check
  if (document.querySelectorAll(".focused").length > 1) {
    console.warn("multiple focused");
  }
}

function postMessage(e: editorEvent) {
  switch (e.type) {
    case "click":
      handleClick(e, file);
      file.renderAsHtml().then((c) => updateContent(c));
      return;
    case "dblclick":
      handleDblClick(e, file);
      file.renderAsHtml().then((c) => updateContent(c));
      return;
    case "key":
      const codeChanged = handleKey(e, file);
      if (codeChanged === true) {
        refreshAndDisplay();
      } else if (codeChanged === false) {
        file.renderAsHtml().then((c) => updateContent(c));
      }
      // undefined just return
      return;
  }
}

const elanInputOutput = new WebInputOutput(
  document.getElementById("console")!,
  document.getElementById("graphics")!,
);

const system = new System(elanInputOutput);
const stdlib = new StdLib(system);

const runButton = document.getElementById("run-button");
const clearConsoleButton = document.getElementById("clear-console");
const newButton = document.getElementById("new");

runButton?.addEventListener("click", () => {
  try {
    file.setRunStatus(RunStatus.running);
    updateDisplayValues();
    const jsCode = file.compile();

    return doImport(jsCode).then(async (elan) => {
      if (elan.program) {
        elan._inject(system, stdlib);
        const [main, tests] = await elan.program();
        // clear tests each time or the tests array in the program gets duplicates
        tests.length = 0;
        main()
          .then(() => {
            console.info("elan program completed OK");
            file.setRunStatus(RunStatus.default);
            updateDisplayValues();
          })
          .catch((e: any) => {
            console.warn(e);
            file.setRunStatus(RunStatus.error);
            updateDisplayValues();
          });
      }
    });
  } catch (e) {
    console.warn(e);
    file.setRunStatus(RunStatus.error);
    updateDisplayValues();
  }
});

clearConsoleButton?.addEventListener("click", () => {
  elanInputOutput.clearConsole();
});

newButton?.addEventListener("click", () => {
  resetFile();
});

const upload = document.getElementById("load") as Element;
upload.addEventListener("click", chooser);

function chooser(event: Event) {
  const f = document.createElement("input");
  f.style.display = "none";
  f.type = "file";
  f.name = "file";
  f.accept = ".elan";
  document.getElementById("code-controls")?.appendChild(f);
  f.addEventListener("change", handleUpload);
  f.click();
}

function handleUpload(event: Event) {
  const elanFile = (event.target as any).files?.[0] as any;

  if (elanFile) {
    elanInputOutput.clearConsole();
    const fileName = elanFile.name;
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      const rawCode = event.target.result;
      const code = new CodeSourceFromString(rawCode);
      file = new FileImpl(hash, profile, transforms());
      file.fileName = fileName;
      file.parseFrom(code).then(
        () => {
          refreshAndDisplay();
        },
        (e) => {
          showError(e, fileName);
        },
      );
    });
    reader.readAsText(elanFile);
  }

  event.preventDefault();
}

const download = document.getElementById("save") as Element;
download.addEventListener("click", handleDownload);

function handleDownload(event: Event) {
  let fileName = prompt("Please enter your file name", file.fileName);

  if (fileName === null) {
    // cancelled
    return;
  }

  if (!fileName) {
    fileName = file.defaultFileName;
  }

  if (!fileName.endsWith(".elan")) {
    fileName = fileName + ".elan";
  }

  file.fileName = fileName;
  file.renderAsSource().then((code) => {
    const blob = new Blob([code], { type: "plain/text" });

    const aElement = document.createElement("a");
    aElement.setAttribute("download", fileName!);
    const href = URL.createObjectURL(blob);
    aElement.href = href;
    aElement.setAttribute("target", "_blank");
    aElement.click();
    URL.revokeObjectURL(href);
    (download as HTMLButtonElement).classList.remove("unsaved");
    event.preventDefault();
    file.renderAsHtml().then((c) => updateContent(c));
  });
}
