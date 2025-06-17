import { JSDOM } from "jsdom";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { isElanProduction } from "../environment";

const rootdir = `${__dirname}/../../..`;

const worksheets = `${rootdir}/out/website/documentation/worksheets/`;

function loadFile(fileName: string): string {
  return readFileSync(fileName, "utf-8");
}

function saveFile(fileName: string, newContent: string) {
  writeFileSync(fileName, newContent);
}

function getWorksheets(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => s.endsWith(".html"));
}

// export for testing
export function updateHints(contents: string) {
  const jsdom = new JSDOM(contents);
  const document = jsdom.window.document;

  const hints = document.querySelectorAll("div.hint") as NodeListOf<HTMLDivElement>;

  for (const hint of hints) {
    const id = hint.id;
    const content = document.getElementById(`${id}content`);

    if (content) {
      const contentAsString = content.innerHTML;

      const encoded = btoa(contentAsString);

      hint.setAttribute("data-hint", encoded);
      content.innerHTML = "";
    }
  }

  const newContents = jsdom.window.document.documentElement.outerHTML;

  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
${newContents}`;
}

function updatePaths(contents: string) {
  const repoUrl = `../../../out/website/`;
  const prodUrl = `https://elan-lang.org/`;
  const devUrl = `https://elan-language.github.io/LanguageAndIDE/`;
  const from = repoUrl;
  const to = isElanProduction ? prodUrl : devUrl;
  const newContents = contents.replaceAll(from, to);
  return newContents;
}

function updateFile(fileName: string) {
  const contents = loadFile(fileName);
  let newContents = updateHints(contents);
  newContents = updatePaths(newContents);
  saveFile(fileName, newContents);
}

for (const fn of getWorksheets(worksheets)) {
  updateFile(`${worksheets}${fn}`);
}
