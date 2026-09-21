import { readdirSync, readFileSync, rename, statSync, writeFileSync } from "node:fs";
import { FileImpl } from "../ide/frames/file-impl";
import { CodeSource } from "../ide/frames/frame-interfaces/code-source";
import { parseAs } from "../tools/codeParser";

const rootdir = `${__dirname}/../../..`;

const tests = `${rootdir}/test/compiler/`;

function loadFile(fileName: string): string {
  return readFileSync(fileName, "utf-8");
}

function renameFile(oldName: string, newName: string): void {
  rename(oldName, newName, (err) => {
    if (err) {
      throw err;
    }
    console.log("Rename complete!");
  });
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
    { textAsHtml: async () => await file.renderAsExport() },
  ];
}

async function convertCode(code: string) {
  const result = await parseAs("File", FileParserAndExport, code, false);
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
      const pyCode = (await convertCode(toConvert)).replace(
        "# Python with Elan 2.0.0-beta3",
        "${testPythonHeader}",
      );

      console.warn("py: " + pyCode);
      source = source.replace(code, `\`${pyCode}\``);
    }
  }
  source = source.replace("testHeader", "testPythonHeader");
  source = source.replace('suite("', 'suite("Python ');

  saveFile(fileName.replace(".ref-lang.test.", ".py.test."), source);
}

let _currentDir = "";

export function setCurrentDir(dir: string) {
  _currentDir = dir;
}

export function getTests(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => s.endsWith(".ref-lang.test.ts"));
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

export async function renameTestsInDirectory(dir: string) {
  setCurrentDir(dir);

  for (const fn of getTests(dir)) {
    const nn = fn.replace(".test.", ".ref-lang.test.");
    renameFile(`${dir}${fn}`, `${dir}${nn}`);
  }

  for (const sd of getTestsSubdir(dir)) {
    await renameTestsInDirectory(`${dir}${sd}/`);
  }
}

processTestsInDirectory(tests);

export function processTestFiles() {
  processTestsInDirectory(tests);
}

export function renameTestFiles() {
  renameTestsInDirectory(tests);
}
