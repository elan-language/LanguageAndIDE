import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { log, resetFile } from "../tools/codeParser";
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

export function getDocs(sourceDir: string): string[] {
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

function fileName(fn: string) {
  const path = fn.split("/");
  return path[path.length - 1];
}

export async function processDocument(fileAndPath: string): Promise<[string, string]> {
  const ms = Date.now();
  log(`Processing: ${fileName(fileAndPath)}`);

  let contents = loadFile(fileAndPath);

  // don't double processs
  if (contents.includes(`<span class="python">`)) {
    return [fileAndPath, contents];
  }

  contents = updatePaths(contents);
  contents = await processCode(contents, codeTag, codeEndTag);
  contents = await processCode(contents, codeBlockTag, codeBlockEndTag);
  log(`Finished Processing: ${fileName(fileAndPath)} in ${Date.now() - ms}ms`);
  return [fileAndPath, contents];
}

export async function processDocumentation(fileNames: string[]) {
  const results: [string, string][] = [];

  for (const fn of fileNames) {
    resetFile();
    results.push(await processDocument(fn));
  }

  return results;
}

export async function processAndSaveDocumentation() {
  const fileNames = getDocs(docs).map((fn) => `${docs}${fn}`);
  for (const [fileName, contents] of await processDocumentation(fileNames)) {
    saveFile(fileName, contents);
  }
}

processAndSaveDocumentation();
