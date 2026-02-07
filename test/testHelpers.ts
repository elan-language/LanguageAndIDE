/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from "assert";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import * as jsdom from "jsdom";
import Worker from 'web-worker';
import { DebugSymbol } from "../src/compiler/compiler-interfaces/debug-symbol";
import { BreakpointStatus } from "../src/compiler/debugging/breakpoint-status";
import { StdLib } from "../src/compiler/standard-library/std-lib";
import { BooleanType } from "../src/compiler/symbols/boolean-type";
import { FloatType } from "../src/compiler/symbols/float-type";
import { IntType } from "../src/compiler/symbols/int-type";
import { StringType } from "../src/compiler/symbols/string-type";
import { UnknownType } from "../src/compiler/symbols/unknown-type";
import { TestStatus } from "../src/compiler/test-status";
import { AbstractFrame } from "../src/ide/frames/abstract-frame";
import { CodeSourceFromString } from "../src/ide/frames/code-source-from-string";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { AbstractField } from "../src/ide/frames/fields/abstract-field";
import { FileImpl } from "../src/ide/frames/file-impl";
import { editorEvent } from "../src/ide/frames/frame-interfaces/editor-event";
import { File } from "../src/ide/frames/frame-interfaces/file";
import { ParseNode } from "../src/ide/frames/frame-interfaces/parse-node";
import { MainFrame } from "../src/ide/frames/globals/main-frame";
import { VariableStatement } from "../src/ide/frames/statements/variable-statement";
import { CompileStatus, ParseStatus } from "../src/ide/frames/status-enums";
import { TokenType } from "../src/ide/frames/symbol-completion-helpers";
import { StubInputOutput } from "../src/ide/stub-input-output";
import { hash } from "../src/ide/util";
import { encodeCode } from "../src/ide/web/web-helpers";
import { WebWorkerMessage } from "../src/ide/web/web-worker-messages";
import { assertParses, transforms } from "./compiler/compiler-test-helpers";
import { getTestSystem } from "./compiler/test-system";
import { getTestRunner } from "./runner";


// flag to update test file
const updateTestFiles = false;

export async function assertEffectOfActionNew(
  sourceFile: string,
  action: (f: FileImpl) => void,
  htmlFile: string,
) {
  const fl = await loadFileAsModelNew(sourceFile);
  const htm = loadFileAsHtmlNew(htmlFile);

  action(fl);

  const rendered = await fl.renderAsHtml();
  const actualHtml = wrap(rendered).replaceAll("\r", "");
  const expectedHtml = htm.replaceAll("\r", "");
  try {
    assert.strictEqual(actualHtml, expectedHtml);
  } catch (e) {
    if (updateTestFiles) {
      // update original not copied 
      htmlFile = htmlFile.replace("out\\", "");
      updateTestFileNew(htmlFile, actualHtml);
      throw new Error("Files updated");
    } else {
      throw e;
    }
  }
}

export async function assertGeneratesHtmlandSameSourceAndExport(sourceFile: string, htmlFile: string) {
  const fl = await loadFileAsModelNew(sourceFile);
  const htm = loadFileAsHtmlNew(htmlFile);

  const renderedSource = await fl.renderAsElanSource();
  const actualSource = renderedSource.replaceAll("\r", "");
  const renderedExport = await fl.renderAsExport();
  const actualExport = renderedExport.replaceAll("\r", "");
  const expectedSource = loadFileAsSourceNew(sourceFile).replaceAll("\r", "");
  const renderedHtml = await fl.renderAsHtml();
  const actualHtml = wrap(renderedHtml).replaceAll("\r", "");
  const expectedHtml = htm.replaceAll("\r", "");
  try {
    assert.strictEqual(actualSource, expectedSource);
    assert.strictEqual(actualHtml, expectedHtml);
    assert.strictEqual(actualExport, expectedSource);
  } catch (e) {
    if (updateTestFiles) {
      // update original not copied 
      sourceFile = sourceFile.replace("out\\", "");
      htmlFile = htmlFile.replace("out\\", "");

      updateTestFileNew(sourceFile, actualSource);
      updateTestFileNew(htmlFile, actualHtml);
      throw new Error("Files updated");
    } else {
      throw e;
    }
  }
}

