/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from "assert";
import { readFileSync, writeFileSync } from "fs";
import * as jsdom from "jsdom";
import { CodeSourceFromString } from "../src/frames/code-source";
import { DefaultProfile } from "../src/frames/default-profile";
import { AbstractField } from "../src/frames/fields/abstract-field";
import { FileImpl } from "../src/frames/file-impl";
import { editorEvent } from "../src/frames/interfaces/editor-event";
import { Field } from "../src/frames/interfaces/field";
import { File } from "../src/frames/interfaces/file";
import { Parent } from "../src/frames/interfaces/parent";
import { Scope } from "../src/frames/interfaces/scope";
import { ElanSymbol } from "../src/frames/interfaces/symbol";
import { SymbolType } from "../src/frames/interfaces/symbol-type";
import { ParseNode } from "../src/frames/parse-nodes/parse-node";
import { ParseStatus } from "../src/frames/status-enums";
import { BooleanType } from "../src/frames/symbols/boolean-type";
import { ClassType } from "../src/frames/symbols/class-type";
import { FloatType } from "../src/frames/symbols/float-type";
import { FunctionType } from "../src/frames/symbols/function-type";
import { GenericParameterType } from "../src/frames/symbols/generic-parameter-type";
import { ImmutableListType } from "../src/frames/symbols/immutable-list-type";
import { IntType } from "../src/frames/symbols/int-type";
import { StringType } from "../src/frames/symbols/string-type";
import { SymbolScope } from "../src/frames/symbols/symbol-scope";
import { UnknownSymbol } from "../src/frames/symbols/unknown-symbol";
import { UnknownType } from "../src/frames/symbols/unknown-type";
import { transform } from "../src/frames/syntax-nodes/ast-visitor";
import { getTestRunner } from "../src/runner";
import { StdLib } from "../src/std-lib";
import { hash } from "../src/util";
import { assertParses, transforms } from "./compiler/compiler-test-helpers";
import { getTestSystem } from "./compiler/test-system";

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
      updateTestFileNew(htmlFile, actualHtml);
    }
    throw e;
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
      updateTestFileNew(sourceFile, actualSource);
      updateTestFileNew(htmlFile, actualHtml);
    }
    throw e;
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
<elan-code>
${html}
</elan-code>
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

export async function assertAutocompletes(
  f: FileImpl,
  id: string,
  char: string,
  at: number,
  expected: [string, string][],
): Promise<void> {
  assertParses(f);
  const fld = f.getById(id) as AbstractField;
  fld.select();
  fld.cursorPos = at;
  fld.processKey(getEvent(char));
  await f.renderAsHtml();
  const symbols = fld.autocompleteSymbols;

  assert.strictEqual(symbols.length, expected.length);

  for (let i = 0; i < expected.length; i++) {
    const s = symbols[i];
    const e = expected[i];

    assert.strictEqual(s.symbolId, e[0]);
    assert.strictEqual(s.symbolType(transforms()).name, e[1]);
  }
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

export function testCompletion(
  node: ParseNode,
  text: string,
  status: ParseStatus,
  completion: string,
) {
  node.parseText(text);
  assert.equal(node.status, status);
  assert.equal(node.getCompletionAsHtml(), completion);
}

export const intType = IntType.Instance;
export const floatType = FloatType.Instance;
export const boolType = BooleanType.Instance;
export const stringType = StringType.Instance;
export const unknownType = UnknownType.Instance;

const stubIntSymbol = {
  symbolId: "a",
  symbolType: () => intType,
  symbolScope: SymbolScope.unknown,
} as ElanSymbol;

const stubFloatSymbol = {
  symbolId: "b",
  symbolType: () => floatType,
  symbolScope: SymbolScope.unknown,
} as ElanSymbol;

const stubStringSymbol = {
  symbolId: "bar",
  symbolType: () => stringType,
  symbolScope: SymbolScope.unknown,
} as ElanSymbol;

const stubBoolSymbol = {
  symbolId: "bar",
  symbolType: () => boolType,
  symbolScope: SymbolScope.unknown,
} as ElanSymbol;

const stubClassSymbol = {
  symbolId: "p",
  symbolType: () => new ClassType("p", false, false, [], undefined as any),
  symbolScope: SymbolScope.unknown,
} as ElanSymbol;

const stubFooClassSymbol = {
  symbolId: "p",
  symbolType: () => new ClassType("Foo", false, false, [], undefined as any),
  symbolScope: SymbolScope.unknown,
} as ElanSymbol;

const stubBarClassSymbol = {
  symbolId: "p",
  symbolType: () => new ClassType("Bar", false, false, [], undefined as any),
  symbolScope: SymbolScope.unknown,
} as ElanSymbol;

const stubYonClassSymbol = {
  symbolId: "p",
  symbolType: () => new ClassType("Yon", false, false, [], undefined as any),
  symbolScope: SymbolScope.unknown,
} as ElanSymbol;

const stubQuxClassSymbol = {
  symbolId: "p",
  symbolType: () => new ClassType("Qux", false, false, [], undefined as any),
  symbolScope: SymbolScope.unknown,
} as ElanSymbol;

const stubHolder = {
  resolveSymbol(id, transforms, initialScope): ElanSymbol {
    switch (id) {
      case "a":
        return stubIntSymbol;
      case "b":
        return stubFloatSymbol;
      case "c":
        return stubFloatSymbol;
      case "x":
        return stubIntSymbol;
      case "foo":
        return stubIntSymbol;
      case "bar":
        return stubStringSymbol;
      case "boo":
        return stubBoolSymbol;
      case "reduce":
        return stubIntSymbol;
      case "p":
        return stubClassSymbol;
      case "isBefore":
        return stubBoolSymbol;
      case "betterOf":
        return stubStringSymbol;
      case "attempt":
        return stubBoolSymbol;
      case "target":
        return stubStringSymbol;
      case "first":
        return stubIntSymbol;
      case "Foo":
        return stubFooClassSymbol;
      case "Bar":
        return stubBarClassSymbol;
      case "Yon":
        return stubYonClassSymbol;
      case "Qux":
        return stubQuxClassSymbol;
      case "lst":
        return {
          symbolId: "",
          symbolType: () => new ImmutableListType(intType),
          symbolScope: SymbolScope.unknown,
        };
      case "lst1":
        return {
          symbolId: "",
          symbolType: () => new ImmutableListType(stringType),
          symbolScope: SymbolScope.unknown,
        };
      case "simpleGeneric":
        return {
          symbolId: "",
          symbolType: () =>
            new FunctionType([new GenericParameterType("T")], new GenericParameterType("T"), false),
          symbolScope: SymbolScope.unknown,
        };
      case "getKey":
        return {
          symbolId: "",
          symbolType: () =>
            new FunctionType(
              [new ImmutableListType(new GenericParameterType("T"))],
              new GenericParameterType("T"),
              false,
            ),
          symbolScope: SymbolScope.unknown,
        };
    }

    return new UnknownSymbol(id);
  },
} as Parent;

export const stubField = {
  getHolder() {
    return stubHolder;
  },
} as Field;

export async function createTestRunner() {
  const system = getTestSystem("");
  const stdlib = new StdLib(system);
  return await getTestRunner(system, stdlib);
}
