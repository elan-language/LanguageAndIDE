import { matchesElanKeyword } from "../compiler/elan-keywords";
import { StdLib } from "../compiler/standard-library/std-lib";
import { transform, transformMany } from "../ide/compile-api/ast-visitor";
import { Transforms } from "../ide/compile-api/transforms";
import { AbstractSelector } from "../ide/frames/abstract-selector";
import { MemberSelector } from "../ide/frames/class-members/member-selector";
import { CodeSourceFromString } from "../ide/frames/code-source-from-string";
import { ArgListField } from "../ide/frames/fields/arg-list-field";
import { ExpressionField } from "../ide/frames/fields/expression-field";
import { ParamListField } from "../ide/frames/fields/param-list-field";
import { TypeField } from "../ide/frames/fields/type-field";
import { FileImpl } from "../ide/frames/file-impl";
import { CodeSource } from "../ide/frames/frame-interfaces/code-source";
import { AbstractClass } from "../ide/frames/globals/abstract-class";
import { ConcreteClass } from "../ide/frames/globals/concrete-class";
import { GlobalFunction } from "../ide/frames/globals/global-function";
import { GlobalSelector } from "../ide/frames/globals/global-selector";
import { MainRoutine } from "../ide/frames/globals/main-routine";
import { LanguageCS } from "../ide/frames/language-cs";
import { LanguageElan } from "../ide/frames/language-elan";
import { LanguageJava } from "../ide/frames/language-java";
import { LanguagePython } from "../ide/frames/language-python";
import { LanguageVB } from "../ide/frames/language-vb";
import { Paradigm } from "../ide/frames/paradigm";
import { ProcedureCall } from "../ide/frames/statements/procedureCall";
import { StatementSelector } from "../ide/frames/statements/statement-selector";
import { VariableStatement } from "../ide/frames/statements/variable-statement";
import { ParseStatus } from "../ide/frames/status-enums";
import { StubInputOutput } from "../ide/stub-input-output";
import { hash } from "../ide/util";
import { codeBlockEndTag, codeBlockTag, codeEndTag, codeTag } from "./parserConstants";

let documentationLogs: string[] = [];

export function log(l: string) {
  documentationLogs.push(l);
}

export function clearLogs() {
  documentationLogs = [];
}

export function writeLogs() {
  return documentationLogs.join("\n");
}

type TransformedCode = [string, string, string, string, string];

const counts = new Map<string, number>();

export function resetCounts() {
  counts.clear();
}

function incrementCount(what: string) {
  if (counts.has(what)) {
    counts.set(what, counts.get(what)! + 1);
  } else {
    counts.set(what, 1);
  }
}

export function getCounts() {
  return counts;
}

function transforms(): Transforms {
  return {
    transform: transform,
    transformMany: transformMany,
  };
}

const stdLib = new StdLib(new StubInputOutput());
let fileImpl: FileImpl | undefined = undefined;

export function resetFile() {
  fileImpl = undefined;
}

function newFileImpl(): FileImpl {
  if (!fileImpl) {
    fileImpl = new FileImpl(hash, new Paradigm(""), "guest", transforms(), stdLib, false, true);
  }

  const cc = fileImpl.getChildren();

  for (const c of cc) {
    fileImpl.removeChild(c);
  }

  fileImpl.setLanguage(LanguageElan.Instance);
  fileImpl.updateAllParseStatus();
  fileImpl.parseError = undefined;

  return fileImpl;
}

const languages = [
  LanguageElan.Instance,
  LanguagePython.Instance,
  LanguageCS.Instance,
  LanguageVB.Instance,
  LanguageJava.Instance,
];

