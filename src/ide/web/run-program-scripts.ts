/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  WebWorkerBreakpointMessage,
  WebWorkerMessage,
  WebWorkerReadMessage,
  WebWorkerStatusMessage,
  WebWorkerWriteMessage,
} from "./web-worker-messages";
import { File } from "../frames/frame-interfaces/file";
import { RunStatus } from "../frames/status-enums";
import { WebInputOutput } from "./web-input-output";
import { DebugSymbol } from "../../compiler/compiler-interfaces/debug-symbol";
import { IIDEViewModel } from "./ui-helpers";

export function readMsg(value: string | [string, string]) {
  return { type: "read", value: value } as WebWorkerReadMessage;
}

export function errorMsg(value: unknown) {
  return { type: "status", status: "error", error: value } as WebWorkerStatusMessage;
}

export function clearPaused() {
  const pausedAt = document.getElementsByClassName("paused-at");

  for (const e of pausedAt) {
    e.classList.remove("paused-at");
  }
}

export function resumeProgram(file: File, singleStepping: boolean, runWorker: Worker) {
  if (singleStepping) {
    runWorker.postMessage({ type: "pause" } as WebWorkerMessage);
  }

  runWorker.postMessage({ type: "resume" } as WebWorkerMessage);

  clearPaused();
  file.setRunStatus(RunStatus.running);
}

export async function handleWorkerIO(
  file: File,
  data: WebWorkerWriteMessage,
  runWorker: Worker | undefined,
  elanInputOutput: WebInputOutput,
  vm: IIDEViewModel,
) {
  switch (data.function) {
    case "readLine":
      vm.setPauseButtonState(true);
      vm.togggleInputStatus(RunStatus.input);
      const line = await elanInputOutput.readLine();
      // program may have been stopped so check state
      const rs = file.readRunStatus();
      if (rs === RunStatus.input) {
        vm.togggleInputStatus(RunStatus.running);
      }
      vm.setPauseButtonState(false);
      runWorker?.postMessage(readMsg(line));
      break;
    case "waitForAnyKey":
      await elanInputOutput.waitForAnyKey();
      runWorker?.postMessage(readMsg(""));
      break;
    case "waitForKey":
      const wkey = await elanInputOutput.waitForKey();
      runWorker?.postMessage(readMsg(wkey));
      break;
    case "getKey":
      const key = await elanInputOutput.getKey();
      runWorker?.postMessage(readMsg(key));
      break;
    case "getKeyWithModifier":
      const keyWithMod = await elanInputOutput.getKeyWithModifier();
      runWorker?.postMessage(readMsg(keyWithMod));
      break;
    case "readFile":
      try {
        const file = await elanInputOutput.readFile();
        runWorker?.postMessage(readMsg(file));
      } catch (e) {
        runWorker?.postMessage(errorMsg(e));
      }
      break;
    case "writeFile":
      try {
        await elanInputOutput.writeFile(data.parameters[0] as string, data.parameters[1] as string);
        runWorker?.postMessage(readMsg(""));
      } catch (e) {
        runWorker?.postMessage(errorMsg(e));
      }
      break;
    default:
      try {
        await (elanInputOutput as any)[data.function](...data.parameters);
        runWorker?.postMessage(readMsg(""));
      } catch (e) {
        runWorker?.postMessage(errorMsg(e));
      }
      break;
  }
}

export function getSummaryHtml(content: string) {
  return `<div class="summary" tabindex="0">${content}</div>`;
}

export function getDebugHtml(content1: string, content2: string) {
  return `<div class="expandable">${getSummaryHtml(content1)}<div class="detail">${content2}</div></div>`;
}