export function updateTestFileNew(testDoc: string, newContent: string) {
  writeFileSync(testDoc, newContent);
}

export function wrap(html: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="..\\..\\..\\media\\elanStyle.css" rel="stylesheet" />
<title>Elan Editor</title>
</head>
<body>
${html}
</body>
</html>`;
}

export async function assertFileParsesNew(sourceFile: string) {
  const fl = await loadFileAsModelNew(sourceFile);

  const renderedSource = await fl.renderAsElanSource();
  const actualSource = renderedSource.replaceAll("\r", "");
  const expectedSource = loadFileAsSourceNew(sourceFile).replaceAll("\r", "");

  assert.strictEqual(actualSource, expectedSource);
}

export function loadFileAsSourceNew(sourceFile: string): string {
  return readFileSync(sourceFile, "utf-8");
}

export function getElanFiles(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter(s => s.endsWith(".elan"));
}

export async function loadFileAsModelNew(sourceFile: string): Promise<FileImpl> {
  const source = loadFileAsSourceNew(sourceFile);
  const codeSource = new CodeSourceFromString(source);
  const fl = new FileImpl(hash, new DefaultProfile(), "", transforms(), new StdLib(new StubInputOutput()), true);
  await fl.parseFrom(codeSource);
  if (fl.parseError) {
    throw new Error(fl.parseError);
  }
  return fl;
}

export function loadFileAsHtmlNew(sourceFile: string): string {
  return loadFileAsSourceNew(sourceFile);
}

export function assertElementsById(dom: jsdom.JSDOM, id: string, expected: string) {
  const e = dom.window.document.getElementById(id);
  const c = e?.className;
  assert.strictEqual(c, expected);
}

export async function assertElementHasClasses(f: File, elementId: string, classes: string) {
  const dom = await readAsDOM(f);
  assertElementsById(dom, elementId, classes);
}

export function assertElementHtmlById(dom: jsdom.JSDOM, id: string, expected: string) {
  const e = dom.window.document.getElementById(id);
  const c = e?.innerHTML;
  assert.strictEqual(c, expected);
}

export async function assertElementContainsHtml(f: File, id: string, expectedHtml: string) {
  const dom = await readAsDOM(f);
  const e = dom.window.document.getElementById(id);
  const c = e?.innerHTML;
  assert.strictEqual(c, expectedHtml);
}

function getEvent(char: string) {
  return {
    type: "key",
    target: "frame",
    key: char,
    modKey: { control: false, shift: false, alt: false },
  } as editorEvent;
}

async function doAsserts(f: FileImpl, fld: AbstractField, expected: [string, string, string][] | number) {
  await f.renderAsHtml();
  const symbols = fld.allPossibleSymbolCompletions;

  if (typeof expected === "number") {
    assert.strictEqual(symbols.length, expected);
    return;
  }
  const minLen = symbols.length > expected.length ? expected.length : symbols.length;

  for (let i = 0; i < minLen; i++) {
    const s = symbols[i];
    const e = expected[i] as [string, string, string];

    assert.strictEqual(s.name, e[0]);

    if (e[1] !== "*") {
      assert.strictEqual(s.displayName, e[1]);
    }

    if (e[2] !== "*") {
      assert.strictEqual(s.insertedText, e[2]);
    }
  }

  assert.strictEqual(symbols.length, expected.length);
}


export async function assertAutocompletes(
  f: FileImpl,
  id: string,
  char: string,
  at: number,
  expected: [string, string, string][],
  clear?: boolean
): Promise<void> {
  assertParses(f);

  const fld = f.getById(id) as AbstractField;

  if (clear) {
    fld.text = "";
  }

  fld.select();
  fld.cursorPos = at;
  fld.processKey(getEvent(char));
  await doAsserts(f, fld, expected);
}

function dump(v: DebugSymbol[]) {
  return v.map(t => `${t.name}:${t.value}`).join(", ")
}

function assertEqual(actual: any, expected: any) {
  if (Array.isArray(actual)) {
    assert.strictEqual(actual.length, expected.length);

    for (let i = 0; i < actual.length; i++) {
      assertEqual(actual[i], expected[i]);
    }
  } else if (typeof actual === "object") {
      const actualKeys = Object.keys(actual);
      const expectedKeys = Object.keys(expected);

      assert.strictEqual(actualKeys.length, expectedKeys.length);

      for (let i = 0; i < actualKeys.length; i++) {
        assertEqual(actualKeys[i], expectedKeys[i]);

        assertEqual(actual[actualKeys[i]], expected[expectedKeys[i]]);
      }
    } else {
      assert.strictEqual(actual, expected);
    }
}


async function assertData(variables: DebugSymbol[], expected: DebugSymbol[]) {

  assert.strictEqual(variables.length, expected.length, `Provided: ${dump(variables)} expected: ${dump(expected)}`)

  for (let i = 0; i < variables.length; i++) {
    const v = variables[i];
    const e = expected[i];

    assert.strictEqual(v.name, e.name);
    assertEqual(v.value, e.value);
    assert.strictEqual(v.typeMap, e.typeMap);
  }
}

function handleBreakPoint(runWorker: Worker) {
  return new Promise<DebugSymbol[]>((rs, rj) => {
    runWorker.addEventListener("message", (e: MessageEvent<WebWorkerMessage>) => {
      const data = e.data;

      switch (data.type) {
        case "breakpoint":
          rs(data.value)
          break;
        case "singlestep":
          runWorker.postMessage({ type: "resume" } as WebWorkerMessage);
          break;
        default:
          rj(`unexpected response '${data.type}'`)
      }
    });

    runWorker.addEventListener("error", (ev: ErrorEvent) => {


      rj(`unexpected error ${ev}`);
    });

    runWorker.postMessage({ type: "start" } as WebWorkerMessage);
  });
}


export async function assertDebugBreakPoint(
  f: FileImpl,
  id: string,
  expected: DebugSymbol[],
): Promise<void> {
  assertParses(f);

  const fld = f.getById(id) as AbstractFrame;

  fld.breakpointStatus = BreakpointStatus.active;

  const dir = __dirname.replaceAll("\\", "/");
  const jsCode = f.compileAsWorker(`file:///${dir}`, true, false);
  const asUrl = encodeCode(jsCode);

  const runWorker = new Worker(asUrl, { type: "module" });

  const data = await handleBreakPoint(runWorker);
  runWorker.terminate();

  await assertData(data, expected);
}