async function parseAs(
  _what: string,
  parserFunc: (f: FileImpl) => [
    {
      parseFrom(source: CodeSource): void;
    },
    {
      textAsHtml(): Promise<string>;
    },
  ],
  code: string,
  delimiter?: string,
): Promise<TransformedCode | undefined> {
  // const ms = Date.now();
  // console.log(`    Parse as ${_what} '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code + (delimiter ? delimiter : ""));
  const file = newFileImpl();

  try {
    const [parser, renderer] = parserFunc(file);
    parser.parseFrom(codeSource);

    if (delimiter) {
      codeSource.remove(delimiter);
    }

    if (
      codeSource.getRemainingCode().trim() ||
      (parser instanceof FileImpl && parser.readParseStatus() !== ParseStatus.valid)
    ) {
      // console.log(`    Parse as ${_what} failed after ${Date.now() - ms}ms`);
      return undefined;
    }

    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    const allCode: string[] = [];

    for (const l of languages) {
      file.setLanguage(l);
      allCode.push(await renderer.textAsHtml());
    }

    incrementCount(_what);

    // console.log(`    Parse as Type succeeded after ${Date.now() - ms}ms`);
    return allCode as TransformedCode;
  } catch (_e) {
    // console.log(`    Parse as ${_what} failed after ${Date.now() - ms}ms`);
    return undefined;
  }
}

function parseAsKeyword(code: string): TransformedCode | undefined {
  // const ms = Date.now();
  const trimmed = code.trim();
  // console.log(`    Parse as keyword '${trimmed}'`);
  if (matchesElanKeyword(trimmed)) {
    incrementCount("Keyword");
    // console.log(`    Parse as keyword succeeded after ${Date.now() - ms}ms`);
    return [
      `<el-kw>${trimmed}</el-kw>`,
      `<el-kw>${trimmed}</el-kw>`,
      `<el-kw>${trimmed}</el-kw>`,
      `<el-kw>${trimmed}</el-kw>`,
      `<el-kw>${trimmed}</el-kw>`,
    ];
  }
  // console.log(`    Parse as keyword failed after ${Date.now() - ms}ms`);
  return undefined;
}

function TypeParserAndRender(file: FileImpl): [TypeField, { textAsHtml(): Promise<string> }] {
  const fr = new TypeField(new GlobalFunction(file));
  return [fr, { textAsHtml: async () => fr.textAsHtml() }];
}

function StatementParserAndRender(
  file: FileImpl,
): [StatementSelector, { textAsHtml(): Promise<string> }] {
  const mf = new MainRoutine(file);
  const ss = new StatementSelector(mf);
  return [ss, { textAsHtml: async () => mf.getChildren()[0].renderAsHtml() }];
}

function FunctionStatementParserAndRender(
  file: FileImpl,
): [StatementSelector, { textAsHtml(): Promise<string> }] {
  const gf = new GlobalFunction(file);
  const ss = new StatementSelector(gf);
  return [ss, { textAsHtml: async () => gf.getChildren()[0].renderAsHtml() }];
}

function FunctionParserAndRender(
  file: FileImpl,
): [AbstractSelector, { textAsHtml(): Promise<string> }] {
  const gs = new GlobalSelector(file);
  file.getChildren().push(gs);
  const ss = file.getFirstSelectorAsDirectChild();

  return [ss, { textAsHtml: async () => file.getChildren()[0].renderAsHtml() }];
}

function MainParserAndRender(
  file: FileImpl,
): [AbstractSelector, { textAsHtml(): Promise<string> }] {
  const ss = new GlobalSelector(file);
  return [ss, { textAsHtml: async () => file.getChildren()[0].renderAsHtml() }];
}

function MemberParserAndRender(
  file: FileImpl,
): [AbstractSelector, { textAsHtml(): Promise<string> }] {
  const cc = new ConcreteClass(file);
  const ms = new MemberSelector(cc);
  return [ms, { textAsHtml: async () => cc.getChildren()[1].renderAsHtml() }];
}

function AbstractMemberParserAndRender(
  file: FileImpl,
): [AbstractSelector, { textAsHtml(): Promise<string> }] {
  const cc = new AbstractClass(file);
  const ms = new MemberSelector(cc);
  return [ms, { textAsHtml: async () => cc.getChildren()[0].renderAsHtml() }];
}

function ExpressionrParserAndRender(
  file: FileImpl,
): [ExpressionField, { textAsHtml(): Promise<string> }] {
  const mf = new MainRoutine(file);
  const ls = new VariableStatement(mf);
  const expr = new ExpressionField(ls);

  return [expr, { textAsHtml: async () => expr.textAsHtml() }];
}

