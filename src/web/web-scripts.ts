/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleClick, handleDblClick, handleKey } from "../editorHandlers";
import { ElanRuntimeError } from "../elan-runtime-error";
import { DefaultProfile } from "../frames/default-profile";
import { CodeSourceFromString, FileImpl, cannotLoadFile } from "../frames/file-impl";
import { editorEvent } from "../frames/interfaces/editor-event";
import { File } from "../frames/interfaces/file";
import { Profile } from "../frames/interfaces/profile";
import { CompileStatus, ParseStatus, RunStatus } from "../frames/status-enums";
import { getTestRunner } from "../runner";
import { StdLib } from "../standard-library/std-lib";
import { fetchProfile, hash, transforms } from "./web-helpers";
import { WebInputOutput } from "./web-input-output";
import {
  WebWorkerMessage,
  WebWorkerReadMessage,
  WebWorkerStatusMessage,
  WebWorkerWriteMessage,
} from "./web-worker-messages";

// static html elements
const codeContainer = document.querySelector(".elan-code");
const runButton = document.getElementById("run-button") as HTMLButtonElement;
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const pauseButton = document.getElementById("pause") as HTMLButtonElement;
const clearConsoleButton = document.getElementById("clear-console") as HTMLButtonElement;
const clearGraphicsButton = document.getElementById("clear-graphics") as HTMLButtonElement;
const expandCollapseButton = document.getElementById("expand-collapse") as HTMLButtonElement;
const newButton = document.getElementById("new") as HTMLButtonElement;
const demosButton = document.getElementById("demos") as HTMLButtonElement;
const trimButton = document.getElementById("trim") as HTMLButtonElement;
const consoleDiv = document.getElementById("console") as HTMLDivElement;
const graphicsDiv = document.getElementById("graphics") as HTMLDivElement;
const loadButton = document.getElementById("load") as HTMLButtonElement;
const appendButton = document.getElementById("append") as HTMLButtonElement;
const saveButton = document.getElementById("save") as HTMLButtonElement;
const codeTitle = document.getElementById("code-title") as HTMLDivElement;
const parse = document.getElementById("parse") as HTMLDivElement;
const compile = document.getElementById("compile") as HTMLDivElement;
const test = document.getElementById("test") as HTMLDivElement;
const runStatus = document.getElementById("run-status") as HTMLDivElement;
const codeControls = document.getElementById("code-controls") as HTMLDivElement;
const demoFiles = document.getElementsByClassName("demo-file");

const inactivityTimeout = 2000;
const stdlib = new StdLib();
const system = stdlib.system;
system.stdlib = stdlib; // to allow injection

const elanInputOutput = new WebInputOutput(consoleDiv, graphicsDiv);

let file: File;
let doOnce = true;
let profile: Profile;
let lastSavedHash = "";
let programWorker: Worker;
let inactivityTimer: any | undefined = undefined;

// add all the listeners

trimButton.addEventListener("click", async () => {
  file.removeAllSelectorsThatCanBe();
  await renderAsHtml();
});

runButton?.addEventListener("click", async () => {
  try {
    clearDisplays();
    file.setRunStatus(RunStatus.running);
    await updateDisplayValues();
    const path = `${document.location.origin}${document.location.pathname}`.replace(
      "/index.html",
      "",
    );
    const jsCode = file.compileAsWorker(path);
    const asUrl = "data:text/javascript;base64," + btoa(jsCode);

    programWorker = new Worker(asUrl, { type: "module" });

    programWorker.onmessage = async (e: MessageEvent<WebWorkerMessage>) => {
      const data = e.data;

      switch (data.type) {
        case "write":
          await handleWorkerIO(data);
          break;
        case "status":
          switch (data.status) {
            case "finished":
              await handleWorkerFinished();
              break;
            case "error":
              await handleWorkerError(data);
              break;
          }
      }
    };

    programWorker.onerror = async (ev: ErrorEvent) => {
      const err = new ElanRuntimeError(ev.message);
      await showError(err, file.fileName, false);
      file.setRunStatus(RunStatus.error);
      await updateDisplayValues();
    };

    programWorker.postMessage({ type: "start" } as WebWorkerMessage);
  } catch (e) {
    console.warn(e);
    file.setRunStatus(RunStatus.error);
    await updateDisplayValues();
  }
});

stopButton?.addEventListener("click", async () => {
  programWorker?.terminate();
  file.setRunStatus(RunStatus.default);
  await updateDisplayValues();
});

clearConsoleButton?.addEventListener("click", () => {
  elanInputOutput.clearConsole();
});

