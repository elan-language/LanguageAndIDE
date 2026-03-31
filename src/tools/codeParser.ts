import { matchesElanKeyword } from "../compiler/elan-keywords";
import { StdLib } from "../compiler/standard-library/std-lib";
import { transform, transformMany } from "../ide/compile-api/ast-visitor";
import { Transforms } from "../ide/compile-api/transforms";
import { MemberSelector } from "../ide/frames/class-members/member-selector";
import { CodeSourceFromString } from "../ide/frames/code-source-from-string";
import { DefaultProfile } from "../ide/frames/default-profile";
import { ExpressionField } from "../ide/frames/fields/expression-field";
import { TypeField } from "../ide/frames/fields/type-field";
import { FileImpl } from "../ide/frames/file-impl";
import { Language } from "../ide/frames/frame-interfaces/language";
import { ConcreteClass } from "../ide/frames/globals/concrete-class";
import { MainFrame } from "../ide/frames/globals/main-frame";
import { LanguageCS } from "../ide/frames/language-cs";
import { LanguageElan } from "../ide/frames/language-elan";
import { LanguageJava } from "../ide/frames/language-java";
import { LanguagePython } from "../ide/frames/language-python";
import { LanguageVB } from "../ide/frames/language-vb";
import { ConstantStatement } from "../ide/frames/statements/constant-statement";
import { StatementSelector } from "../ide/frames/statements/statement-selector";
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

async function newFileImpl(): Promise<FileImpl> {
  return new FileImpl(
    hash,
    new DefaultProfile(),
    "guest",
    transforms(),
    new StdLib(new StubInputOutput()),
    false,
    true,
  );
}

async function parseAsFileWithHeader(code: string, l: Language) {
  const codeSource = new CodeSourceFromString(code);
  const file = await newFileImpl();

  file.parseFrom(codeSource);

  if (file.parseError) {
    return "";
  }
  file.removeAllSelectorsThatCanBe();
  file.deselectAll();

  file.setLanguage(l);
  return await file.renderAsHtml(true);
}

async function parseAsFile(code: string, l: Language) {
  const codeSource = new CodeSourceFromString(code);
  const file = await newFileImpl();

  file.parseBodyFrom(codeSource);

  if (file.parseError) {
    return "";
  }
  file.removeAllSelectorsThatCanBe();
  file.deselectAll();

  file.setLanguage(l);
  return await file.renderAsHtml(false);
}

async function parseAsStatement(code: string, l: Language) {
  const codeSource = new CodeSourceFromString(code + " ");
  const file = await newFileImpl();

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

async function parseAsMember(code: string, l: Language) {
  const codeSource = new CodeSourceFromString(code);
  const file = await newFileImpl();

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

async function parseAsExpression(code: string, l: Language) {
  const codeSource = new CodeSourceFromString(code);
  const file = await newFileImpl();

  try {
    const mf = new MainFrame(file);
    const ls = new ConstantStatement(mf);
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

async function parseAsType(code: string, l: Language) {
  const codeSource = new CodeSourceFromString(code);
  const file = await newFileImpl();

  try {
    const mf = new MainFrame(file);
    const ls = new ConstantStatement(mf);
    const expr = new TypeField(ls);
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

async function parseAsKeyword(code: string) {
  const trimmed = code.trim();
  if (matchesElanKeyword(trimmed)) {
    return `<el-kw>${trimmed}</el-kw>`;
  }
  return "";
}

export async function processInnerCode(code: string, l: Language) {
  code = code.trim() + "\n";
  const hasHeader = code.includes("guest default_profile valid");
  return (
    (await parseAsKeyword(code)) ||
    (hasHeader ? await parseAsFileWithHeader(code, l) : await parseAsFile(code, l)) ||
    (await parseAsStatement(code, l)) ||
    (await parseAsMember(code, l)) ||
    (await parseAsExpression(code, l)) ||
    (await parseAsType(code, l)) ||
    `${code} Code does not parse as Elan.`
  );
}

function transformCodeTag(tag: string) {
  switch (tag) {
    case codeTag:
      return "<el-code>";
    case codeEndTag:
      return "</el-code>";
    case codeBlockTag:
      return "<codeblock>";
    case codeBlockEndTag:
      return "</codeblock>";
  }
  return tag;
}

export async function processElanCode(codeAndTag: string, startTag: string, endTag: string) {
  const s = codeAndTag.indexOf(startTag) + startTag.length;
  const e = codeAndTag.indexOf(endTag);
  const code = codeAndTag.slice(s, e);
  const languages = [
    LanguageElan.Instance,
    LanguagePython.Instance,
    LanguageCS.Instance,
    LanguageVB.Instance,
    LanguageJava.Instance,
  ];

  const processed: string[] = [];

  for (const l of languages) {
    const cc = await processInnerCode(code, l);
    processed.push(`<div class="${l.languageHtmlClass}">${cc}</div>`);
  }

  return `${transformCodeTag(startTag)}${processed.join("\n")}${transformCodeTag(endTag)}`;
}
