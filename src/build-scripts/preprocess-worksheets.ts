import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import {
  processCode,
  processFinals,
  processSteps,
  processTitle,
  setCurrentDir,
} from "../tools/markupParser";
import { codeBlockEndTag, codeBlockTag, codeEndTag, codeTag } from "../tools/parserConstants";
import { isElanProduction } from "../environment";

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

    <ol>
      <li class="transient"><button id="load-answers">Load an answer file</button></li>
      <li><label for="username">Enter your name: </label><input class="question" type="text" id="username" /></li>
      <li>Set the browser to <b>Full Screen</b> view, to give this worksheet and your code as much space as possible.</li>
      <li class="transient"><button id="auto-save">Auto-save to file</button><span> to continue. (After that any entries made into the worksheet will be automatically saved, and you can re-load the partially-completed worksheet in future &ndash; at which point you will be asked to auto-save it again).</span></li>
    </ol>

    <div class="license">
      <img decoding="async" loading="lazy" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png" width="118" height="41">
      This worksheet is copyright &copy; Richard Pawson 2025, and protected by the Creative Commons license:
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank"> Attribution-NonCommercial-NoDerivatives 4.0 International</a>.
        You may freely make and distribute copies of this worksheet <i>as is</i>, but if you <i>modify</i> this worksheet you may not distribute your modified version (outside your own teaching institution) without the author's permission.
        Please <a href="mailto:rpawson@nakedobjects.org" target="_blank">email the author</a> to report errors or suggest improvements.
    </div> 
      ${content}
    <script src="${hostUrl}diff.js"></script>
    <script src="${hostUrl}worksheet-scripts.js"></script>
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