clearGraphicsButton?.addEventListener("click", () => {
  elanInputOutput.clearGraphics();
});

expandCollapseButton?.addEventListener("click", async () => {
  file.expandCollapseAll();
  await renderAsHtml();
});

newButton?.addEventListener("click", async () => {
  clearDisplays();
  await resetFile();
});

loadButton.addEventListener("click", chooser(handleUpload));

appendButton.addEventListener("click", chooser(handleAppend));

saveButton.addEventListener("click", handleDownload);

for (const elem of demoFiles) {
  elem.addEventListener("click", async () => {
    const fileName = `${elem.id}`;
    const f = await fetch(fileName, { mode: "same-origin" });
    const rawCode = await f.text();
    const code = new CodeSourceFromString(rawCode);
    file = new FileImpl(hash, profile, transforms());
    file.fileName = fileName;
    try {
      await file.parseFrom(code);
      await initialDisplay(true);
    } catch (e) {
      await showError(e as Error, fileName, true);
    }
  });
}

// fetch profile triggers page display
fetchProfile()
  .then(async (p) => await setup(p))
  .catch(async (e) => {
    console.warn("profile not found - using default");
    await setup(new DefaultProfile());
  });

async function setup(p: Profile) {
  profile = p;
  file = new FileImpl(hash, profile, transforms());
  await displayFile();
}

async function renderAsHtml() {
  const content = await file.renderAsHtml();
  try {
    await updateContent(content);
  } catch (e) {
    await showError(e as Error, file.fileName, false);
  }
}

function clearDisplays() {
  elanInputOutput.clearConsole();
  elanInputOutput.clearGraphics();
}

async function resetFile() {
  file = new FileImpl(hash, profile, transforms());
  await renderAsHtml();
}

async function showError(err: Error, fileName: string, reset: boolean) {
  clearDisplays();
  if (reset) {
    await resetFile();
  }

  file.fileName = fileName;

  if (err.message === cannotLoadFile) {
    elanInputOutput.printLine(err.message);
  } else if (err.stack) {
    let msg = "";
    let stack = "";
    if (err instanceof ElanRuntimeError) {
      msg = "A Runtime error occured in the Elan code";
      stack = err.elanStack;
    } else {
      msg =
        "An unexpected error has occurred; please email whole-screen snapshot to rpawson@nakedobjects.org\nTo continue, try clicking the Refresh icon on the browser.";
      stack = err.stack;
    }
    elanInputOutput.printLine(msg);
    elanInputOutput.printLine(stack);
  } else {
    elanInputOutput.printLine(err.message ?? "Unknown error parsing file");
  }
  document.body.style.cursor = "default";
}

async function refreshAndDisplay(compileIfParsed?: boolean) {
  const testRunner = await getTestRunner(system, stdlib);
  await file.refreshAllStatuses(testRunner, compileIfParsed);
  try {
    await renderAsHtml();
  } catch (e) {
    await showError(e as Error, file.fileName, false);
  }
}

async function initialDisplay(reset: boolean) {
  clearDisplays();

  const ps = file.readParseStatus();
  if (ps === ParseStatus.valid || ps === ParseStatus.default) {
    await refreshAndDisplay();
    lastSavedHash = file.currentHash;
    updateNameAndSavedStatus();
  } else {
    const msg = file.parseError || "Failed load code";
    await showError(new Error(msg), file.fileName, reset);
  }
}

async function displayFile() {
  const previousCode = localStorage.getItem("elan-code");
  const previousFileName = localStorage.getItem("elan-file");
  if (previousCode) {
    const code = new CodeSourceFromString(previousCode);
    try {
      await file.parseFrom(code);
      file.fileName = previousFileName || file.defaultFileName;
      await initialDisplay(true);
    } catch (e) {
      await showError(e as Error, previousFileName || file.defaultFileName, true);
    }
  } else {
    await initialDisplay(true);
  }
}

function getModKey(e: KeyboardEvent | MouseEvent) {
  return { control: e.ctrlKey, shift: e.shiftKey, alt: e.altKey };
}

function updateNameAndSavedStatus() {
  const unsaved = lastSavedHash === file.currentHash ? "" : " UNSAVED";
  codeTitle.innerText = `File: ${file.fileName}${unsaved}`;
}

