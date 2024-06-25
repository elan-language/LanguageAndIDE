/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from "assert";
import * as jsdom from "jsdom";
import * as vscode from "vscode";
import { CodeSourceFromString } from "../frames/code-source";
import { DefaultProfile } from "../frames/default-profile";
import { FileImpl } from "../frames/file-impl";
import { editorEvent } from "../frames/interfaces/editor-event";
import { Field } from "../frames/interfaces/field";
import { File } from "../frames/interfaces/file";
import { Parent } from "../frames/interfaces/parent";
import { Scope } from "../frames/interfaces/scope";
import { Selectable } from "../frames/interfaces/selectable";
import { ElanSymbol } from "../frames/interfaces/symbol";
import { SymbolType } from "../frames/interfaces/symbol-type";
import { ParseNode } from "../frames/parse-nodes/parse-node";
import { ParseStatus } from "../frames/status-enums";
import { BooleanType } from "../frames/symbols/boolean-type";
import { ClassType } from "../frames/symbols/class-type";
import { FloatType } from "../frames/symbols/float-type";
import { FunctionType } from "../frames/symbols/function-type";
import { GenericParameterType } from "../frames/symbols/generic-parameter-type";
import { ImmutableListType } from "../frames/symbols/immutable-list-type";
import { IntType } from "../frames/symbols/int-type";
import { StringType } from "../frames/symbols/string-type";
import { SymbolScope } from "../frames/symbols/symbol-scope";
import { UnknownSymbol } from "../frames/symbols/unknown-symbol";
import { UnknownType } from "../frames/symbols/unknown-type";
import { transform } from "../frames/syntax-nodes/ast-visitor";
import { getTestRunner } from "../runner";
import { StdLib } from "../std-lib";
import { hash } from "../util";
import { transforms } from "./compiler/compiler-test-helpers";
import { getTestSystem } from "./compiler/test-system";
import { AssignableField } from "../frames/fields/assignableField";
import { AbstractField } from "../frames/fields/abstract-field";

// flag to update test file
const updateTestFiles = false;

export async function assertEffectOfAction(
  sourceFile: string,
  action: (f: FileImpl) => void,
  htmlFile: string,
) {
  const ws = vscode.workspace.workspaceFolders![0].uri;
  const sourceUri = vscode.Uri.joinPath(ws, sourceFile);
  const sourceDoc = await vscode.workspace.openTextDocument(sourceUri);
  const htmlUri = vscode.Uri.joinPath(ws, htmlFile);
  const htmlDoc = await vscode.workspace.openTextDocument(htmlUri);

  const codeSource = new CodeSourceFromString(sourceDoc.getText());

  const fl = new FileImpl(hash, new DefaultProfile(), transforms());
  await fl.parseFrom(codeSource);
  if (fl.parseError) {
    throw new Error(fl.parseError);
  }
  action(fl);

  const rendered = await fl.renderAsHtml();
  const actualHtml = wrap(rendered).replaceAll("\r", "");
  const expectedHtml = htmlDoc.getText().replaceAll("\r", "");
  try {
    assert.strictEqual(actualHtml, expectedHtml);
  } catch (e) {
    if (updateTestFiles) {
      updateTestFile(htmlDoc, actualHtml);
    }
    throw e;
  }
}

export async function assertGeneratesHtmlandSameSource(sourceFile: string, htmlFile: string) {
  const ws = vscode.workspace.workspaceFolders![0].uri;
  const sourceUri = vscode.Uri.joinPath(ws, sourceFile);
  const sourceDoc = await vscode.workspace.openTextDocument(sourceUri);
  const htmlUri = vscode.Uri.joinPath(ws, htmlFile);
  const htmlDoc = await vscode.workspace.openTextDocument(htmlUri);

  const codeSource = new CodeSourceFromString(sourceDoc.getText());

  const fl = new FileImpl(hash, new DefaultProfile(), transforms());
  await fl.parseFrom(codeSource);
  if (fl.parseError) {
    throw new Error(fl.parseError);
  }
  const renderedSource = await fl.renderAsSource();
  const actualSource = renderedSource.replaceAll("\r", "");
  const expectedSource = sourceDoc.getText().replaceAll("\r", "");
  const renderedHtml = await fl.renderAsHtml();
  const actualHtml = wrap(renderedHtml).replaceAll("\r", "");
  const expectedHtml = htmlDoc.getText().replaceAll("\r", "");
  try {
    assert.strictEqual(actualSource, expectedSource);
    assert.strictEqual(actualHtml, expectedHtml);
  } catch (e) {
    if (updateTestFiles) {
      updateTestFile(sourceDoc, actualSource);
      updateTestFile(htmlDoc, actualHtml);
    }
    throw e;
  }
}

