import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resetFile } from "../tools/codeParser";
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

export async function processDocument(fileName: string): Promise<[string, string]> {
  const ms = Date.now();
  console.log(`Processing: ${fileName}`);

  let contents = loadFile(fileName);

  // don't double processs
  if (contents.includes(`<span class="python">`)) {
    return [fileName, contents];
  }

  contents = updatePaths(contents);
  contents = await processCode(contents, codeTag, codeEndTag);
  contents = await processCode(contents, codeBlockTag, codeBlockEndTag);
  console.log(`Finished Processing: ${fileName} in ${Date.now() - ms}ms`);
  return [fileName, contents];
}

export async function processDocumentation() {
  const results: [string, string][] = [];

  for (const fn of getDocs(docs)) {
    resetFile();
    results.push(await processDocument(`${docs}${fn}`));
  }

  return results;
}

export async function processAndSaveDocumentation() {
  for (const [fileName, contents] of await processDocumentation()) {
    saveFile(fileName, contents);
  }
}

processAndSaveDocumentation();
