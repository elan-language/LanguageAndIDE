import { JSDOM } from "jsdom";
import { processWorksheetCode } from "./codeParser";
import {
  currentHintId,
  currentLoadId,
  currentQuestionId,
  currentStepId,
  hint,
  hintTag,
  load,
  loadEndTag,
  loadTag,
  question,
  questionEndTag,
  questionTag,
  step,
  stepEndTag,
  stepTag,
} from "./parserConstants";

export async function processStep(
  markup: string,
  stepInstance: number,
  _unused: number,
): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;
  const currentStep = `${step}${stepInstance}`;

  const output = new JSDOM(`<div class="${step}" id="${currentStep}"></div>`);
  const outDoc = output.window.document;

  const stepSel = inDoc.querySelector(step);

  const div = outDoc.querySelector("div")!;

  let updated = await processHints(stepSel?.innerHTML ?? "", stepInstance);
  updated = await processQuestions(updated, stepInstance);
  updated = await processLoads(updated, stepInstance);

  updated = updated.replaceAll(currentStepId, currentStep);

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
  spOuter.appendChild(sp2);

  div.appendChild(label);
  div.appendChild(inp);
  div.appendChild(spOuter);

  const stepHtml = div.outerHTML;

  return stepHtml;
}

export async function processLoad(
  markup: string,
  loadInstance: number,
  stepInstance: number,
): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;
  const currentLoad = `${load}${stepInstance}-${loadInstance}`;

  const output = new JSDOM(`<button class="${load}" id="${currentLoad}"></button>`);
  const outDoc = output.window.document;

  const loadSel = inDoc.querySelector(load);
  const file = loadSel?.getAttribute("file") ?? "";

  const button = outDoc.querySelector("button")!;

  button.textContent = (loadSel?.textContent ?? "").replaceAll(currentLoadId, currentLoad);
  button.value = file.replaceAll(currentLoadId, currentLoad);

  return button.outerHTML;
}

export async function processQuestion(
  markup: string,
  questionInstance: number,
  stepInstance: number,
): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;
  const currentQuestion = `${question}${stepInstance}-${questionInstance}`;

  const output = new JSDOM(
    `<div><p></p>
<textarea class="${question}" id="${currentQuestion}"></textarea></div>`,
  );
  const outDoc = output.window.document;

  const questionSel = inDoc.querySelector(question);

  const para = outDoc.querySelector("p")!;

  para.textContent = (questionSel?.textContent ?? "").replaceAll(
    currentQuestionId,
    currentQuestion,
  );

  return outDoc.querySelector("div")!.innerHTML;
}

export async function processHint(
  markup: string,
  hintInstance: number,
  stepInstance: number,
): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;
  const currentHint = `${hint}${stepInstance}-${hintInstance}`;

  const output = new JSDOM(`<div class="${hint}" id="${currentHint}" data-hint=""></div>`);
  const outDoc = output.window.document;

  const hintSel = inDoc.querySelector(hint);

  const div = outDoc.querySelector("div")!;

  div.textContent = hintSel?.textContent ?? "";

  const content = hintSel?.nextElementSibling;

  if (content) {
    const contentAsString = content.innerHTML.replaceAll(currentHintId, currentHint);

    const encoded = btoa(contentAsString);

    div.setAttribute("data-hint", encoded);
  }

  const hintHtml = div.outerHTML;

  return hintHtml;
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
    loadTag,
    loadEndTag,
    loadInstance,
    stepInstance,
    processLoad,
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
  let hintInstance = 0;

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
  let stepInstance = 0;

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
