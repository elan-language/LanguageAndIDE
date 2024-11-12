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
const mergeButton = document.getElementById("merge") as HTMLButtonElement;
const saveButton = document.getElementById("save") as HTMLButtonElement;
const codeTitle = document.getElementById("code-title") as HTMLDivElement;
const parse = document.getElementById("parse") as HTMLDivElement;
const compile = document.getElementById("compile") as HTMLDivElement;
const test = document.getElementById("test") as HTMLDivElement;
const runStatus = document.getElementById("run-status") as HTMLDivElement;
const codeControls = document.getElementById("code-controls") as HTMLDivElement;
const demoFiles = document.getElementsByClassName("demo-file");

let file: File;
let doOnce = true;
let profile: Profile;

const elanInputOutput = new WebInputOutput(consoleDiv, graphicsDiv);

function setup(p: Profile) {
  profile = p;
  file = new FileImpl(hash, profile, transforms());
  displayFile();
}

function renderAsHtml() {
  file.renderAsHtml().then(
    (c) => updateContent(c),
    (e) => showError(e as Error, file.fileName, false),
  );
}

function clearDisplays() {
  elanInputOutput.clearConsole();
  elanInputOutput.clearGraphics();
}

function resetFile(reset: boolean) {
  clearDisplays();
  if (reset) {
    file = new FileImpl(hash, profile, transforms());
    renderAsHtml();
  }
}

function showError(err: Error, fileName: string, reset: boolean) {
  if (reset) {
    resetFile(true);
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

fetchProfile()
  .then((p) => setup(p))
  .catch((e) => {
    console.warn("profile not found - using default");
    setup(new DefaultProfile());
  });

function refreshAndDisplay(compileIfParsed?: boolean) {
  getTestRunner(system, stdlib).then((t) => {
    file.refreshAllStatuses(t, compileIfParsed).then(
      () => renderAsHtml(),
      (e) => showError(e as Error, file.fileName, false),
    );
  });
}

function initialDisplay() {
  clearDisplays();

  const ps = file.readParseStatus();
  if (ps === ParseStatus.valid || ps === ParseStatus.default) {
    refreshAndDisplay();
  } else {
    const msg = file.parseError || "Failed load code";
    showError(new Error(msg), file.fileName, true);
  }
}

function displayFile() {
  const previousCode = localStorage.getItem("elan-code");
  const previousFileName = localStorage.getItem("elan-file");
  if (previousCode) {
    const code = new CodeSourceFromString(previousCode);
    file.parseFrom(code).then(
      () => {
        file.fileName = previousFileName || file.defaultFileName;
        initialDisplay();
      },
      (e) => showError(e, previousFileName || file.defaultFileName, true),
    );
  } else {
    initialDisplay();
  }
}

function getModKey(e: KeyboardEvent | MouseEvent) {
  return { control: e.ctrlKey, shift: e.shiftKey, alt: e.altKey };
}

function updateDisplayValues() {
  codeTitle.innerText = `File: ${file.fileName}`;
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
    enable(stopButton);
    //enable(pauseButton);
    const msg = "Program is running";
    disable(loadButton, msg);
    disable(mergeButton, msg);
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
    enable(mergeButton, "Merge code from a file");
    enable(newButton, "Clear the current code and start anew");
    enable(demosButton, "Load a demonstration program");
    enable(trimButton);
    enable(expandCollapseButton);

    for (const elem of demoFiles) {
      elem.removeAttribute("hidden");
    }

    if (isEmpty) {
      disable(saveButton, "Some code must be added in order to save");
    } else if (!isParsing) {
      disable(saveButton, "Code must be parsing in order to save");
    } else {
      enable(saveButton, "Save code as file to the Download directory");
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
    showError(err, file.fileName, false);
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
    file.renderAsSource().then((code) => {
      localStorage.setItem("elan-code", code);
      localStorage.setItem("elan-file", file.fileName);
      saveButton.classList.add("unsaved");
    });
  }

  updateDisplayValues();

  const dbgFocused = document.querySelectorAll(".focused");

  // debug check
  if (dbgFocused.length > 1) {
    let msg = "multiple focused ";
    dbgFocused.forEach((n) => (msg = `${msg}, Node: ${(n.nodeName, n.id)} `));
    showError(new Error(msg), file.fileName, false);
  }
  document.body.style.cursor = "default";
}

let inactivityTimer: any | undefined = undefined;
const inactivityTimeout = 2000;

function inactivityRefresh() {
  if (
    file.readRunStatus() !== RunStatus.running &&
    file.readParseStatus() === ParseStatus.valid &&
    file.readCompileStatus() === CompileStatus.default
  ) {
    refreshAndDisplay(true);
  }

  inactivityTimer = setTimeout(inactivityRefresh, inactivityTimeout);
}

function postMessage(e: editorEvent) {
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
          refreshAndDisplay();
        } else {
          renderAsHtml();
        }
        return;
      case "dblclick":
        isBeingEdited = file.getFieldBeingEdited(); //peek at value as may be changed
        if (handleDblClick(e, file) && isBeingEdited) {
          refreshAndDisplay();
        } else {
          renderAsHtml();
        }
        return;
      case "key":
        const codeChanged = handleKey(e, file);
        if (codeChanged === true) {
          refreshAndDisplay();
        } else if (codeChanged === false) {
          renderAsHtml();
        }
        // undefined just return
        return;
    }
  } catch (e) {
    showError(e as Error, file.fileName, false);
  }
}

const stdlib = new StdLib();
const system = stdlib.system;
system.stdlib = stdlib; // to allow injection

