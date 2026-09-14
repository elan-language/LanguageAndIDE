import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { parseAs } from "../tools/codeParser";
import { FileImpl } from "../ide/frames/file-impl";
import { CodeSource } from "../ide/frames/frame-interfaces/code-source";

const rootdir = `${__dirname}/../../..`;

const tests = `${rootdir}/test/compiler/`;

function loadFile(fileName: string): string {
  return readFileSync(fileName, "utf-8");
}

function saveFile(fileName: string, newContent: string) {
  writeFileSync(fileName, newContent);
}

export function FileParserAndExport(file: FileImpl): [
  {
    parseFrom(source: CodeSource): void;
  },
  { textAsHtml(): Promise<string> },
] {
  file.getChildren().push(file.newChildSelector());

  return [
    { parseFrom: (source: CodeSource) => file.parseBodyFrom(source) },
    { textAsHtml: async () => await file.renderAsSource() },
  ];
}

async function convertCode(code: string) {
  const result = await parseAs("File", FileParserAndExport, code);
  return result ? result[1] : "";
}

export async function processTestFile(fileName: string) {
  let source = loadFile(fileName);

  const regexp = /`\$[\s\S]*?`/g;

  const codeBlocks = [...source.matchAll(regexp)];

  for (const array of codeBlocks) {
    for (const code of array) {
      const toConvert = code.replace("${testHeader}", "").replaceAll("`", "").trim();
      console.warn(toConvert.slice(0, 20));
      const pyCode = await convertCode(code);
      console.warn("py: " + pyCode);
      source = source.replace(code, `\`\$\{testHeader} ${pyCode}\``);
    }
  }

  saveFile(fileName.replace(".test.", ".test.py."), source);
}

let _currentDir = "";

export function setCurrentDir(dir: string) {
  _currentDir = dir;
}

export function getTests(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => s.endsWith(".test.ts"));
}

export function getTestsSubdir(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => statSync(sourceDir + "/" + s).isDirectory());
}

export async function processTestsInDirectory(dir: string) {
  setCurrentDir(dir);

  for (const fn of getTests(dir)) {
    await processTestFile(`${dir}${fn}`);
  }

  for (const sd of getTestsSubdir(dir)) {
    await processTestsInDirectory(`${dir}${sd}/`);
  }
}

processTestsInDirectory(tests);
