import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { processCode } from "../tools/codeParser";
import { processSteps } from "../tools/markupParser";

const rootdir = `${__dirname}/../../..`;

const worksheets = `${rootdir}/src/raw_worksheets/`;

function loadFileAsSourceNew(sourceFile: string): string {
  return readFileSync(sourceFile, "utf-8");
}

function updateFileNew(testDoc: string, newContent: string) {
  writeFileSync(testDoc, newContent);
}

function getWorksheets(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => s.endsWith(".html"));
}

async function processWorksheet(fileName: string) {
  const source = loadFileAsSourceNew(fileName);

  let updatedContent = await processCode(source);
  updatedContent = await processSteps(updatedContent);

  updateFileNew(fileName + ".out", updatedContent);
}

for (const fn of getWorksheets(worksheets)) {
  processWorksheet(`${worksheets}${fn}`);
}
