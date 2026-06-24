import { matchesElanKeyword } from "../compiler/elan-keywords";
import { StdLib } from "../compiler/standard-library/std-lib";
import { transform, transformMany } from "../ide/compile-api/ast-visitor";
import { Transforms } from "../ide/compile-api/transforms";
import { MemberSelector } from "../ide/frames/class-members/member-selector";
import { CodeSourceFromString } from "../ide/frames/code-source-from-string";
import { ExpressionField } from "../ide/frames/fields/expression-field";
import { TypeField } from "../ide/frames/fields/type-field";
import { FileImpl } from "../ide/frames/file-impl";
import { ConcreteClass } from "../ide/frames/globals/concrete-class";
import { GlobalFunction } from "../ide/frames/globals/global-function";
import { GlobalSelector } from "../ide/frames/globals/global-selector";
import { MainFrame } from "../ide/frames/globals/main-frame";
import { LanguageCS } from "../ide/frames/language-cs";
import { LanguageElan } from "../ide/frames/language-elan";
import { LanguageJava } from "../ide/frames/language-java";
import { LanguagePython } from "../ide/frames/language-python";
import { LanguageVB } from "../ide/frames/language-vb";
import { Profile } from "../ide/frames/profile";
import { StatementSelector } from "../ide/frames/statements/statement-selector";
import { VariableStatement } from "../ide/frames/statements/variable-statement";
import { ParseStatus } from "../ide/frames/status-enums";
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

//let resetCount = 0;

