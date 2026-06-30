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
import { Profile } from "../ide/frames/profile";
import { ProcedureCall } from "../ide/frames/statements/procedureCall";
import { StatementSelector } from "../ide/frames/statements/statement-selector";
import { VariableStatement } from "../ide/frames/statements/variable-statement";
import { StubInputOutput } from "../ide/stub-input-output";
import { hash } from "../ide/util";
import { codeBlockEndTag, codeBlockTag, codeEndTag, codeTag } from "./parserConstants";

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
    fileImpl = new FileImpl(hash, new Profile(""), "guest", transforms(), stdLib, false, true);
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

async function parseAsFileWithHeader(
  code: string,
): Promise<[string, string, string, string, string] | undefined> {
  // const ms = Date.now();
  // console.log(`    Parse as File with header '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code);
  const file = newFileImpl();

  file.parseFrom(codeSource);

  if (file.parseError) {
    // console.log(`    Parse as File with header failed after ${Date.now() - ms}ms`);
    return undefined;
  }
  file.removeAllSelectorsThatCanBe();
  file.deselectAll();

  const allCode: string[] = [];

  for (const l of languages) {
    file.setLanguage(l);
    allCode.push(await file.renderAsHtml(false));
  }

  // console.log(`    Parse as File with header succeeded after ${Date.now() - ms}ms`);
  return allCode as [string, string, string, string, string];
}

export async function parseAsFile(
  code: string,
): Promise<[string, string, string, string, string] | undefined> {
  // const ms = Date.now();
  // console.log(`    Parse as File '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code);
  const file = newFileImpl();

  file.parseBodyFrom(codeSource);

  if (file.parseError) {
    // console.log(`    Parse as File failed after ${Date.now() - ms}ms`);
    return undefined;
  }
  file.removeAllSelectorsThatCanBe();
  file.deselectAll();

  const allCode: string[] = [];

  for (const l of languages) {
    file.setLanguage(l);
    allCode.push(await file.renderAsHtml(false));
  }

  // console.log(`    Parse as File succeeded after ${Date.now() - ms}ms`);
  return allCode as [string, string, string, string, string];
}

function parseAs(
  _what: string,
  parserFunc: (f: FileImpl) => [
    {
      parseFrom(source: CodeSource): void;
    },
    {
      textAsHtml(): string;
    },
  ],
  code: string,
): [string, string, string, string, string] | undefined {
  // const ms = Date.now();
  // console.log(`    Parse as ${_what} '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code);
  const file = newFileImpl();

  try {
    const [parser, renderer] = parserFunc(file);
    parser.parseFrom(codeSource);

    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    const allCode: string[] = [];

    for (const l of languages) {
      file.setLanguage(l);
      allCode.push(renderer.textAsHtml());
    }

    // console.log(`    Parse as Type succeeded after ${Date.now() - ms}ms`);
    return allCode as [string, string, string, string, string];
  } catch (_e) {
    // console.log(`    Parse as ${_what} failed after ${Date.now() - ms}ms`);
    return undefined;
  }
}

function parseAsKeyword(code: string): [string, string, string, string, string] | undefined {
  // const ms = Date.now();
  const trimmed = code.trim();
  // console.log(`    Parse as keyword '${trimmed}'`);
  if (matchesElanKeyword(trimmed)) {
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

function TypeParserAndRender(file: FileImpl): [TypeField, TypeField] {
  const fr = new TypeField(new GlobalFunction(file));
  return [fr, fr];
}

function StatementParserAndRender(file: FileImpl): [StatementSelector, { textAsHtml(): string }] {
  const mf = new MainRoutine(file);
  const ss = new StatementSelector(mf);
  return [ss, { textAsHtml: () => mf.getChildren()[0].renderAsHtml() }];
}

function FunctionStatementParserAndRender(
  file: FileImpl,
): [StatementSelector, { textAsHtml(): string }] {
  const gf = new GlobalFunction(file);
  const ss = new StatementSelector(gf);
  return [ss, { textAsHtml: () => gf.getChildren()[0].renderAsHtml() }];
}

function FunctionParserAndRender(file: FileImpl): [AbstractSelector, { textAsHtml(): string }] {
  const gs = new GlobalSelector(file);
  file.getChildren().push(gs);
  const ss = file.getFirstSelectorAsDirectChild();

  return [ss, { textAsHtml: () => file.getChildren()[0].renderAsHtml() }];
}

function MainParserAndRender(file: FileImpl): [AbstractSelector, { textAsHtml(): string }] {
  const ss = new GlobalSelector(file);
  return [ss, { textAsHtml: () => file.getChildren()[0].renderAsHtml() }];
}

function MemberParserAndRender(file: FileImpl): [AbstractSelector, { textAsHtml(): string }] {
  const cc = new ConcreteClass(file);
  const ms = new MemberSelector(cc);
  return [ms, { textAsHtml: () => cc.getChildren()[1].renderAsHtml() }];
}

function AbstractMemberParserAndRender(
  file: FileImpl,
): [AbstractSelector, { textAsHtml(): string }] {
  const cc = new AbstractClass(file);
  const ms = new MemberSelector(cc);
  return [ms, { textAsHtml: () => cc.getChildren()[0].renderAsHtml() }];
}

function ExpressionrParserAndRender(file: FileImpl): [ExpressionField, ExpressionField] {
  const mf = new MainRoutine(file);
  const ls = new VariableStatement(mf);
  const expr = new ExpressionField(ls);

  return [expr, expr];
}

function ParameterParserAndRender(file: FileImpl): [ParamListField, ParamListField] {
  const gf = new GlobalFunction(file);
  const pp = new ParamListField(gf);

  return [pp, pp];
}

function LambdaParserAndRender(file: FileImpl): [ArgListField, ArgListField] {
  const ss = new ProcedureCall(file);
  const args = ss.args;

  return [args, args];
}

export async function processInnerCode(
  code: string,
): Promise<[string, string, string, string, string]> {
  code = (code.startsWith("#") ? code : code.trim()) + "\n";
  code = code.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
  const hasHeader = code.includes("guest default_profile valid");
  return (
    parseAsKeyword(code) ||
    parseAs("Type", TypeParserAndRender, code) ||
    parseAs("Statement", StatementParserAndRender, code) ||
    parseAs("FunctionStatement", FunctionStatementParserAndRender, code) ||
    parseAs("Function", FunctionParserAndRender, code) ||
    parseAs("Main", MainParserAndRender, code) ||
    parseAs("Member", MemberParserAndRender, code) ||
    parseAs("AbstractMember", AbstractMemberParserAndRender, code) ||
    parseAs("Expression", ExpressionrParserAndRender, code) ||
    parseAs("Parameter", ParameterParserAndRender, code.trim() + ")") ||
    parseAs("Lambda", LambdaParserAndRender, code.trim() + ")") ||
    (hasHeader ? await parseAsFileWithHeader(code) : await parseAsFile(code)) || [
      `Code does not parse as Elan.`,
      `Code does not parse as Elan.`,
      `Code does not parse as Elan.`,
      `Code does not parse as Elan.`,
      `Code does not parse as Elan.`,
    ]
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
