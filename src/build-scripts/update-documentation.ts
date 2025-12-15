import { readdirSync, readFileSync, writeFileSync } from "node:fs";

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

function updateFile(fileName: string) {
  const contents = loadFile(fileName);
  const newContents = updatePaths(contents);
  saveFile(fileName, newContents);
}

for (const fn of getDocs(docs)) {
  updateFile(`${docs}${fn}`);
}
