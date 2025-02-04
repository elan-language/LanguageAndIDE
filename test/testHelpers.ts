/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from "assert";
import { readFileSync, writeFileSync } from "fs";
import * as jsdom from "jsdom";
import { CodeSourceFromString } from "../src/frames/code-source";
import { DefaultProfile } from "../src/frames/default-profile";
import { AbstractField } from "../src/frames/fields/abstract-field";
import { FileImpl } from "../src/frames/file-impl";
import { MainFrame } from "../src/frames/globals/main-frame";
import { editorEvent } from "../src/frames/interfaces/editor-event";
import { File } from "../src/frames/interfaces/file";
import { ParseNode } from "../src/frames/parse-nodes/parse-node";
import { VarStatement } from "../src/frames/statements/var-statement";
import { CompileStatus, ParseStatus, TestStatus } from "../src/frames/status-enums";
import { TokenType } from "../src/frames/symbol-completion-helpers";
import { BooleanType } from "../src/frames/symbols/boolean-type";
import { FloatType } from "../src/frames/symbols/float-type";
import { IntType } from "../src/frames/symbols/int-type";
import { StringType } from "../src/frames/symbols/string-type";
import { UnknownType } from "../src/frames/symbols/unknown-type";
import { getTestRunner } from "../src/runner";
import { StdLib } from "../src/standard-library/std-lib";
import { hash } from "../src/util";
import { assertParses, transforms } from "./compiler/compiler-test-helpers";
import { getTestSystem } from "./compiler/test-system";
import { AbstractFrame } from "../src/frames/abstract-frame";
import {  WebWorkerMessage } from "../src/web/web-worker-messages";
import  Worker  from 'web-worker';


// flag to update test file
const updateTestFiles = true;

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

export async function assertGeneratesHtmlandSameSourceNew(sourceFile: string, htmlFile: string) {
  const fl = await loadFileAsModelNew(sourceFile);
  const htm = loadFileAsHtmlNew(htmlFile);

  const renderedSource = await fl.renderAsSource();
  const actualSource = renderedSource.replaceAll("\r", "");
  const expectedSource = loadFileAsSourceNew(sourceFile).replaceAll("\r", "");
  const renderedHtml = await fl.renderAsHtml();
  const actualHtml = wrap(renderedHtml).replaceAll("\r", "");
  const expectedHtml = htm.replaceAll("\r", "");
  try {
    assert.strictEqual(actualSource, expectedSource);
    assert.strictEqual(actualHtml, expectedHtml);
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

function updateTestFileNew(testDoc: string, newContent: string) {
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

  const renderedSource = await fl.renderAsSource();
  const actualSource = renderedSource.replaceAll("\r", "");
  const expectedSource = loadFileAsSourceNew(sourceFile).replaceAll("\r", "");

  assert.strictEqual(actualSource, expectedSource);
}

export function loadFileAsSourceNew(sourceFile: string): string {
  return readFileSync(sourceFile, "utf-8");
}

export async function loadFileAsModelNew(sourceFile: string): Promise<FileImpl> {
  const source = loadFileAsSourceNew(sourceFile);
  const codeSource = new CodeSourceFromString(source);
  const fl = new FileImpl(hash, new DefaultProfile(), transforms());
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

async function doAsserts(f: FileImpl, fld : AbstractField, expected: [string, string, string][] | number) {
  await f.renderAsHtml();
  const symbols = fld.autocompleteSymbols;

  if (typeof expected === "number") {
    assert.strictEqual(symbols.length, expected); 
    return;  
  }

  assert.strictEqual(symbols.length, expected.length);

  for (let i = 0; i < expected.length; i++) {
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
} 


export async function assertAutocompletes(
  f: FileImpl,
  id: string,
  char: string,
  at: number,
  expected: [string, string, string][],
  clear? : boolean
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


function assertData(variables: [string, string][], expected: [string, string][]) {
  
 

  for (let i = 0; i < variables.length; i++) {
    const v = variables[i];
    const e = expected[i];

    assert.strictEqual(v[0], e[0]);
    assert.strictEqual(v[1], e[1]);
  }
}

function handleBreakPoint (runWorker : Worker) {
  return new Promise<[string, string][]>((rs, rj) => {
    runWorker.addEventListener("message", (e: MessageEvent<WebWorkerMessage>) => {
      const data = e.data;
  
      switch (data.type) {
        case "breakpoint":
          //assertData(data, expected);
          rs(data.value)
          break;
        default:
          rj(`unexpected response ${data.type}`)
      }
    });
  
    runWorker.addEventListener("error", (ev: ErrorEvent) => {
      //assert.fail()
      rj(`unexpected error ${ev}`);
    });
  
    runWorker.postMessage({ type: "start" } as WebWorkerMessage);
  });
}


export async function assertDebugBreakPoint(
  f: FileImpl,
  id: string,
  expected: [string, string][],
): Promise<void> {
  assertParses(f);
  
  const fld = f.getById(id) as AbstractFrame;

  fld.hasBreakPoint = true;

  const dir = __dirname.replaceAll("\\", "/");
  const jsCode = f.compileAsWorker1(`file:///${dir}`);
  const asUrl = "data:text/javascript;base64," + btoa(jsCode);

  const runWorker = new Worker(asUrl, { type: "module" });

  const data = await handleBreakPoint(runWorker);
  runWorker.terminate();

  assertData(data, expected);


}

export async function assertSymbolCompletionWithString(
  f: FileImpl,
  id: string,
  text: string,
  expected: [string, string, string][] | number,
): Promise<void> {
  assertParses(f);
  const fld = f.getById(id) as AbstractField;

  assert.notStrictEqual(fld, undefined, `${id} not found`)

  fld.text = "";
  
  fld.select();
  fld.cursorPos = 0;

  for(const c of text) {
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
export function ctrl_d() {
  return key("d", false, true);
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
    assert.equal(node.renderAsSource(), source);
  }
  if (html && html !== "") {
    assert.equal(node.renderAsHtml(), html);
  }
}

export function testExtractContextForExpression(text: string, context: string) {
  const main = new MainFrame(new FileImpl(hash, new DefaultProfile(), transforms()));
  const v = new VarStatement(main);
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
  toMatch = "", tokenTypes: TokenType[], keywords: string[] = [], constrainingId: string = "")
  {
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
  const stdlib = new StdLib();
  stdlib.system = system;
  return await getTestRunner(system, stdlib);
}

export async function testDemoProgram(program : string) {
  const f = await loadFileAsModelNew(`${__dirname}\\..\\..\\demo_programs\\${program}`);
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