async function updateDisplayValues() {
  updateNameAndSavedStatus();
  parse.setAttribute("class", file.readParseStatusForDashboard());
  compile.setAttribute("class", file.readCompileStatusForDashboard());
  test.setAttribute("class", file.readTestStatusForDashboard());
  //Display run status
  runStatus.setAttribute("class", file.readRunStatusForDashboard());

  // Button control
  const isEmpty = file.readParseStatus() === ParseStatus.default;
  const isParsing = file.readParseStatus() === ParseStatus.valid;
  const isCompiling = file.readCompileStatus() === CompileStatus.ok;
  const isRunning = file.readRunStatus() === RunStatus.running;

  if (isRunning) {
    disable(runButton, "Program is already running");
    enable(stopButton, "Stop the program");
    const msg = "Program is running";
    disable(loadButton, msg);
    disable(appendButton, msg);
    disable(saveButton, msg);
    disable(newButton, msg);
    disable(demosButton, msg);
    disable(trimButton, msg);
    disable(expandCollapseButton, msg);
    for (const elem of demoFiles) {
      elem.setAttribute("hidden", "");
    }
  } else {
    const msg = "Program is not running";
    disable(stopButton, msg);
    //disable(pauseButton, msg);

    enable(loadButton, "Load code from a file");
    enable(appendButton, "Append code from a file onto the end of the existing code");
    enable(newButton, "Clear the current code and start afresh");
    enable(demosButton, "Load a demonstration program");
    enable(trimButton, "Remove all 'newCode' selectors that can be removed");
    enable(expandCollapseButton, "Expand / Collapse all code regions");

    for (const elem of demoFiles) {
      elem.removeAttribute("hidden");
    }

    if (isEmpty) {
      disable(saveButton, "Some code must be added in order to save");
    } else if (!isParsing) {
      disable(saveButton, "Code must be parsing in order to save");
    } else {
      enable(saveButton, "Save the code into a file");
    }

    if (!file.containsMain()) {
      disable(runButton, "Code must have a 'main' routine to be run");
    } else if (!isCompiling) {
      disable(
        runButton,
        "Program is not yet compiled. If you have just edited a field, press Enter or Tab to complete.",
      );
    } else {
      enable(runButton, "Run the program");
    }
  }

  const testErr = file.getTestError();
  if (testErr) {
    const err = testErr instanceof ElanRuntimeError ? testErr : new ElanRuntimeError(testErr);
    await showError(err, file.fileName, false);
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
async function updateContent(text: string) {
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

  if (document.querySelector(".autocomplete-popup")) {
    const items = document.querySelectorAll(".autocomplete-item");

    for (const item of items) {
      item.addEventListener("click", (event) => {
        const ke = event as PointerEvent;
        const tgt = ke.target as HTMLDivElement;
        const id = tgt.dataset.id;
        const msg: editorEvent = {
          type: "key",
          target: "frame",
          key: "Enter",
          id: id,
          modKey: getModKey(ke),
          autocomplete: tgt.innerText,
        };
        postMessage(msg);
        event.preventDefault();
        event.stopPropagation();
      });
    }
  }

  if (file.readParseStatus() === ParseStatus.valid) {
    // save to local store
    const code = await file.renderAsSource();

    localStorage.setItem("elan-code", code);
    localStorage.setItem("elan-file", file.fileName);
    saveButton.classList.add("unsaved");
  }

  await updateDisplayValues();

  const dbgFocused = document.querySelectorAll(".focused");

  // debug check
  if (dbgFocused.length > 1) {
    let msg = "multiple focused ";
    dbgFocused.forEach((n) => (msg = `${msg}, Node: ${(n.nodeName, n.id)} `));
    await showError(new Error(msg), file.fileName, false);
  }
  document.body.style.cursor = "default";
}

async function inactivityRefresh() {
  if (
    file.readRunStatus() !== RunStatus.running &&
    file.readParseStatus() === ParseStatus.valid &&
    file.readCompileStatus() === CompileStatus.default
  ) {
    await refreshAndDisplay(true);
  }

  inactivityTimer = setTimeout(inactivityRefresh, inactivityTimeout);
}

async function postMessage(e: editorEvent) {
  if (file.readRunStatus() === RunStatus.running) {
    // no change while running
    return;
  }

  clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(inactivityRefresh, inactivityTimeout);

  try {
    let isBeingEdited = false;
    switch (e.type) {
      case "click":
        isBeingEdited = file.getFieldBeingEdited(); //peek at value as may be changed
        if (handleClick(e, file) && isBeingEdited) {
          await refreshAndDisplay();
        } else {
          await renderAsHtml();
        }
        return;
      case "dblclick":
        isBeingEdited = file.getFieldBeingEdited(); //peek at value as may be changed
        if (handleDblClick(e, file) && isBeingEdited) {
          await refreshAndDisplay();
        } else {
          await renderAsHtml();
        }
        return;
      case "key":
        const codeChanged = handleKey(e, file);
        if (codeChanged === true) {
          await refreshAndDisplay();
        } else if (codeChanged === false) {
          await renderAsHtml();
        }
        // undefined just return
        return;
    }
  } catch (e) {
    await showError(e as Error, file.fileName, false);
  }
}

function readMsg(value: string | [string, string]) {
  return { type: "read", value: value } as WebWorkerReadMessage;
}

function errorMsg(value: unknown) {
  return { type: "status", status: "error", error: value } as WebWorkerStatusMessage;
}

async function handleWorkerIO(data: WebWorkerWriteMessage) {
  switch (data.function) {
    case "readLine":
      const line = await elanInputOutput.readLine();
      programWorker.postMessage(readMsg(line));
      break;
    case "waitForAnyKey":
      await elanInputOutput.waitForAnyKey();
      programWorker.postMessage(readMsg(""));
      break;
    case "getKey":
      const key = await elanInputOutput.getKey();
      programWorker.postMessage(readMsg(key));
      break;
    case "getKeyWithModifier":
      const keyWithMod = await elanInputOutput.getKeyWithModifier();
      programWorker.postMessage(readMsg(keyWithMod));
      break;
    case "readFile":
      try {
        const file = await elanInputOutput.readFile();
        programWorker.postMessage(readMsg(file));
      } catch (e) {
        programWorker.postMessage(errorMsg(e));
      }
      break;
    case "writeFile":
      try {
        await elanInputOutput.writeFile(data.parameters[0] as string, data.parameters[1] as string);
        programWorker.postMessage(readMsg(""));
      } catch (e) {
        programWorker.postMessage(errorMsg(e));
      }
      break;
    default:
      (elanInputOutput as any)[data.function](...data.parameters);
  }
}

async function handleWorkerFinished() {
  programWorker.terminate();
  console.info("elan program completed OK");
  file.setRunStatus(RunStatus.default);
  await updateDisplayValues();
}

async function handleWorkerError(data: WebWorkerStatusMessage) {
  programWorker.terminate();
  const e = data.error;
  const err = e instanceof ElanRuntimeError ? e : new ElanRuntimeError(e as any);
  await showError(err, file.fileName, false);
  file.setRunStatus(RunStatus.error);
  await updateDisplayValues();
}

function chooser(uploader: (event: Event) => void) {
  return () => {
    const f = document.createElement("input");
    f.style.display = "none";
    f.type = "file";
    f.name = "file";
    f.accept = ".elan";
    codeControls.appendChild(f);
    f.addEventListener("change", uploader);
    f.click();
  };
}

function handleUpload(event: Event) {
  const elanFile = (event.target as any).files?.[0] as any;

  if (elanFile) {
    const fileName = elanFile.name;
    document.body.style.cursor = "wait";
    clearDisplays();
    const reader = new FileReader();
    reader.addEventListener("load", async (event: any) => {
      const rawCode = event.target.result;
      const code = new CodeSourceFromString(rawCode);
      file = new FileImpl(hash, profile, transforms());
      file.fileName = fileName;
      try {
        await file.parseFrom(code);
        await initialDisplay(true);
      } catch (e) {
        await showError(e as Error, fileName, true);
      }
    });
    reader.readAsText(elanFile);
  }

  event.preventDefault();
}

function handleAppend(event: Event) {
  const elanFile = (event.target as any).files?.[0] as any;

  if (elanFile) {
    const fileName = elanFile.name;
    document.body.style.cursor = "wait";
    clearDisplays();
    const reader = new FileReader();
    reader.addEventListener("load", async (event: any) => {
      const rawCode = event.target.result;
      const newCode = new CodeSourceFromString(rawCode);
      try {
        await file.parseFrom(newCode, true);
        await initialDisplay(false);
      } catch (e) {
        await showError(e as Error, fileName, false);
      }
    });
    reader.readAsText(elanFile);
  }

  event.preventDefault();
}

async function handleDownload(event: Event) {
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
  const code = await file.renderAsSource();

  const blob = new Blob([code], { type: "plain/text" });

  const aElement = document.createElement("a");
  aElement.setAttribute("download", fileName!);
  const href = URL.createObjectURL(blob);
  aElement.href = href;
  aElement.setAttribute("target", "_blank");
  aElement.click();
  URL.revokeObjectURL(href);
  saveButton.classList.remove("unsaved");
  lastSavedHash = file.currentHash;
  event.preventDefault();
  await renderAsHtml();
}
