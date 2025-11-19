import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { isElanProduction } from "../environment";
import {
  processCode,
  processFinals,
  processSteps,
  processTitle,
  setCurrentDir,
} from "../tools/markupParser";
import { codeBlockEndTag, codeBlockTag, codeEndTag, codeTag } from "../tools/parserConstants";

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
  const prodUrl = `https://elan-lang.org/`;
  const devUrl = `https://elan-language.github.io/LanguageAndIDE/`;
  const hostUrl = isElanProduction ? prodUrl : devUrl;

  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en-GB">

  <head>
      <meta http-equiv="Cache-Control" content="no-store" />
      <link href="${hostUrl}styles/colourScheme.css" rel="stylesheet" />
      <link href="${hostUrl}styles/elanStyle.css" rel="stylesheet" />
      <link href="${hostUrl}styles/documentation.css" rel="stylesheet" />
      <link href="${hostUrl}styles/worksheet.css" rel="stylesheet" />
      <title>${title}</title>
  </head>

  <body>
    <div id="worksheet">
    <div class="docTitle">${title}</div>

      <p class="transient">Choose <i>either one</i> of the two options below:</p>

      <p><b>Option 1: Start this worksheet from scratch</b></p>

      <ul>
        <li>First <label for="username">Enter your name: </label><input class="question" type="text" id="username" /></li>
        <li>Then <button id="auto-save">Create and save a new answers file</button>.
      </ul>

      <p><b>Option 2: Continue, or view, previous work</b></p>

      <ul>
        <li><button id="load-answers">Load a previously-saved (.json) answers file</button>
        <li>Immediately after loading, you will immediately be asked to confirm that you want to save any further edits to this file.</li>
        (If you don't want to do that, hit <b>Cancel</b> on the dialog to return to these two options. Note that you
        may make a copy of your answers file outside of the Elan IDE.)
      </ul>

      <p>In either case, any edits that you subsequently make in the worksheet will be auto-saved to the file.</p>
     
      <p>Set the browser to <b>Full Screen</b> view, to give this worksheet and your code as much space as possible.</p>

    <div class="license">
      <img decoding="async" loading="lazy" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png" width="118" height="41">
      This worksheet is copyright &copy; Richard Pawson 2025, and protected by the Creative Commons license:
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank"> Attribution-NonCommercial-NoDerivatives 4.0 International</a>.
        You may freely make and distribute copies of this worksheet <i>as is</i>, but if you <i>modify</i> this worksheet you may not distribute your modified version (outside your own teaching institution) without the author's permission.
        Please <a href="mailto:rpawson@nakedobjects.org" target="_blank">email the author</a> to report errors or suggest improvements.
    </div> 
      ${content}
    <script src="${hostUrl}diff.js"></script>
    <script src="${hostUrl}worksheet-model-scripts.js"></script>
  </body>
</html>`;
}

function appendFooter(content: string) {
  return `${content}
  <div hidden="" id="hash"></div>
  <div hidden="" id="changes"></div>
`;
}

export async function processWorksheet(fileName: string) {
  let source = loadFileAsSourceNew(fileName);
  let title = "";
  [title, source] = processTitle(source);
  source = appendFooter(source);

  let updatedContent = await processCode(source, codeTag, codeEndTag);
  updatedContent = await processCode(updatedContent, codeBlockTag, codeBlockEndTag);
  updatedContent = await processSteps(updatedContent);
  updatedContent = await processFinals(updatedContent);

  updatedContent = wrapInWorkSheetBoilerPlate(updatedContent, title);

  updateFileNew(fileName.replace(".raw", ""), updatedContent);
}

export async function processWorksheetsInDirectory(dir: string) {
  setCurrentDir(dir);

  for (const fn of getWorksheets(dir)) {
    await processWorksheet(`${dir}${fn}`);
  }

  for (const sd of getWorksheetSubdir(dir)) {
    await processWorksheetsInDirectory(`${dir}${sd}/`);
  }
}

processWorksheetsInDirectory(worksheets);