export async function assertSymbolCompletionWithString(
  f: FileImpl,
  id: string,
  text: string,
  expected: [string, string, string][] | number,
): Promise<void> {
  assertParses(f);
  const fld = f.getById(id) as AbstractField;

  assert.notStrictEqual(fld, undefined, `${id} not found`);

  fld.text = "";

  fld.select();
  fld.cursorPos = 0;

  for (const c of text) {
    fld.processKey(getEvent(c));
  }

  await doAsserts(f, fld, expected);
}

export async function readAsDOM(f: File) {
  const renderedHtml = await f.renderAsHtml();
  return new jsdom.JSDOM(renderedHtml);
}

export async function assertClasses(
  setupFn: () => File,
  testFn: (f: File) => void,
  assertClasses: [string, string, string],
) {
  const ff = setupFn();
  const preDom = await readAsDOM(ff);
  testFn(ff);
  const postDom = await readAsDOM(ff);

  assertElementsById(preDom, assertClasses[0], assertClasses[1]);
  assertElementsById(postDom, assertClasses[0], assertClasses[2]);
}

export async function assertHtml(
  setupFn: () => File,
  testFn: (f: File) => void,
  assertClasses: [string, string],
) {
  const ff = setupFn();
  testFn(ff);
  const postDom = await readAsDOM(ff);

  assertElementHtmlById(postDom, assertClasses[0], assertClasses[1]);
}

export function key(k: string, shift?: boolean, control?: boolean, alt?: boolean): editorEvent {
  return {
    key: k,
    modKey: { shift: !!shift, control: !!control, alt: !!alt },
    type: "key",
    target: "frame",
  };
}

