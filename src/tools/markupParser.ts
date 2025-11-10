import { JSDOM } from "jsdom";
import { readFileSync } from "node:fs";
import { processWorksheetCode } from "./codeParser";
import {
  currentFinalId,
  currentFinalNumber,
  currentHintId,
  currentHintNumber,
  currentLoadId,
  currentLoadNumber,
  currentQuestionId,
  currentQuestionNumber,
  currentStepId,
  currentStepNumber,
  final,
  finalEndTag,
  finalTag,
  help,
  helpEndTag,
  helpTag,
  hint,
  hintTag,
  load,
  loadEndTag,
  openLoadTag,
  question,
  questionEndTag,
  questionTag,
  step,
  stepEndTag,
  stepTag,
  titleEndTag,
  titleTag,
} from "./parserConstants";

let currentDir = "";

export function setCurrentDir(dir: string) {
  currentDir = dir;
}

export async function processFinal(
  markup: string,
  finalInstance: number,
  _unused: number,
): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;
  const num = `${finalInstance}`;
  const id = `${final}${finalInstance}`;

  const output = new JSDOM(`<div class="${final}" id="${id}"></div>`);
  const outDoc = output.window.document;

  const finalSel = inDoc.querySelector(final);

  const div = outDoc.querySelector("div")!;

  let updated = await processHelps(finalSel?.innerHTML ?? "", finalInstance);
  updated = await processQuestions(updated, finalInstance);
  updated = await processLoads(updated, finalInstance);

  updated = updated.replaceAll(currentFinalNumber, num).replaceAll(currentFinalId, id);

  div.innerHTML = updated;

  const finalHtml = div.outerHTML;

  return finalHtml;
}

export async function processStep(
  markup: string,
  stepInstance: number,
  _unused: number,
): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;
  const num = `${stepInstance}`;
  const id = `${step}${stepInstance}`;

  const output = new JSDOM(`<div class="${step}" id="${id}"></div>`);
  const outDoc = output.window.document;

  const stepSel = inDoc.querySelector(step);

  const div = outDoc.querySelector("div")!;

  let updated = await processHelps(stepSel?.innerHTML ?? "", stepInstance);
  updated = await processHints(updated, stepInstance);
  updated = await processQuestions(updated, stepInstance);
  updated = await processLoads(updated, stepInstance);
  updated = await processHelps(updated, stepInstance);

  updated = updated.replaceAll(currentStepNumber, num).replaceAll(currentStepId, id);

  div.innerHTML = updated;

  const label = outDoc.createElement("label");
  label.className = "done";
  label.htmlFor = `done${stepInstance}`;
  label.textContent = "Step Completed";

  const inp = outDoc.createElement("input");
  inp.className = "step-complete";
  inp.type = "checkbox";
  inp.id = `done${stepInstance}`;

  const sp1 = outDoc.createElement("span");
  const sp2 = outDoc.createElement("span");
  const spOuter = outDoc.createElement("span");

  sp1.className = "hints-taken";
  sp2.className = "hints-total";

  spOuter.textContent = " Total hints used: ";
  spOuter.appendChild(sp1);
  spOuter.appendChild(outDoc.createTextNode("/"));
  spOuter.appendChild(sp2);

  const notesHeading = outDoc.createElement("h4");
  notesHeading.textContent = `Notes`;

  const notesInput = outDoc.createElement("textarea");
  notesInput.className = "notes";
  notesInput.placeholder = "Student or teacher may optionally add notes here";

  div.appendChild(notesHeading);
  div.appendChild(notesInput);
  div.appendChild(label);
  div.appendChild(inp);
  div.appendChild(spOuter);

  const stepHtml = div.outerHTML;

  return stepHtml;
}

export async function processHelp(
  markup: string,
  helpInstance: number,
  stepInstance: number,
): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;
  const num = `${stepInstance}-${helpInstance}`;
  const id = `${help}${num}`;
  const link = inDoc.querySelector(help)?.textContent;

  const output = new JSDOM(`<a class="help" href="${link}" id="${id}">show in Help</a>`);
  const outDoc = output.window.document;

  return outDoc.querySelector("a")!.outerHTML;
}

export async function processLoad(
  markup: string,
  loadInstance: number,
  stepInstance: number,
): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;
  const num = `${stepInstance}-${loadInstance}`;
  const id = `${load}${num}`;

  const output = new JSDOM(
    `<div><button class="${load}" id="${id}"></button><div hidden></div></div>`,
  );
  const outDoc = output.window.document;

  const loadSel = inDoc.querySelector(load);
  const file = loadSel?.getAttribute("file") ?? "";
  let code = "";

  try {
    code = readFileSync(`${currentDir}${file}`, "utf-8");
  } catch {
    code = "";
  }

  const button = outDoc.querySelector("button")!;
  const outCode = outDoc.querySelector("div > div")!;

  outCode.textContent = code;

  button.textContent = (loadSel?.firstChild?.textContent ?? "")
    .replaceAll(currentLoadNumber, num)
    .replaceAll(currentLoadId, id);

  return outDoc.querySelector("div")!.innerHTML!;
}

