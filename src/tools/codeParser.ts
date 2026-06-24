import { matchesElanKeyword } from "../compiler/elan-keywords";
import { StdLib } from "../compiler/standard-library/std-lib";
import { transform, transformMany } from "../ide/compile-api/ast-visitor";
import { Transforms } from "../ide/compile-api/transforms";
import { MemberSelector } from "../ide/frames/class-members/member-selector";
import { CodeSourceFromString } from "../ide/frames/code-source-from-string";
import { ExpressionField } from "../ide/frames/fields/expression-field";
import { TypeField } from "../ide/frames/fields/type-field";
import { FileImpl } from "../ide/frames/file-impl";
import { Language } from "../ide/frames/frame-interfaces/language";
import { ConcreteClass } from "../ide/frames/globals/concrete-class";
import { GlobalFunction } from "../ide/frames/globals/global-function";
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

function newFileImpl(): FileImpl {
  if (!fileImpl) {
    fileImpl = new FileImpl(hash, new Profile(""), "guest", transforms(), stdLib, false, true);
  }

  const cc = fileImpl.getChildren();

  for (const c of cc) {
    fileImpl.removeChild(c);
  }

  return fileImpl;
}

async function parseAsFileWithHeader(code: string, l: Language) {
  // const ms = Date.now();
  // console.log(`    Parse as File with header '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code);
  const file = newFileImpl();

  file.parseFrom(codeSource);

  if (file.parseError) {
    return "";
  }
  file.removeAllSelectorsThatCanBe();
  file.deselectAll();

  file.setLanguage(l);
  return await file.renderAsHtml(true);
}

export async function parseAsFile(code: string, l: Language) {
  // const ms = Date.now();
  // console.log(`    Parse as File '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code);
  const file = newFileImpl();

  file.parseBodyFrom(codeSource);

  if (file.parseError) {
    return "";
  }
  file.removeAllSelectorsThatCanBe();
  file.deselectAll();

  file.setLanguage(l);
  return await file.renderAsHtml(false);
}

function parseAsStatement(code: string, l: Language) {
  // const ms = Date.now();
  // console.log(`    Parse as Statement '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code + " ");
  const file = newFileImpl();

  try {
    const mf = new MainFrame(file);
    const ss = new StatementSelector(mf);
    ss.parseFrom(codeSource);

    if (file.parseError) {
      return "";
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();
    file.setLanguage(l);
    return mf.getChildren()[0].renderAsHtml();
  } catch (_e) {
    return "";
  }
}

function parseAsFunctionStatement(code: string, l: Language) {
  // const ms = Date.now();
  // console.log(`    Parse as Function '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code + " ");
  const file = newFileImpl();

  try {
    const gf = new GlobalFunction(file);
    const ss = new StatementSelector(gf);
    ss.parseFrom(codeSource);

    if (file.parseError) {
      return "";
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();
    file.setLanguage(l);
    return gf.getChildren()[0].renderAsHtml();
  } catch (_e) {
    return "";
  }
}

function parseAsMain(code: string, l: Language) {
  // const ms = Date.now();
  // console.log(`    Parse as Main '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code + " ");
  const file = newFileImpl();

  try {
    const c = file.getFirstChild();
    file.removeChild(c);
    const gf = new GlobalFunction(file);
    const ss = new StatementSelector(gf);
    ss.parseFrom(codeSource);

    if (file.parseError) {
      return "";
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();
    file.setLanguage(l);
    return gf.getChildren()[0].renderAsHtml();
  } catch (_e) {
    return "";
  }
}

function parseAsMember(code: string, l: Language) {
  // const ms = Date.now();
  // console.log(`    Parse as Member '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code);
  const file = newFileImpl();

  try {
    const cc = new ConcreteClass(file);
    const ms = new MemberSelector(cc);
    ms.parseFrom(codeSource);

    if (file.parseError) {
      return "";
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    file.setLanguage(l);
    return cc.getChildren()[0].renderAsHtml();
  } catch (_e) {
    return "";
  }
}

function parseAsExpression(code: string, l: Language) {
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
      return "";
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    file.setLanguage(l);
    return expr.textAsHtml();
  } catch (_e) {
    return "";
  }
}

function parseAsType(code: string, l: Language) {
  // const ms = Date.now();
  // console.log(`    Parse as Type '${code.trim()}'`);

  const codeSource = new CodeSourceFromString(code);
  const file = newFileImpl();

  try {
    const f = new GlobalFunction(file);
    const expr = new TypeField(f);
    expr.parseFrom(codeSource);

    if (expr.readParseStatus() !== ParseStatus.valid) {
      // console.log(`    Parse as Type failed after ${Date.now() -ms}ms`);
      return "";
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();
    file.setLanguage(l);
    const txt = expr.textAsHtml();
    // console.log(`    Parse as Type succeeded after ${Date.now() -ms}ms`);
    return txt;
  } catch (_e) {
    // console.log(`    Parse as Type failed after ${Date.now() -ms}ms`);
    return "";
  }
}

function parseAsKeyword(code: string) {
  // const ms = Date.now();
  const trimmed = code.trim();
  // console.log(`    Parse as keyword '${trimmed}'`);
  if (matchesElanKeyword(trimmed)) {
    // console.log(`    Parse as keyword succeeded after ${Date.now() -ms}ms`);
    return `<el-kw>${trimmed}</el-kw>`;
  }
  // console.log(`    Parse as keyword failed after ${Date.now() -ms}ms`);
  return "";
}

export async function processInnerCode(code: string, l: Language) {
  code = code.trim() + "\n";
  code = code.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
  const hasHeader = code.includes("guest default_profile valid");
  return (
    parseAsKeyword(code) ||
    parseAsType(code, l) ||
    (hasHeader ? await parseAsFileWithHeader(code, l) : await parseAsFile(code, l)) ||
    parseAsStatement(code, l) ||
    parseAsFunctionStatement(code, l) ||
    parseAsMain(code, l) ||
    parseAsMember(code, l) ||
    parseAsExpression(code, l) ||
    `Code does not parse as Elan.`
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
  // console.log(`Processing Elan Code`)

  const s = codeAndTag.indexOf(startTag) + startTag.length;
  const e = codeAndTag.indexOf(endTag);
  const code = codeAndTag.slice(s, e);

  // (`  Processing Elan Code '${code}' after ${Date.now() -ms}ms`)

  const languages = [
    LanguageElan.Instance,
    LanguagePython.Instance,
    LanguageCS.Instance,
    LanguageVB.Instance,
    LanguageJava.Instance,
  ];

  // const processed: string[] = [];

  // for (const l of languages) {
  //   const cc = await processInnerCode(code, l);
  //   processed.push(
  //     `${lt(startTag, true)} class="${l.languageHtmlClass}">${cc}${lt(startTag, false)}`,
  //   );
  // }

  const codeAndLanguage = languages.map(
    (l) => [processInnerCode(code, l), l] as [Promise<string>, Language],
  );
  const processedCode = await Promise.all(codeAndLanguage.map((c) => c[0]));
  const matchLanguage = codeAndLanguage.map((c) => c[1]);

  let index = 0;
  const processed = processedCode.map(
    (cc) =>
      `${lt(startTag, true)} class="${matchLanguage[index++].languageHtmlClass}">${cc}${lt(startTag, false)}`,
  );

  const joiner = startTag === codeBlockTag ? "\n" : "";

  // console.log(`  Complete Processing Elan Code '${code}' after ${Date.now() -ms}ms`)

  return `${ct(startTag)}${processed.join(joiner)}${ct(endTag)}`;
}
