import { hash } from "../ide/util";
import { allKeywords } from "../compiler/keywords";
import { StdLib } from "../compiler/standard-library/std-lib";
import { MemberSelector } from "../ide/frames/class-members/member-selector";
import { CodeSourceFromString } from "../ide/frames/code-source-from-string";
import { DefaultProfile } from "../ide/frames/default-profile";
import { ExpressionField } from "../ide/frames/fields/expression-field";
import { TypeField } from "../ide/frames/fields/type-field";
import { FileImpl } from "../ide/frames/file-impl";
import { ConcreteClass } from "../ide/frames/globals/concrete-class";
import { MainFrame } from "../ide/frames/globals/main-frame";
import { LetStatement } from "../ide/frames/statements/let-statement";
import { StatementSelector } from "../ide/frames/statements/statement-selector";
import { ParseStatus } from "../ide/frames/status-enums";
import { StubInputOutput } from "../ide/stub-input-output";
import { transform, transformMany } from "../ide/compile-api/ast-visitor";
import { Transforms } from "../ide/compile-api/transforms";
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
    true,
  );
}

async function parseAsFileWithHeader(code: string) {
  const codeSource = new CodeSourceFromString(code);
  const file = await newFileImpl();

  file.parseFrom(codeSource);

  if (file.parseError) {
    return "";
  }
  file.removeAllSelectorsThatCanBe();
  file.deselectAll();

  return await file.renderAsHtml(true);
}

async function parseAsFile(code: string) {
  const codeSource = new CodeSourceFromString(code);
  const file = await newFileImpl();

  file.parseBodyFrom(codeSource);

  if (file.parseError) {
    return "";
  }
  file.removeAllSelectorsThatCanBe();
  file.deselectAll();

  return await file.renderAsHtml(false);
}

async function parseAsStatement(code: string) {
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

    return mf.getChildren()[0].renderAsHtml();
  } catch (_e) {
    return "";
  }
}

async function parseAsMember(code: string) {
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

    return cc.getChildren()[0].renderAsHtml();
  } catch (_e) {
    return "";
  }
}

async function parseAsExpression(code: string) {
  const codeSource = new CodeSourceFromString(code);
  const file = await newFileImpl();

  try {
    const mf = new MainFrame(file);
    const ls = new LetStatement(mf);
    const expr = new ExpressionField(ls);
    expr.parseFrom(codeSource);

    if (expr.readParseStatus() !== ParseStatus.valid) {
      return "";
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    return expr.textAsHtml();
  } catch (_e) {
    return "";
  }
}

async function parseAsType(code: string) {
  const codeSource = new CodeSourceFromString(code);
  const file = await newFileImpl();

  try {
    const mf = new MainFrame(file);
    const ls = new LetStatement(mf);
    const expr = new TypeField(ls);
    expr.parseFrom(codeSource);

    if (expr.readParseStatus() !== ParseStatus.valid) {
      return "";
    }
    file.removeAllSelectorsThatCanBe();
    file.deselectAll();

    return expr.textAsHtml();
  } catch (_e) {
    return "";
  }
}

async function parseAsKeyword(code: string) {
  const trimmed = code.trim();
  if (allKeywords.includes(trimmed)) {
    return `<el-kw>${trimmed}</el-kw>`;
  }

  return "";
}

export async function processInnerCode(code: string) {
  const hasHeader = code.includes("guest default_profile valid");
  return (
    (await parseAsKeyword(code)) ||
    (hasHeader ? await parseAsFileWithHeader(code) : await parseAsFile(code)) ||
    (await parseAsStatement(code)) ||
    (await parseAsMember(code)) ||
    (await parseAsExpression(code)) ||
    (await parseAsType(code)) ||
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
      return "<el-code-block>";
    case codeBlockEndTag:
      return "</el-code-block>";
  }
  return tag;
}

export async function processWorksheetCode(codeAndTag: string, startTag: string, endTag: string) {
  const s = codeAndTag.indexOf(startTag) + startTag.length;
  const e = codeAndTag.indexOf(endTag);
  const code = codeAndTag.slice(s, e);

  const processed = await processInnerCode(code);

  return `${transformCodeTag(startTag)}${processed}${transformCodeTag(endTag)}`;
}