export async function processQuestion(
  markup: string,
  questionInstance: number,
  stepInstance: number,
): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;
  const num = `${stepInstance}-${questionInstance}`;
  const id = `${question}${num}`;

  const output = new JSDOM(
    `<div><p></p>
<textarea class="${question}" id="${id}"></textarea></div>`,
  );
  const outDoc = output.window.document;

  const questionSel = inDoc.querySelector(question);

  const para = outDoc.querySelector("p")!;

  para.textContent = (questionSel?.textContent ?? "")
    .replaceAll(currentQuestionNumber, num)
    .replaceAll(currentQuestionId, id);

  return outDoc.querySelector("div")!.innerHTML;
}

export async function processHint(
  markup: string,
  hintInstance: number,
  stepInstance: number,
): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;
  const num = `${stepInstance}-${hintInstance}`;
  const id = `${hint}${num}`;

  const output = new JSDOM(`<div><div class="${hint}" id="${id}" data-hint=""></div>
<div class="content" id="${id}content"></div></div>`);
  const outDoc = output.window.document;

  const hintSel = inDoc.querySelector(hint);

  const div = outDoc.querySelector(`div.${hint}`)!;

  div.textContent = (hintSel?.textContent ?? "")
    .replaceAll(currentHintNumber, num)
    .replaceAll(currentHintId, id);

  const content = hintSel?.nextElementSibling;

  if (content && content.tagName === "CONTENT") {
    const contentAsString = content.innerHTML
      .replaceAll(currentHintNumber, num)
      .replaceAll(currentHintId, id);

    const encoded = btoa(contentAsString);

    div.setAttribute("data-hint", encoded);
  }

  return outDoc.querySelector(`div`)!.innerHTML;
}

async function processEachInstance(
  initialCode: string,
  startAt: number,
  startTag: string,
  endTag: string,
  innerInstance: number,
  outerInstance: number,
  processor: (code: string, i1: number, i2: number) => Promise<string>,
): Promise<[string, number, number]> {
  const toProcessCode = initialCode.slice(startAt);

  const codeStart = toProcessCode.indexOf(startTag);
  const codeEnd = toProcessCode.indexOf(endTag) + endTag.length;

  if (codeStart !== -1 && codeEnd !== -1) {
    const code = toProcessCode.slice(codeStart, codeEnd);
    const htmlCode = await processor(code, innerInstance, outerInstance);

    return [htmlCode, startAt + codeStart, startAt + codeEnd];
  }

  return ["", -1, -1];
}

async function processEachLoadInstance(
  initialCode: string,
  startAt: number,
  loadInstance: number,
  stepInstance: number,
): Promise<[string, number, number]> {
  return await processEachInstance(
    initialCode,
    startAt,
    openLoadTag,
    loadEndTag,
    loadInstance,
    stepInstance,
    processLoad,
  );
}

async function processEachHelpInstance(
  initialCode: string,
  startAt: number,
  helpInstance: number,
  stepInstance: number,
): Promise<[string, number, number]> {
  return await processEachInstance(
    initialCode,
    startAt,
    helpTag,
    helpEndTag,
    helpInstance,
    stepInstance,
    processHelp,
  );
}

async function processEachQuestionInstance(
  initialCode: string,
  startAt: number,
  questionInstance: number,
  stepInstance: number,
): Promise<[string, number, number]> {
  return await processEachInstance(
    initialCode,
    startAt,
    questionTag,
    questionEndTag,
    questionInstance,
    stepInstance,
    processQuestion,
  );
}

async function processEachHintInstance(
  initialCode: string,
  startAt: number,
  hintInstance: number,
  stepInstance: number,
): Promise<[string, number, number]> {
  return await processEachInstance(
    initialCode,
    startAt,
    hintTag,
    "</content>",
    hintInstance,
    stepInstance,
    processHint,
  );
}

async function processEachStepInstance(
  initialCode: string,
  startAt: number,
  instance: number,
): Promise<[string, number, number]> {
  return await processEachInstance(
    initialCode,
    startAt,
    stepTag,
    stepEndTag,
    instance,
    0,
    processStep,
  );
}

async function processEachFinalInstance(
  initialCode: string,
  startAt: number,
  instance: number,
): Promise<[string, number, number]> {
  return await processEachInstance(
    initialCode,
    startAt,
    finalTag,
    finalEndTag,
    instance,
    0,
    processFinal,
  );
}

async function processEachCodeInstance(
  initialCode: string,
  startAt: number,
  startTag: string,
  endTag: string,
): Promise<[string, number, number]> {
  return await processEachInstance(
    initialCode,
    startAt,
    startTag,
    endTag,
    0,
    0,
    async (initialCode: string, _i1: number = 0, _i2: number = 0) =>
      await processWorksheetCode(initialCode, startTag, endTag),
  );
}

