/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParserRuleContext } from "antlr4ng";
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
import { FileAsn } from "../src/compiler/syntax-nodes/file-asn";
import { TestStatus } from "../src/compiler/test-status";
import { PythonParser } from "../src/generated/python/PythonParser";
import { RefLangParser } from "../src/generated/ref-lang/RefLangParser";
import { getParserByLanguage, getVisitorCompilerByLanguage, getVisitorHtmlByLanguage, getVisitorSourceByLanguage } from "../src/ide/compile-api/parser-helpers";
import { AbstractFrame } from "../src/ide/frames/abstract-frame";
import { AbstractSelector } from "../src/ide/frames/abstract-selector";
import { CodeSourceFromString } from "../src/ide/frames/code-source-from-string";
import { FieldImpl } from "../src/ide/frames/fields/field-impl";
import { FileImpl } from "../src/ide/frames/file-impl";
import { editorEvent } from "../src/ide/frames/frame-interfaces/editor-event";
import { File } from "../src/ide/frames/frame-interfaces/file";
import { Language } from "../src/ide/frames/frame-interfaces/language";
import { MainRoutine } from "../src/ide/frames/globals/main-routine";
import { LanguageCSharp } from "../src/ide/frames/language-c-sharp";
import { LanguagePython } from "../src/ide/frames/language-python";
import { LanguageRefLang } from "../src/ide/frames/language-ref-lang";
import { Paradigm } from "../src/ide/frames/paradigm";
import { VariableDefinition } from "../src/ide/frames/statements/variable-definition";
import { CompileStatus, ParseStatus } from "../src/ide/frames/status-enums";
import { StubInputOutput } from "../src/ide/stub-input-output";
import { hash } from "../src/ide/util";
import { encodeCode } from "../src/ide/web/web-helpers";
import { WebWorkerMessage } from "../src/ide/web/web-worker-messages";
import { assertParses, testHash, transforms } from "./compiler/compiler-test-helpers";
import { getTestSystem } from "./compiler/test-system";
import { getTestRunner } from "./runner";
import { RootAstNode } from "../src/compiler/compiler-interfaces/root-ast-node";

// flag to update test files
const updateTestFiles = true;

function compiles(ast : RootAstNode | undefined) {
   return ast && ast.getAllCompileErrors().length == 0;
}


export async function assertParsesAndCompilesAndTests(file: FileImpl) {
  const runner = await createTestRunner();
    
  const parserErrors = file._parserErrorMessages.join("\n");

  assert.equal(file.getParseStatus(), ParseStatus.valid, "failed parse " + parserErrors);

  const code = file.compile();
  const ast = file.getAst(false);

  assert.equal(compiles(ast), true, "failed compile " + ast?.getAllCompileErrors().join("\n"));
  const outcomes = await runner(code);
  file.refreshTestStatuses(outcomes);
  const ts = file.readTestStatus();
  if (ts !== TestStatus.default) {
    assert.equal(ts, TestStatus.pass, "failed tests");
  }
}

function getDirName(l : Language) {
  return l.languageFullName === "Python" ? "python" : "ref-lang";
}

function getHtmlSubDir(l : Language) {
  return  `${getDirName(l)}-html`;
}

export async function assertGeneratesHtml(file: FileImpl, testPath: string) {
  let actualHtml = "";
  let htmlPath = testPath + ".html";
  let msg = "";
  
  try {  
    const renderedHtml = await file.renderAsHtml();
    actualHtml = wrap(renderedHtml).replaceAll("\r", "");
    const expectedHtml = loadFileAsHtml(htmlPath).replaceAll("\r", "");
    assert.strictEqual(actualHtml, expectedHtml);
  }
  catch {
    msg = `rendered html incorrect`;
    if (updateTestFiles && file.getParseStatus() === ParseStatus.valid && compiles(file.getAst(false))) {
      // update original not copied 
      htmlPath = htmlPath.replace("out\/", "");

      updateTestFile(htmlPath, actualHtml);
      msg = msg + ": test file updated";
    }
   
  }
   return msg;
}

