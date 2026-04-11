import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { processCode } from "../tools/markupParser";
import { codeBlockEndTag, codeBlockTag, codeEndTag, codeTag } from "../tools/parserConstants";

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
  let contents = loadFile(fileName);
  contents = updatePaths(contents);
  contents = await processCode(contents, codeTag, codeEndTag);
  contents = await processCode(contents, codeBlockTag, codeBlockEndTag);
  saveFile(fileName, contents);
}

export async function processDocumentation() {
  for (const fn of getDocs(docs)) {
    await updateFile(`${docs}${fn}`);
  }
}

processDocumentation();