function getDebugSymbolList(
  name: string | string[],
  nameType: string,
  value: [],
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
) {
  const type = typeMap["Type"];
  const summary = getSummary(type, value.length, simpleId(name, asIndex, nameType));
  const items = value.map((item, i) =>
    getDebugSymbolHtml(`${i}`, "Int", item, typeMap["OfTypes"], true),
  );
  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function getDebugSymbolTuple(
  name: string | string[],
  nameType: string,
  value: [],
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
) {
  const type = typeMap["Type"];
  const summary = getSummary(type, "", simpleId(name, asIndex, nameType));
  const items = value.map((item, i) => {
    const itemId = `item${i}`;
    return getDebugSymbolHtml(itemId, "", item, typeMap["OfTypes"][i], false);
  });
  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function getDebugItemHtml2D(index: number, value: [], typeMap: { [index: string]: any }): string {
  const list = value;
  const summary = getSummary("", "", simpleId([`${index}`, "_"], true, "Int"));
  const items = list.map((item, subindex) =>
    getDebugSymbolHtml([`${index}`, `${subindex}`], "Int", item, typeMap["OfTypes"]),
  );
  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function getDebugSymbolArray2D(
  name: string | string[],
  nameType: string,
  value: [[]],
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
) {
  const type = typeMap["Type"];
  const cols = value.length;
  const rows = value[0].length;
  const size = ` <el-comment># size ${cols} x ${rows}</el-comment>`;
  const summary = getSummary(type, size, simpleId(name, asIndex, nameType));
  const items = value.map((item, index) => getDebugItemHtml2D(index, item, typeMap));
  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function getDebugSymbolDictionary(
  name: string | string[],
  nameType: string,
  value: { [index: string]: any },
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
) {
  const type = typeMap["Type"];
  const keyType = typeMap["KeyType"]["Type"];
  const valueType = typeMap["ValueType"];
  const keys = Object.keys(value);
  const summary = getSummary(type, keys.length, simpleId(name, asIndex, nameType));

  const items = keys.map((k) =>
    getDebugSymbolHtml(k, keyType, safeIndex(k, value), valueType, true),
  );

  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function safeIndex(key: string, toIndex: { [index: string]: any }) {
  if (Object.keys(toIndex).includes(key)) {
    return toIndex[key];
  }
  return "";
}

function getDebugSymbolClass(
  name: string | string[],
  nameType: string,
  value: { [index: string]: any },
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
) {
  const type = typeMap["Type"];
  const properties = typeMap["Properties"];
  const summary = getSummary(type, "", simpleId(name, asIndex, nameType));
  let items: string[];

  if (properties) {
    const keys = Object.keys(properties);

    items =
      keys.length > 0
        ? keys.map((k) =>
            getDebugSymbolHtml(k, "", safeIndex(k, value), safeIndex(k, properties), false),
          )
        : [getSummaryHtml("<el-comment># no public properties</el-comment>")];
  } else {
    items = [
      getSummaryHtml("<el-comment># details of this instance are not available</el-comment>"),
    ];
  }

  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function lengthHtml(l: number) {
  return ` <el-comment># length ${l}</el-comment>`;
}

function getSummary(type: string, lenOrAsString: number | string, formattedId: string): string {
  const suffix = typeof lenOrAsString === "number" ? lengthHtml(lenOrAsString) : lenOrAsString;
  return `${formattedId} ${formatType(type)}${suffix}`;
}

function formatFloat(value: number | string) {
  const asString = `${value}`;
  return asString.includes(".") ? asString : `${value}.0`;
}

function simpleId(id: string | string[], asIndex: boolean, type: string): string {
  if (Array.isArray(id)) {
    // 2d array int index
    const secondIndex = id[1] === "_" ? id[1] : `<el-lit>${id[1]}</el-lit>`;

    return `[<el-lit>${id[0]}</el-lit>, ${secondIndex}]`;
  }
  const quot = asIndex && type === "String" ? `"` : "";
  id = asIndex && type === "Float" ? formatFloat(id) : id;
  return asIndex ? `[${quot}<el-lit>${id}</el-lit>${quot}]` : `<el-id>${id}</el-id>`;
}

function simpleValue(value: number | string, type: string): string {
  if (type === "String") {
    value = `${value}`.replaceAll(">", "&gt;").replaceAll("<", "&lt;");
    return `"<el-lit>${value}</el-lit>"`;
  } else if (type === "Float") {
    const fl = formatFloat(value);
    return `<el-lit>${fl}</el-lit>`;
  }

  return `<el-lit>${value}</el-lit>`;
}

function formatType(type: string) {
  type = type
    .replaceAll(">", "&gt;")
    .replaceAll("<", "&lt;")
    .replaceAll("&lt;of ", "&lt;<el-kw>of</el-kw> ")
    .replaceAll(/([A-Za-z0-9_]{3,})/g, `<el-type>$1</el-type>`);
  return type;
}

function getDebugSymbolString(
  name: string | string[],
  nameType: string,
  fullString: string,
  asIndex: boolean = false,
) {
  const toTruncate = 10;
  const len = fullString.length;
  const suffix = lengthHtml(len);
  const prefix = simpleId(name, asIndex, nameType);

  if (len <= toTruncate) {
    return getSummaryHtml(`${prefix} ${simpleValue(fullString, "String")}`);
  }

  const shortString = `${simpleValue(fullString.slice(0, toTruncate), "String")}...`;
  return getDebugHtml(`${prefix} ${shortString}${suffix}`, `${simpleValue(fullString, "String")}`);
}

function getDebugSymbolSimple(
  name: string | string[],
  nameType: string,
  value: string,
  type: string,
  asIndex: boolean = false,
) {
  return getSummaryHtml(`${simpleId(name, asIndex, nameType)} ${simpleValue(value, type)}`);
}

function getDebugSymbolEnum(
  name: string | string[],
  nameType: string,
  type: string,
  value: string,
  asIndex: boolean = false,
) {
  return getSummaryHtml(
    `${simpleId(name, asIndex, nameType)} <el-type>${type}</el-type>.<el-id>${value}</el-id>`,
  );
}

function getDebugSymbolHtml(
  name: string | string[],
  nameType: string,
  value: any,
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
): string {
  let rootType = typeMap["Type"] as string;
  const indexOfLt = rootType.indexOf("<");
  if (indexOfLt > 0) {
    rootType = rootType.slice(0, indexOfLt);
  }
  const indexOfBracket = rootType.indexOf("(");
  if (indexOfBracket > 0) {
    rootType = rootType.slice(0, indexOfBracket);
  }

  switch (rootType) {
    case "Boolean":
    case "RegExp":
    case "Int":
    case "Float":
      return getDebugSymbolSimple(name, nameType, value, rootType, asIndex);
    case "Enum":
      return getDebugSymbolEnum(name, nameType, typeMap["OfTypes"]["Type"], value, asIndex);
    case "String":
      return getDebugSymbolString(name, nameType, value, asIndex);
    case "List":
    case "ListImmutable":
    case "Array":
      return getDebugSymbolList(name, nameType, value, typeMap, asIndex);
    case "Dictionary":
    case "DictionaryImmutable":
      return getDebugSymbolDictionary(name, nameType, value, typeMap, asIndex);
    case "Array2D":
      return getDebugSymbolArray2D(name, nameType, value, typeMap, asIndex);
    case "tuple":
      return getDebugSymbolTuple(name, nameType, value, typeMap, asIndex);
    case "Deconstructed":
      return getDebugSymbolHtml(name, nameType, value, typeMap["Ids"][name as string], asIndex);
    default:
      return getDebugSymbolClass(name, nameType, value, typeMap, asIndex);
  }
}

export function getDebugSymbol(s: DebugSymbol) {
  const typeMap = JSON.parse(s.typeMap);
  return getDebugSymbolHtml(s.name, "", s.value, typeMap);
}

export function handleRunWorkerPaused(data: WebWorkerBreakpointMessage): DebugSymbol[] | string {
  const variables = data.value;
  if (variables.length > 0) {
    return variables;
  } else {
    return `No values defined at this point - proceed to the next instruction`;
  }
}