export async function assertRendersAs(file: FileImpl, sourcePath: string, language: Language) {
 
  let actual = "";
  let msg = "";

  let toSourcePath = sourcePath.replace(getDirName(file.language()), getDirName(language)) + "." + language.defaultFileExtension;

  try {
    file.setLanguage(language);
    
    actual = (await file.renderAsSource()).replaceAll("\r", "");;
    const expected = loadFileAsSource(toSourcePath).replaceAll("\r", "");
    assert.strictEqual(actual, expected);
  }
  catch {
    msg = `${language.languageFullName} render incorrect`;
    if (updateTestFiles && file.getParseStatus() === ParseStatus.valid && compiles(file.getAst(false))) {
      toSourcePath = toSourcePath.replace("out\/test", "src");
      updateTestFile(toSourcePath, actual);
      msg = msg + ": test file updated";
    }
  }
  return msg;
}

export async function testFile(fileName: string, language : Language) {
  const [file, sourcePath, testPath] = await getFile(fileName, language);
  await assertParsesAndCompilesAndTests(file);

  const msgs = [];
  msgs.push(await assertGeneratesHtml(file, testPath));
  msgs.push(await assertRendersAs(file, sourcePath.slice(0, sourcePath.lastIndexOf(".")), LanguageRefLang.Instance));
  msgs.push(await assertRendersAs(file, sourcePath.slice(0, sourcePath.lastIndexOf(".")), LanguagePython.Instance));

  if (msgs.some(m => m)) {
    throw new Error(msgs.join(", "));
  }
}

