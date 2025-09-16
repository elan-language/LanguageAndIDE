import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { StdLib } from "../compiler/standard-library/std-lib";
import { transform, transformMany } from "../ide/compile-api/ast-visitor";
import { Transforms } from "../ide/compile-api/transforms";
import { CodeSourceFromString } from "../ide/frames/code-source-from-string";
import { DefaultProfile } from "../ide/frames/default-profile";
import { FileImpl } from "../ide/frames/file-impl";
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

async function loadCodeAsModelNew(): Promise<FileImpl> {
  const fl = new FileImpl(
    hash,
    new DefaultProfile(),
    "guest",
    transforms(),
    new StdLib(new StubInputOutput()),
    true,
  );
  return fl;
}

export async function processWorksheetCode(code: string) {
  let codeSource = new CodeSourceFromString(code);

  const file = await loadCodeAsModelNew();

  let htmlCode = "";

  file.parseBodyFrom(codeSource);

  if (!file.parseError) {
    htmlCode = await file.renderAsHtml();
  } else {
    codeSource = new CodeSourceFromString(code);
    htmlCode = file.parseStatementFrom(codeSource);

    if (file.parseError) {
      codeSource = new CodeSourceFromString(code);
      htmlCode = file.parseMemberFrom(codeSource);
    }
  }

  return htmlCode;
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