function ParameterParserAndRender(
  file: FileImpl,
): [ParamListField, { textAsHtml(): Promise<string> }] {
  const gf = new GlobalFunction(file);
  const pp = new ParamListField(gf);

  return [pp, { textAsHtml: async () => pp.textAsHtml() }];
}

function LambdaParserAndRender(file: FileImpl): [ArgListField, { textAsHtml(): Promise<string> }] {
  const ss = new ProcedureCall(file);
  const args = ss.args;

  return [args, { textAsHtml: async () => args.textAsHtml() }];
}

function FileWithHeaderParserAndRender(
  file: FileImpl,
): [FileImpl, { textAsHtml(): Promise<string> }] {
  file.getChildren().push(file.newChildSelector());
  return [file, { textAsHtml: async () => await file.renderAsHtml(false) }];
}

function FileParserAndRender(file: FileImpl): [
  {
    parseFrom(source: CodeSource): void;
  },
  { textAsHtml(): Promise<string> },
] {
  file.getChildren().push(file.newChildSelector());

  return [
    { parseFrom: (source: CodeSource) => file.parseBodyFrom(source) },
    { textAsHtml: async () => await file.renderAsHtml(false) },
  ];
}

function failedToParse(code: string) {
  log(` - Failed to parse code: '${code}'`);
  return languages.map(() => `Code does not parse as Elan.`) as TransformedCode;
}

// Parse Keyword: 56 times
// Parse Expression: 133 times
// Parse Statement: 14 times
// Parse Type: 6 times
// Parse Function: 10 times
// Parse File: 25 times

export async function processInnerCode(code: string): Promise<TransformedCode> {
  code = (code.startsWith("#") ? code : code.trim()) + "\n";
  code = code.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
  const hasHeader = code.includes("guest default_profile valid");
  return (
    parseAsKeyword(code) ||
    (await parseAs("Type", TypeParserAndRender, code)) ||
    (await parseAs("Expression", ExpressionrParserAndRender, code)) ||
    (await parseAs("Statement", StatementParserAndRender, code)) ||
    (await parseAs("Function", FunctionParserAndRender, code)) ||
    (await parseAs("FunctionStatement", FunctionStatementParserAndRender, code)) ||
    (await parseAs("Main", MainParserAndRender, code)) ||
    (await parseAs("Member", MemberParserAndRender, code)) ||
    (await parseAs("AbstractMember", AbstractMemberParserAndRender, code)) ||
    (await parseAs("Parameter", ParameterParserAndRender, code.trim(), ")")) ||
    (await parseAs("Lambda", LambdaParserAndRender, code.trim(), ")")) ||
    (hasHeader
      ? await parseAs("FileWithHeader", FileWithHeaderParserAndRender, code)
      : await parseAs("File", FileParserAndRender, code)) ||
    failedToParse(code)
  );
}

function ct(tag: string) {
  switch (tag) {
    case codeTag:
      return "<code>";
    case codeEndTag:
      return "</code>";
    case codeBlockTag:
      return "<codeblock>";
    case codeBlockEndTag:
      return "</codeblock>";
  }
  return tag;
}

function lt(tag: string, start: boolean) {
  switch (tag) {
    case codeTag:
      return start ? "<span" : "</span>";
    case codeBlockTag:
      return start ? "<div" : "</div>";
  }
  return tag;
}

export async function processElanCode(codeAndTag: string, startTag: string, endTag: string) {
  // const ms = Date.now();
  // console.log(`Processing Elan Code`);

  const s = codeAndTag.indexOf(startTag) + startTag.length;
  const e = codeAndTag.indexOf(endTag);
  const code = codeAndTag.slice(s, e);

  // console.log(`  Processing Elan Code '${code}' after ${Date.now() -ms}ms`)

  const processed: string[] = [];

  const pCode = await processInnerCode(code);
  let index = 0;

  for (const l of languages) {
    const cc = pCode[index++];
    processed.push(
      `${lt(startTag, true)} class="${l.languageHtmlClass}">${cc}${lt(startTag, false)}`,
    );
  }

  const joiner = startTag === codeBlockTag ? "\n" : "";

  // console.log(`  Complete Processing Elan Code '${code}' after ${Date.now() - ms}ms`);

  return `${ct(startTag)}${processed.join(joiner)}${ct(endTag)}`;
}
