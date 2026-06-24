import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { processCode } from "../tools/markupParser";
import { codeBlockEndTag, codeBlockTag, codeEndTag, codeTag } from "../tools/parserConstants";
import { resetFile } from "../tools/codeParser";

const rootdir = `${__dirname}/../../..`;

const docs = `${rootdir}/out/website/documentation/`;

function loadFile(fileName: string): string {
  return readFileSync(fileName, "utf-8");
}

function saveFile(fileName: string, newContent: string) {
  writeFileSync(fileName, newContent);
}

function getDocs(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => s.endsWith(".html"));
}

function updatePaths(contents: string) {
  const repoUrl = `href="../ide/styles/`;
  const prodUrl = `href="../styles/`;
  const from = repoUrl;
  const to = prodUrl;
  const newContents = contents.replaceAll(from, to);
  return newContents;
}

async function updateFile(fileName: string) {
  const ms = Date.now();
  console.log(`Processing: ${fileName}`);

  let contents = loadFile(fileName);
  contents = updatePaths(contents);
  contents = await processCode(contents, codeTag, codeEndTag);
  contents = await processCode(contents, codeBlockTag, codeBlockEndTag);
  console.log(`Finished Processing: ${fileName} in ${Date.now() - ms}ms`);
  saveFile(fileName, contents);
  console.log(`Saved: ${fileName} in ${Date.now() - ms}ms`);
}

export async function processDocumentation() {
  //Promise.all(getDocs(docs).map(fn => updateFile(`${docs}${fn}`)));
  for (const fn of getDocs(docs)) {
    resetFile();
    await updateFile(`${docs}${fn}`);
  }
}

processDocumentation();