function newFileImpl(): FileImpl {
  // if (resetCount++ > 75) {
  //   resetFile();
  // }

  if (!fileImpl) {
    fileImpl = new FileImpl(hash, new Profile(""), "guest", transforms(), stdLib, false, true);
  }

  const cc = fileImpl.getChildren();

  for (const c of cc) {
    fileImpl.removeChild(c);
  }

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

function parseAsStatement(code: string): [string, string, string, string, string] | undefined {
  // const ms = Date.now();
  // console.log(`    Parse as Statement '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code + " ");
  const file = newFileImpl();

  try {
    const mf = new MainFrame(file);
    const ss = new StatementSelector(mf);
    ss.parseFrom(codeSource);

    if (file.parseError) {
      // console.log(`    Parse as Statement failed after ${Date.now() - ms}ms`);
      return undefined;
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    const allCode: string[] = [];

    for (const l of languages) {
      file.setLanguage(l);
      allCode.push(mf.getChildren()[0].renderAsHtml());
    }

    // console.log(`    Parse as Statement succeeded after ${Date.now() - ms}ms`);
    return allCode as [string, string, string, string, string];
  } catch (_e) {
    // console.log(`    Parse as Statement failed after ${Date.now() - ms}ms`);
    return undefined;
  }
}

function parseAsFunctionStatement(
  code: string,
): [string, string, string, string, string] | undefined {
  // const ms = Date.now();
  // console.log(`    Parse as Function '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code + " ");
  const file = newFileImpl();

  try {
    const gf = new GlobalFunction(file);
    const ss = new StatementSelector(gf);
    ss.parseFrom(codeSource);

    if (file.parseError) {
      // console.log(`    Parse as Function failed after ${Date.now() - ms}ms`);
      return undefined;
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    const allCode: string[] = [];

    for (const l of languages) {
      file.setLanguage(l);
      allCode.push(gf.getChildren()[0].renderAsHtml());
    }

    // console.log(`    Parse as Function succeeded after ${Date.now() - ms}ms`);
    return allCode as [string, string, string, string, string];
  } catch (_e) {
    // console.log(`    Parse as Function failed after ${Date.now() - ms}ms`);
    return undefined;
  }
}

function parseAsMain(code: string): [string, string, string, string, string] | undefined {
  // const ms = Date.now();
  // console.log(`    Parse as Main '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code + " ");
  const file = newFileImpl();

  try {
    const ss = new GlobalSelector(file);
    ss.parseFrom(codeSource);

    if (file.parseError) {
      // console.log(`    Parse as Main failed after ${Date.now() - ms}ms`);
      return undefined;
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    const allCode: string[] = [];

    for (const l of languages) {
      file.setLanguage(l);
      allCode.push(file.getChildren()[0].renderAsHtml());
    }

    // console.log(`    Parse as Main succeeded after ${Date.now() - ms}ms`);
    return allCode as [string, string, string, string, string];
  } catch (_e) {
    // console.log(`    Parse as Main failed after ${Date.now() - ms}ms`);
    return undefined;
  }
}

function parseAsMember(code: string): [string, string, string, string, string] | undefined {
  // const mss = Date.now();
  // console.log(`    Parse as Member '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code);
  const file = newFileImpl();

  try {
    const cc = new ConcreteClass(file);
    const ms = new MemberSelector(cc);
    ms.parseFrom(codeSource);

    if (file.parseError) {
      // console.log(`    Parse as Member failed after ${Date.now() - mss}ms`);
      return undefined;
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    const allCode: string[] = [];

    for (const l of languages) {
      file.setLanguage(l);
      allCode.push(cc.getChildren()[0].renderAsHtml());
    }

    // console.log(`    Parse as Member succeeded after ${Date.now() - ms}ms`);
    return allCode as [string, string, string, string, string];
  } catch (_e) {
    // console.log(`    Parse as Member failed after ${Date.now() - mss}ms`);
    return undefined;
  }
}

function parseAsExpression(code: string): [string, string, string, string, string] | undefined {
  // const ms = Date.now();
  // console.log(`    Parse as Expression '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code);
  const file = newFileImpl();

  try {
    const mf = new MainFrame(file);
    const ls = new VariableStatement(mf);
    const expr = new ExpressionField(ls);
    expr.parseFrom(codeSource);

    if (expr.readParseStatus() !== ParseStatus.valid) {
      // console.log(`    Parse as Expression failed after ${Date.now() - ms}ms`);
      return undefined;
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    const allCode: string[] = [];

    for (const l of languages) {
      file.setLanguage(l);
      allCode.push(expr.textAsHtml());
    }

    // console.log(`    Parse as Expression succeeded after ${Date.now() - ms}ms`);
    return allCode as [string, string, string, string, string];
  } catch (_e) {
    // console.log(`    Parse as Expression failed after ${Date.now() - ms}ms`);
    return undefined;
  }
}

function parseAsType(code: string): [string, string, string, string, string] | undefined {
  // const ms = Date.now();
  // console.log(`    Parse as Type '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code);
  const file = newFileImpl();

  try {
    const f = new GlobalFunction(file);
    const expr = new TypeField(f);
    expr.parseFrom(codeSource);

    if (expr.readParseStatus() !== ParseStatus.valid) {
      // console.log(`    Parse as Type failed after ${Date.now() - ms}ms`);
      return undefined;
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    const allCode: string[] = [];

    for (const l of languages) {
      file.setLanguage(l);
      allCode.push(expr.textAsHtml());
    }

    // console.log(`    Parse as Type succeeded after ${Date.now() - ms}ms`);
    return allCode as [string, string, string, string, string];
  } catch (_e) {
    // console.log(`    Parse as Type failed after ${Date.now() - ms}ms`);
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

export async function processInnerCode(
  code: string,
): Promise<[string, string, string, string, string]> {
  code = code.trim() + "\n";
  code = code.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
  const hasHeader = code.includes("guest default_profile valid");
  return (
    parseAsKeyword(code) ||
    parseAsType(code) ||
    parseAsStatement(code) ||
    parseAsFunctionStatement(code) ||
    parseAsMain(code) ||
    parseAsMember(code) ||
    parseAsExpression(code) ||
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

  // (`  Processing Elan Code '${code}' after ${Date.now() -ms}ms`)

  const processed: string[] = [];

  const pCode = await processInnerCode(code);
  let index = 0;

  for (const l of languages) {
    const cc = pCode[index++];
    processed.push(
      `${lt(startTag, true)} class="${l.languageHtmlClass}">${cc}${lt(startTag, false)}`,
    );
  }

  // const codeAndLanguage = languages.map(
  //   (l) => [processInnerCode(code, l), l] as [Promise<string>, Language],
  // );
  // const processedCode = await Promise.all(codeAndLanguage.map((c) => c[0]));
  // const matchLanguage = codeAndLanguage.map((c) => c[1]);

  // let index = 0;
  // const processed = processedCode.map(
  //   (cc) =>
  //     `${lt(startTag, true)} class="${matchLanguage[index++].languageHtmlClass}">${cc}${lt(startTag, false)}`,
  // );

  const joiner = startTag === codeBlockTag ? "\n" : "";

  // console.log(`  Complete Processing Elan Code '${code}' after ${Date.now() - ms}ms`);

  return `${ct(startTag)}${processed.join(joiner)}${ct(endTag)}`;
}