//Keys
export function enter() {
  return key("Enter");
}
export function shift_enter() {
  return key("Enter", true);
}
export function tab() {
  return key("Tab");
}
export function shift_tab() {
  return key("Tab", true);
}
export function up() {
  return key("ArrowUp");
}
export function shift_up() {
  return key("ArrowUp", true);
}
export function ctrl_up() {
  return key("ArrowUp", false, true);
}
export function down() {
  return key("ArrowDown");
}
export function shift_down() {
  return key("ArrowDown", true);
}
export function ctrl_down() {
  return key("ArrowDown", false, true);
}
export function left() {
  return key("ArrowLeft");
}
export function right() {
  return key("ArrowRight");
}
export function home() {
  return key("Home");
}
export function end() {
  return key("End");
}
export function esc() {
  return key("Escape");
}
export function back() {
  return key("Backspace");
}
export function del() {
  return key("Delete");
}
export function ctrl_del() {
  return key("Delete", false, true);
}
export function ctrl_backspace() {
  return key("Backspace", false, true);
}
export function shift_ins() {
  return key("Insert", true);
}
export function ctrl_x() {
  return key("x", false, true);
}
export function ctrl_v() {
  return key("v", false, true);
}

export function testNodeParse(
  node: ParseNode,
  text: string,
  status: ParseStatus,
  matchedText: string,
  remainingText: string,
  source = "",
  html = "",
) {
  node.parseText(text);
  assert.equal(node.status, status);
  if (matchedText !== "") {
    assert.equal(node.matchedText, matchedText);
  }
  assert.equal(node.remainingText, remainingText);
  if (source !== "") {
    assert.equal(node.renderAsElanSource(), source);
  }
  if (html && html !== "") {
    assert.equal(node.renderAsHtml(), html);
  }
}

export function testExtractContextForExpression(text: string, context: string) {
  const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), "", transforms(), new StdLib(new StubInputOutput())));
  const v = new VariableStatement(main);
  const expr = v.expr;
  expr.setFieldToKnownValidText(text);
  expr.parseCurrentText();
  assert.equal(expr.extractContextFromText(), context);

}

export function testActiveNodeAndDone(
  node: ParseNode,
  text: string,
  status: ParseStatus,
  activeNodeType: string,
  done = false,
) {
  node.parseText(text);
  assert.equal(node.status, status);
  const active = node.getActiveNode();
  const cls = active.constructor.name;
  assert.equal(cls, activeNodeType);
  assert.equal(node.isDone(), done);
}

export function testSymbolCompletionSpec(node: ParseNode, text: string, status: ParseStatus, activeNode: string,
  toMatch = "", tokenTypes: TokenType[], keywords: string[] = [], constrainingId: string = "") {
  node.parseText(text);
  assert.equal(node.status, status);
  const active = node.getActiveNode();
  const cls = active.constructor.name;
  const spec = node.symbolCompletion_getSpec();
  assert.equal(cls, activeNode);
  assert.equal(spec.toMatch, toMatch);
  assert.equal(Array.from(spec.tokenTypes).join(","), tokenTypes.join(","));
  assert.equal(Array.from(spec.keywords).map(kc => kc.keyword).join(","), keywords.join(","));
  assert.equal(spec.context, constrainingId);
}

export function testCompletion(
  node: ParseNode,
  text: string,
  status: ParseStatus,
  completion: string,
) {
  node.parseText(text);
  assert.equal(node.status, status);
  assert.equal(node.getSyntaxCompletionAsHtml(), completion);
}

export const intType = IntType.Instance;
export const floatType = FloatType.Instance;
export const boolType = BooleanType.Instance;
export const stringType = StringType.Instance;
export const unknownType = UnknownType.Instance;

export async function createTestRunner() {
  const system = getTestSystem("");
  const stdlib = new StdLib(new StubInputOutput());
  stdlib.system = system;
  system.stdlib = stdlib;
  return await getTestRunner(system, stdlib);
}

export async function testElanProgram(pathFromSrc: string) {
  const f = await loadFileAsModelNew(`${__dirname}\\..\\..\\src\\${pathFromSrc}`);
  const runner = await createTestRunner();
  f.refreshParseAndCompileStatuses(false);
  assert.equal(f.readParseStatus(), ParseStatus.valid);
  assert.equal(f.readCompileStatus(), CompileStatus.ok);
  const outcomes = await runner(f.compile());
  f.refreshTestStatuses(outcomes);
  const ts = f.readTestStatus();
  if (ts !== TestStatus.default) {
    assert.equal(ts, TestStatus.pass);
  }
}



export function asDebugSymbol(name: string, value: any, typeMap : string) {
  return {
    name,
    value,
    typeMap,
  } as DebugSymbol
}