function applyChanges(source: string, updates: [string, number, number][]) {
  let updatedContent = source;

  for (let i = updates.length - 1; i >= 0; i--) {
    const [content, start, end] = updates[i];
    updatedContent = updatedContent.slice(0, start) + content + updatedContent.slice(end);
  }

  return updatedContent;
}

export async function processLoads(source: string, stepInstance: number) {
  const updates: [string, number, number][] = [];
  let loadInstance = 0;

  let [updatedCode, codeStart, codeEnd] = await processEachLoadInstance(
    source,
    0,
    loadInstance,
    stepInstance,
  );
  loadInstance++;
  while (updatedCode !== "") {
    updates.push([updatedCode, codeStart, codeEnd]);
    [updatedCode, codeStart, codeEnd] = await processEachLoadInstance(
      source,
      codeEnd,
      loadInstance,
      stepInstance,
    );
    loadInstance++;
  }

  return applyChanges(source, updates);
}

export async function processHelps(source: string, stepInstance: number) {
  const updates: [string, number, number][] = [];
  let helpInstance = 0;

  let [updatedCode, codeStart, codeEnd] = await processEachHelpInstance(
    source,
    0,
    helpInstance,
    stepInstance,
  );
  helpInstance++;
  while (updatedCode !== "") {
    updates.push([updatedCode, codeStart, codeEnd]);
    [updatedCode, codeStart, codeEnd] = await processEachHelpInstance(
      source,
      codeEnd,
      helpInstance,
      stepInstance,
    );
    helpInstance++;
  }

  return applyChanges(source, updates);
}

export async function processQuestions(source: string, stepInstance: number) {
  const updates: [string, number, number][] = [];
  let questionInstance = 0;

  let [updatedCode, codeStart, codeEnd] = await processEachQuestionInstance(
    source,
    0,
    questionInstance,
    stepInstance,
  );
  questionInstance++;
  while (updatedCode !== "") {
    updates.push([updatedCode, codeStart, codeEnd]);
    [updatedCode, codeStart, codeEnd] = await processEachQuestionInstance(
      source,
      codeEnd,
      questionInstance,
      stepInstance,
    );
    questionInstance++;
  }

  return applyChanges(source, updates);
}

export async function processHints(source: string, stepInstance: number) {
  const updates: [string, number, number][] = [];
  let hintInstance = 1;

  let [updatedCode, codeStart, codeEnd] = await processEachHintInstance(
    source,
    0,
    hintInstance,
    stepInstance,
  );
  hintInstance++;
  while (updatedCode !== "") {
    updates.push([updatedCode, codeStart, codeEnd]);
    [updatedCode, codeStart, codeEnd] = await processEachHintInstance(
      source,
      codeEnd,
      hintInstance,
      stepInstance,
    );
    hintInstance++;
  }

  return applyChanges(source, updates);
}

export async function processSteps(source: string) {
  const updates: [string, number, number][] = [];
  let stepInstance = 1;

  let [updatedCode, codeStart, codeEnd] = await processEachStepInstance(source, 0, stepInstance);
  stepInstance++;
  while (updatedCode !== "") {
    updates.push([updatedCode, codeStart, codeEnd]);
    [updatedCode, codeStart, codeEnd] = await processEachStepInstance(
      source,
      codeEnd,
      stepInstance,
    );
    stepInstance++;
  }

  return applyChanges(source, updates);
}

export async function processFinals(source: string) {
  const updates: [string, number, number][] = [];
  let finalInstance = 1;

  let [updatedCode, codeStart, codeEnd] = await processEachFinalInstance(source, 0, finalInstance);
  finalInstance++;
  while (updatedCode !== "") {
    updates.push([updatedCode, codeStart, codeEnd]);
    [updatedCode, codeStart, codeEnd] = await processEachFinalInstance(
      source,
      codeEnd,
      finalInstance,
    );
    finalInstance++;
  }

  return applyChanges(source, updates);
}

export async function processCode(source: string, startTag: string, endTag: string) {
  const updates: [string, number, number][] = [];

  let [updatedCode, codeStart, codeEnd] = await processEachCodeInstance(
    source,
    0,
    startTag,
    endTag,
  );

  while (updatedCode !== "") {
    updates.push([updatedCode, codeStart, codeEnd]);
    [updatedCode, codeStart, codeEnd] = await processEachCodeInstance(
      source,
      codeEnd,
      startTag,
      endTag,
    );
  }

  return applyChanges(source, updates);
}

export function processTitle(source: string): [string, string] {
  const start = source.indexOf(titleTag);
  const end = source.indexOf(titleEndTag);

  if (start !== -1 && end !== -1) {
    const title = source.slice(start + titleTag.length, end);
    source = source.slice(0, start) + source.slice(end + titleEndTag.length);
    return [title, source];
  }

  return ["", source];
}
