import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { isElanProduction } from "../environment";

const rootdir = `${__dirname}/../../..`;

const worksheets = `${rootdir}/src/documentation/worksheets/`;

function loadFile(fileName: string): string {
  return readFileSync(fileName, "utf-8");
}

function updateFile(fileName: string, newContent: string) {
  writeFileSync(fileName, newContent);
}

function getWorksheets(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => s.endsWith(".html"));
}

function updateWorksheet(fileName: string) {
  const contents = loadFile(fileName);
  const prodUrl = `https://elan-lang.org/`;
  const devUrl = `https://elan-language.github.io/LanguageAndIDE/`;
  const from = isElanProduction ? devUrl : prodUrl;
  const to = isElanProduction ? prodUrl : devUrl;
  const newContents = contents.replaceAll(from, to);
  updateFile(fileName, newContents);
}

for (const fn of getWorksheets(worksheets)) {
  updateWorksheet(`${worksheets}${fn}`);
}