export function updateTestFile(testDoc: string, newContent: string) {
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

export function loadFileAsSource(sourceFile: string): string {
  return readFileSync(sourceFile, "utf-8");
}

export function getElanFiles(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter(s => s.endsWith(".elan"));
}

export async function loadFileAsModel(sourceFile: string): Promise<FileImpl> {
  const source = loadFileAsSource(sourceFile);
  const codeSource = new CodeSourceFromString(source);
  const fl = new FileImpl(hash, new Paradigm(""), "", transforms(), new StdLib(new StubInputOutput()),false, true);
  await fl.parseFrom(codeSource);
  if (fl.parseError) {
    throw new Error(fl.parseError);
  }
  return fl;
}

export async function getFile(sf: string, l : Language): Promise<[FileImpl, string, string]> {
  const sourceFile = `./out/test/demo_programs/${getDirName(l)}/${sf}.${l.defaultFileExtension}`;
  const testPath = `./out/test/files/${getHtmlSubDir(l)}/${sf}`;
  const source = loadFileAsSource(sourceFile);
  const codeSource = new CodeSourceFromString(source);
  const fl = new FileImpl(hash, new Paradigm(""), "", transforms(), new StdLib(new StubInputOutput()),false, true);
  await fl.parseFrom(codeSource);
  return [fl, sourceFile, testPath];
}

export function loadFileAsHtml(sourceFile: string): string {
  return loadFileAsSource(sourceFile);
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

async function assertStartsWith(f: FileImpl, fld: FieldImpl, startsWith: [string, string, string][]) {
  await f.renderAsHtml();
  const symbols = fld.allPossibleSymbolCompletions;

  
  for (let i = 0; i < startsWith.length; i++) {
    const s = symbols[i];
    const e = startsWith[i] as [string, string, string];

    assert.strictEqual(s.name, e[0]);
  }
}

async function doAsserts(f: FileImpl, fld: FieldImpl, expected: [string, string, string][] | number) {
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

  const fld = f.getById(id) as FieldImpl;

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
  const fld = f.getById(id) as FieldImpl;

  assert.notStrictEqual(fld, undefined, `${id} not found`);

  fld.text = "";

  fld.select();
  fld.cursorPos = 0;

  for (const c of text) {
    fld.processKey(getEvent(c));
  }

  await doAsserts(f, fld, expected);
}

export async function assertSymbolCompletionMenuStartsWith(
  f: FileImpl,
  id: string,
  text: string,
  expected: [string, string, string][],
): Promise<void> {
  assertParses(f);
  const fld = f.getById(id) as FieldImpl;

  assert.notStrictEqual(fld, undefined, `${id} not found`);

  fld.text = "";

  fld.select();
  fld.cursorPos = 0;

  for (const c of text) {
    fld.processKey(getEvent(c));
  }

  assertStartsWith(f,fld, expected);
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



export type Parser = RefLangParser | PythonParser;

const file = new FileImpl(
  hash,
  new Paradigm(""),
  "",
  transforms(),
  new StdLib(new StubInputOutput()),
  false,
  true,
);

const rootScope = new FileAsn(file.libraryScope, file.getVersion(), file.language());


export function testAntlrParse(
  languageAndRule :  [Language,
      rule: (parser: Parser) => ParserRuleContext],
  text: string,
  parses: boolean,
  matchedText = "",
  source = "",
  html = "",
  exprt = "",
  objectCode = ""
) {
  const [language, rule] = languageAndRule;
  const parser = getParserByLanguage(language, text);
  const context = rule(parser); 
  const parsedText =  context.getText().replaceAll(" ", "");
  const errors = parser.numberOfSyntaxErrors;
  
  assert.equal(errors === 0, parses, `Parsing: '${text}'`);

  if (matchedText !== "") {
    assert.equal(parsedText, matchedText.replaceAll(" ", ""));
  }

  if (source !== "") {
    assert.equal(getVisitorSourceByLanguage(LanguageRefLang.Instance).visit(context), source);
  }

  if (html && html !== "") {
    assert.equal(getVisitorHtmlByLanguage(language).visit(context), html);
  }

  if (exprt && exprt !== "") {
    assert.equal(getVisitorSourceByLanguage(language).visit(context), exprt);
  }

  if (objectCode && objectCode !== "") {
    assert.equal(getVisitorCompilerByLanguage(language, "", rootScope).visit(context)?.compile(), objectCode);
  }
}

export function testFieldParse(
  field: FieldImpl,
  text: string,
  parses: boolean,
  html = "",
  source = "",
  exprt = "",
) { 
  field.parseCompleteText(text);

  const errors = field.getParserErrors();

  const parsed  = field.readParseStatus() === ParseStatus.valid;

  if (html && html !== "") {
    assert.equal(parsed ? field.renderAsHtml() : errors, html);
  }

   if (source !== "") {
    assert.equal(field.renderAsSource(), source);
  }

  if (exprt && exprt !== "") {
    assert.equal(field.renderAsSource(), exprt);
  }

  assert.equal(parses, parsed, `Parsing: '${text}'`);
}

export function fileWithPython(): FileImpl {
  return fileWithLanguage(LanguagePython.Instance);
}


export function fileWithCS(): FileImpl {
  return fileWithLanguage(LanguageCSharp.Instance);
}

function fileWithLanguage(language: Language): FileImpl {
  const f = new FileImpl(
    hash,
    new Paradigm(""),
    "",
    transforms(),
    new StdLib(new StubInputOutput()),false,
    true,
  );
  f.setLanguage(language);
  return f;
}

export function testExtractContextForExpression(text: string, context: string) {
  const main = new MainRoutine(new FileImpl(hash, new Paradigm(""), "", transforms(), new StdLib(new StubInputOutput()),false, false));
  const v = new VariableDefinition(main);
  const expr = v.expr;
  expr.setFieldToKnownValidText(text);
  expr.parseCurrentText();
  assert.equal(expr.extractContextFromText(), context);

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

export function asDebugSymbol(name: string, value: any, typeMap : string) {
  return {
    name,
    value,
    typeMap,
  } as DebugSymbol
}

export function selectOption(selector : AbstractSelector, option : string) {
  const map = selector.getContextMenuItems();
  let keyForString = "";

  for(const v of map) {
    const [key, [rawVal,]] = v;
    const val = rawVal.replaceAll("<b>", "").replaceAll("</b>", "");
    if (val.trim() === option.trim()) {
      keyForString = key;
    }
  }

  const event = {
    key : "ContextMenu",
    type : "contextmenu",
    command : keyForString,
    target : "frame",
    modKey: { control: false, shift: false, alt: false },
    optionalData: undefined
  } as editorEvent;

  selector.processKey(event);
}

export function assertOptions(selector : AbstractSelector, options : string[]) {
  const map = selector.getContextMenuItems();
  const availableOptions : string[] = [];

  for(const v of map) {
    const [, [rawVal,]] = v;
    const val = rawVal.replaceAll("<b>", "").replaceAll("</b>", "");
    //TODO temp kludge to avoid confusion between copy and copy with
    if (!val.includes("delete") && !val.includes("paste")) {
      availableOptions.push(val);
    }
  }

  assertEqual(availableOptions.length, options.length);

  for(let i = 0; i < availableOptions.length; i++){
    assertEqual(availableOptions[i], options[i]);
  }
}

export function fileImplFor(language: Language) {
  const file = new FileImpl(
    testHash,
    new Paradigm(""),
    "",
    transforms(),
    new StdLib(new StubInputOutput()),
    false,
    true,
  );
  file.setLanguage(language);
  return file;
}