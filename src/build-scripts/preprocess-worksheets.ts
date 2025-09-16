import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { allKeywords } from "../compiler/keywords";
import { StdLib } from "../compiler/standard-library/std-lib";
import { transform, transformMany } from "../ide/compile-api/ast-visitor";
import { Transforms } from "../ide/compile-api/transforms";
import { MemberSelector } from "../ide/frames/class-members/member-selector";
import { CodeSourceFromString } from "../ide/frames/code-source-from-string";
import { DefaultProfile } from "../ide/frames/default-profile";
import { ExpressionField } from "../ide/frames/fields/expression-field";
import { FileImpl } from "../ide/frames/file-impl";
import { ConcreteClass } from "../ide/frames/globals/concrete-class";
import { MainFrame } from "../ide/frames/globals/main-frame";
import { LetStatement } from "../ide/frames/statements/let-statement";
import { StatementSelector } from "../ide/frames/statements/statement-selector";
import { ParseStatus } from "../ide/frames/status-enums";
import { StubInputOutput } from "../ide/stub-input-output";
import { hash } from "../ide/util";

const rootdir = `${__dirname}/../../..`;

const worksheets = `${rootdir}/src/raw_worksheets/`;

function transforms(): Transforms {
  return {
    transform: transform,
    transformMany: transformMany,
  };
}

function loadFileAsSourceNew(sourceFile: string): string {
  return readFileSync(sourceFile, "utf-8");
}

function updateFileNew(testDoc: string, newContent: string) {
  writeFileSync(testDoc, newContent);
}

function getWorksheets(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => s.endsWith(".html"));
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

async function parseAsFile(code: string) {
  const codeSource = new CodeSourceFromString(code);
  const file = await newFileImpl();

  file.parseBodyFrom(codeSource);

  if (file.parseError) {
    return "";
  }

  return await file.renderAsHtml();
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

export async function processWorksheetCode(code: string) {
  return (
    (await parseAsKeyword(code)) ||
    (await parseAsFile(code)) ||
    (await parseAsStatement(code)) ||
    (await parseAsMember(code)) ||
    (await parseAsExpression(code)) ||
    `${code} `
  );
}

async function processWorksheet(fileName: string) {
  const source = loadFileAsSourceNew(fileName);

  const codeStart = source.indexOf("<code>");
  const codeEnd = source.indexOf("</code>");

  const code = source.slice(codeStart + 6, codeEnd);

  const htmlCode = await processWorksheetCode(code);

  const updatedContent = source.slice(0, codeStart + 6) + htmlCode + source.slice(codeEnd);

  updateFileNew(fileName + ".out", updatedContent);
}

for (const fn of getWorksheets(worksheets)) {
  processWorksheet(`${worksheets}${fn}`);
}
