import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { CodeSourceFromString } from "./frames/code-source";
import { DefaultProfile } from "./frames/default-profile";
import { FileImpl } from "./frames/file-impl";
import { elanVersion } from "./production";
import { hash } from "./util";
import { transforms } from "./frames/syntax-nodes/ast-helpers";

const demos = `${__dirname}/../../demo_programs/`;
const snippets = `${__dirname}/../../documentation/CodeSnippets/`;
const tests = `${__dirname}/../../test/files/`;

function loadFileAsSourceNew(sourceFile: string): string {
  return readFileSync(sourceFile, "utf-8");
}

function updateTestFileNew(testDoc: string, newContent: string) {
  writeFileSync(testDoc, newContent);
}

function getElanFiles(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => s.endsWith(".elan"));
}

async function loadFileAsModelNew(sourceFile: string): Promise<FileImpl> {
  const source = loadFileAsSourceNew(sourceFile);
  const codeSource = new CodeSourceFromString(source);
  const fl = new FileImpl(hash, new DefaultProfile(), "guest", transforms(), true);
  await fl.parseFrom(codeSource);
  if (fl.parseError) {
    throw new Error(`${sourceFile}: ${fl.parseError}`);
  }
  return fl;
}

async function updateDemoProgram(fileName: string) {
  const file = await loadFileAsModelNew(fileName);

  file.setVersion(elanVersion.major, elanVersion.minor, elanVersion.patch, elanVersion.preRelease);

  const updatedContent = await file.renderAsSource();

  updateTestFileNew(fileName, updatedContent);
}

for (const fn of getElanFiles(demos)) {
  updateDemoProgram(`${demos}${fn}`);
}

for (const fn of getElanFiles(snippets)) {
  updateDemoProgram(`${snippets}${fn}`);
}

for (const fn of getElanFiles(tests)) {
  updateDemoProgram(`${tests}${fn}`);
}