function updateTestFile(testDoc: vscode.TextDocument, newContent: string) {
  const edit = new vscode.WorkspaceEdit();

  edit.replace(testDoc.uri, new vscode.Range(0, 0, testDoc.lineCount, 0), newContent);

  vscode.workspace.applyEdit(edit).then((ok) => {
    if (ok) {
      testDoc.save().then((b) => {
        if (!b) {
          console.warn("Save failed: " + testDoc.fileName);
        }
      });
    } else {
      console.warn("Edit failed: " + testDoc.fileName);
    }
  });
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

export async function assertAreEqualByHtml(htmlFile: string, frame: () => File) {
  const ws = vscode.workspace.workspaceFolders![0].uri;

  const htmlUri = vscode.Uri.joinPath(ws, htmlFile);
  const htmlDoc = await vscode.workspace.openTextDocument(htmlUri);
  const model = frame();
  // get rid of \r for appveyor
  const renderedHtml = await model.renderAsHtml();
  const actualHtml = wrap(renderedHtml).replaceAll("\r", "");
  const expectedHtml = htmlDoc.getText().replaceAll("\r", "");

  try {
    assert.strictEqual(actualHtml, expectedHtml);
  } catch (e) {
    if (updateTestFiles) {
      updateTestFile(htmlDoc, actualHtml);
    }
    throw e;
  }
}

export async function assertAreEqualBySource(sourceFile: string, frame: () => File) {
  const ws = vscode.workspace.workspaceFolders![0].uri;

  const sourceUri = vscode.Uri.joinPath(ws, sourceFile);
  const sourceDoc = await vscode.workspace.openTextDocument(sourceUri);
  const model = frame();
  // get rid of \r for appveyor
  const renderedSource = await model.renderAsSource();
  const actualSource = renderedSource.replaceAll("\r", "");
  const expectedSource = sourceDoc.getText().replaceAll("\r", "");

  assert.strictEqual(actualSource, expectedSource);
}

export async function assertFileParses(sourceFile: string) {
  const ws = vscode.workspace.workspaceFolders![0].uri;
  const sourceUri = vscode.Uri.joinPath(ws, sourceFile);
  const sourceDoc = await vscode.workspace.openTextDocument(sourceUri);
  const codeSource = new CodeSourceFromString(sourceDoc.getText());
  const fl = new FileImpl(hash, new DefaultProfile(), transforms());
  await fl.parseFrom(codeSource);
  if (fl.parseError) {
    throw new Error(fl.parseError);
  }
  const renderedSource = await fl.renderAsSource();
  const actualSource = renderedSource.replaceAll("\r", "");
  const expectedSource = sourceDoc.getText().replaceAll("\r", "");

  assert.strictEqual(actualSource, expectedSource);
}

export async function loadFileAsModel(sourceFile: string): Promise<FileImpl> {
  const ws = vscode.workspace.workspaceFolders![0].uri;
  const sourceUri = vscode.Uri.joinPath(ws, sourceFile);
  const sourceDoc = await vscode.workspace.openTextDocument(sourceUri);
  const codeSource = new CodeSourceFromString(sourceDoc.getText());
  const fl = new FileImpl(hash, new DefaultProfile(), transforms());
  await fl.parseFrom(codeSource);
  if (fl.parseError) {
    throw new Error(fl.parseError);
  }
  return fl;
}

export async function assertAreEqualByFile<T extends Selectable>(
  htmlFile: string,
  elanFile: string,
  frame: (s: string) => T,
) {
  const ws = vscode.workspace.workspaceFolders![0].uri;

  const elanUri = vscode.Uri.joinPath(ws, elanFile);
  const htmlUri = vscode.Uri.joinPath(ws, htmlFile);
  const elanDoc = await vscode.workspace.openTextDocument(elanUri);
  const htmlDoc = await vscode.workspace.openTextDocument(htmlUri);
  const model = frame(elanDoc.getText());
  const actualHtml = wrap(model.renderAsHtml()).replaceAll("\r", "");
  const expectedHtml = htmlDoc.getText().replaceAll("\r", "");

  assert.strictEqual(actualHtml, expectedHtml);
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

export async function activate(docUri: vscode.Uri) {
  // The extensionId is `publisher.name` from package.json
  const ext = vscode.extensions.getExtension("undefined_publisher.elan")!;

  if (!ext) {
    const all = vscode.extensions.all;
    assert.fail(all[all.length - 1].id);
  }

  await ext.activate();
  try {
    const doc = await vscode.workspace.openTextDocument(docUri);
    const editor = await vscode.window.showTextDocument(doc);
    await sleep(20000); // Wait for server activation
  } catch (e) {
    console.error(e);
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

export function testAST(
  node: ParseNode,
  field: Field,
  text: string,
  astAsString: string,
  st: SymbolType,
) {
  node.parseText(text);
  if (node.status === ParseStatus.valid) {
    const ast = transform(node, "", field.getHolder() as Scope);

    assert.strictEqual(ast?.toString(), astAsString);
    assert.strictEqual(ast.symbolType()?.name, st.name, text);
  }
}

export async function createTestRunner() {
  const system = getTestSystem("");
  const stdlib = new StdLib(system);
  return await getTestRunner(system, stdlib);
}
