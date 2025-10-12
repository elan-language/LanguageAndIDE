import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { processCode, processSteps, processTitle } from "../tools/markupParser";
import toDiffableHtml from "diffable-html";
import {
  codeBlockEndTag,
  codeBlockTag,
  codeEndTag,
  codeTag,
  stepEndTag,
  stepTag,
} from "../tools/parserConstants";

const rootdir = `${__dirname}/../../..`;

const worksheets = `${rootdir}/src/documentation/worksheets/`;

function loadFileAsSourceNew(sourceFile: string): string {
  return readFileSync(sourceFile, "utf-8");
}

function updateFileNew(testDoc: string, newContent: string) {
  writeFileSync(testDoc, newContent);
}

export function getWorksheets(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => s.endsWith(".raw.html"));
}

export function getWorksheetSubdir(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => statSync(sourceDir + "/" + s).isDirectory());
}

function wrapInWorkSheetBoilerPlate(content: string, title: string) {
  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en-GB">

  <head>
      <meta http-equiv="Cache-Control" content="no-store" />
      <link href="https://elan-language.github.io/LanguageAndIDE/styles/colourScheme.css" rel="stylesheet" />
      <link href="https://elan-language.github.io/LanguageAndIDE/styles/elanStyle.css" rel="stylesheet" />
      <link href="https://elan-language.github.io/LanguageAndIDE/styles/documentation.css" rel="stylesheet" />
      <link href="https://elan-language.github.io/LanguageAndIDE/styles/worksheet.css" rel="stylesheet" />
      <title>${title}</title>
  </head>

  <body>
    <div id="worksheet">
    <div class="docTitle">${title}</div>
    <button id="auto-save">Auto-save to file</button><span> to continue. (After that any entries made into the worksheet will be automatically saved, and you can re-load the partially-completed worksheet in future &ndash; at which point you will be asked to auto-save it again).</span>
    ${content}
    <script src="https://elan-language.github.io/LanguageAndIDE/worksheet-scripts.js"></script>
  </body>
</html>`;
}

function prependFirstStep(content: string) {
  return `${stepTag}
  <h3>Preliminaries</h3>
  <label for="username">Enter your name: </label>
  <input class="question" type="text" id="username" />
  <ul>
    <li>Set the browser to Full Screen view, to give this worksheet, and your code, as much space as possible.</li>
  </ul>
${stepEndTag}
${content}`;
}

function appendLastStep(content: string) {
  return `${content}
${stepTag}
  <p>Congratulations! You have finished the worksheet, and you now know enough about navigating and editing
  code to start writing your first program &ndash; with the help of another Worksheet. Meantime,
  click <b>Help > Home > IDE Reference > Code editor</b> &ndash; for a handy summary of all the above
  operations, and a few more that you can also try out here.</p>
  <div class="license">
      <img decoding="async" loading="lazy" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png" width="118" height="41">
      This worksheet is copyright &copy; Richard Pawson 2025, and protected by the Creative Commons license:
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank"> Attribution-NonCommercial-NoDerivatives 4.0 International</a>.
        If you copy and <i>modify</i> this worksheet you may not distribute your modified version (outside your own teaching institution) without the author's permission.
        Please <a href="mailto:rpawson@nakedobjects.org" target="_blank">email the author</a> to report errors or suggest improvements.
    </div>
  </div>
  <div hidden="" id="hash"></div>
  <div hidden="" id="changes"></div>
${stepEndTag}`;
}

export async function processWorksheet(fileName: string) {
  let source = loadFileAsSourceNew(fileName);
  let title = "";
  [title, source] = processTitle(source);
  source = prependFirstStep(source);
  source = appendLastStep(source);

  let updatedContent = await processSteps(source);
  updatedContent = await processCode(updatedContent, codeTag, codeEndTag);
  updatedContent = await processCode(updatedContent, codeBlockTag, codeBlockEndTag);

  updatedContent = wrapInWorkSheetBoilerPlate(updatedContent, title);

  updatedContent = toDiffableHtml(updatedContent);

  updateFileNew(fileName.replace(".raw", ""), updatedContent);
}

export async function processWorksheetsInDirectory(dir: string) {
  for (const fn of getWorksheets(dir)) {
    await processWorksheet(`${dir}${fn}`);
  }

  for (const sd of getWorksheetSubdir(dir)) {
    await processWorksheetsInDirectory(`${dir}${sd}/`);
  }
}

processWorksheetsInDirectory(worksheets);