trimButton.addEventListener("click", () => {
  const keys = file.removeAllSelectorsThatCanBe();
  renderAsHtml();
});

let programWorker: Worker;

function readMsg(value: string | [string, string]) {
  return { type: "read", value: value } as WebWorkerReadMessage;
}

function errorMsg(value: string | [string, string]) {
  return { type: "status", status: "error", error: value } as WebWorkerStatusMessage;
}

function handleWorkerIO(data: WebWorkerWriteMessage) {
  switch (data.function) {
    case "readLine":
      elanInputOutput.readLine().then((v) => programWorker.postMessage(readMsg(v)));
      break;
    case "getKeystroke":
      elanInputOutput.getKeystroke().then((v) => programWorker.postMessage(readMsg(v)));
      break;
    case "getKeystrokeWithModifier":
      elanInputOutput.getKeystrokeWithModifier().then((v) => programWorker.postMessage(readMsg(v)));
      break;
    case "readFile":
      elanInputOutput.readFile().then(
        (v) => programWorker.postMessage(readMsg(v)),
        (e) => programWorker.postMessage(errorMsg(e)),
      );

      break;
    case "writeFile":
      elanInputOutput.writeFile(data.parameters[0] as string, data.parameters[1] as string).then(
        () => programWorker.postMessage(readMsg("")),
        (e) => programWorker.postMessage(errorMsg(e)),
      );
      break;
    default:
      (elanInputOutput as any)[data.function](...data.parameters);
  }
}

function handleWorkerFinished() {
  programWorker.terminate();
  console.info("elan program completed OK");
  file.setRunStatus(RunStatus.default);
  updateDisplayValues();
}

function handleWorkerError(data: WebWorkerStatusMessage) {
  programWorker.terminate();
  const e = data.error;
  const err = e instanceof ElanRuntimeError ? e : new ElanRuntimeError(e as any);
  showError(err, file.fileName, false);
  file.setRunStatus(RunStatus.error);
  updateDisplayValues();
}

runButton?.addEventListener("click", () => {
  try {
    clearDisplays();
    file.setRunStatus(RunStatus.running);
    updateDisplayValues();
    const path = `${document.location.origin}${document.location.pathname}`.replace(
      "/index.html",
      "",
    );
    const jsCode = file.compileAsWorker(path);
    const asUrl = "data:text/javascript;base64," + btoa(jsCode);

    programWorker = new Worker(asUrl, { type: "module" });

    programWorker.onmessage = (e: MessageEvent<WebWorkerMessage>) => {
      const data = e.data;

      switch (data.type) {
        case "write":
          handleWorkerIO(data);
          break;
        case "status":
          switch (data.status) {
            case "finished":
              handleWorkerFinished();
              break;
            case "error":
              handleWorkerError(data);
              break;
          }
      }
    };

    programWorker.onerror = (ev: ErrorEvent) => {
      const err = new ElanRuntimeError(ev.message);
      showError(err, file.fileName, false);
      file.setRunStatus(RunStatus.error);
      updateDisplayValues();
    };

    programWorker.postMessage({ type: "start" } as WebWorkerMessage);
  } catch (e) {
    console.warn(e);
    file.setRunStatus(RunStatus.error);
    updateDisplayValues();
  }
});

stopButton?.addEventListener("click", () => {
  programWorker?.terminate();
  file.setRunStatus(RunStatus.default);
  updateDisplayValues();
});

clearConsoleButton?.addEventListener("click", () => {
  elanInputOutput.clearConsole();
});

clearGraphicsButton?.addEventListener("click", () => {
  elanInputOutput.clearGraphics();
});

expandCollapseButton?.addEventListener("click", () => {
  file.expandCollapseAll();
  renderAsHtml();
});

newButton?.addEventListener("click", () => {
  resetFile(true);
});

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

loadButton.addEventListener("click", chooser(handleUpload));

function handleUpload(event: Event) {
  const elanFile = (event.target as any).files?.[0] as any;

  if (elanFile) {
    const fileName = elanFile.name;
    document.body.style.cursor = "wait";
    clearDisplays();
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      const rawCode = event.target.result;
      const code = new CodeSourceFromString(rawCode);
      file = new FileImpl(hash, profile, transforms());
      file.fileName = fileName;
      file.parseFrom(code).then(
        () => initialDisplay(),
        (e) => showError(e, fileName, true),
      );
    });
    reader.readAsText(elanFile);
  }

  event.preventDefault();
}

mergeButton.addEventListener("click", chooser(handleMerge));

function handleMerge(event: Event) {
  const elanFile = (event.target as any).files?.[0] as any;

  if (elanFile) {
    const fileName = elanFile.name;
    document.body.style.cursor = "wait";
    clearDisplays();
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      const rawCode = event.target.result;
      const code = new CodeSourceFromString(rawCode);

      file.parseFrom(code, true).then(
        () => initialDisplay(),
        (e) => showError(e, fileName, true),
      );
    });
    reader.readAsText(elanFile);
  }

  event.preventDefault();
}

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
    saveButton.classList.remove("unsaved");
    event.preventDefault();
    renderAsHtml();
  });
}

saveButton.addEventListener("click", handleDownload);

for (const elem of demoFiles) {
  elem.addEventListener("click", () => {
    const fileName = `${elem.id}`;
    return fetch(fileName, { mode: "same-origin" })
      .then((f) => f.text())
      .then((rawCode) => {
        const code = new CodeSourceFromString(rawCode);
        file = new FileImpl(hash, profile, transforms());
        file.fileName = fileName;
        file.parseFrom(code).then(
          () => initialDisplay(),
          (e) => showError(e, fileName, true),
        );
      });
  });
}
