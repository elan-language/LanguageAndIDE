import { JSDOM } from "jsdom";

export async function processStep(markup: string, instance: number): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;

  const output = new JSDOM(`<div class="step" id="step${instance}"></div>`);
  const outDoc = output.window.document;

  const step = inDoc.querySelector("step");

  const div = outDoc.querySelector("div")!;

  const updatedHints = await processHints(step?.innerHTML ?? "");

  div.innerHTML = updatedHints;

  const label = outDoc.createElement("label");
  label.className = "done";
  label.htmlFor = `done${instance}`;
  label.textContent = "Step Completed";

  const inp = outDoc.createElement("input");
  inp.className = "step-complete";
  inp.type = "checkbox";
  inp.id = `done${instance}`;

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

export async function processHint(markup: string, instance: number): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;

  const output = new JSDOM(`<div class="hint" id="hint${instance}" data-hint=""></div>`);
  const outDoc = output.window.document;

  const hint = inDoc.querySelector("hint");

  const div = outDoc.querySelector("div")!;

  div.textContent = hint?.textContent ?? "";

  const content = hint?.nextElementSibling;

  if (content) {
    const contentAsString = content.innerHTML;

    const encoded = btoa(contentAsString);

    hint.setAttribute("data-hint", encoded);
  }

  const hintHtml = div.outerHTML;

  return hintHtml;
}

async function processEachHintInstance(
  initialCode: string,
  startAt: number,
  instance: number,
): Promise<[string, number, number]> {
  const toProcessCode = initialCode.slice(startAt);

  const codeStart = toProcessCode.indexOf("<hint");
  const codeEnd = toProcessCode.indexOf("</content>");

  if (codeStart !== -1) {
    const code = toProcessCode.slice(codeStart, codeEnd);
    const htmlCode = await processHint(code, instance);

    return [htmlCode, startAt + codeStart, startAt + codeEnd + 10];
  }

  return ["", -1, -1];
}

async function processEachStepInstance(
  initialCode: string,
  startAt: number,
  instance: number,
): Promise<[string, number, number]> {
  const toProcessCode = initialCode.slice(startAt);

  const codeStart = toProcessCode.indexOf("<step");
  const codeEnd = toProcessCode.indexOf("</step>");

  if (codeStart !== -1) {
    const code = toProcessCode.slice(codeStart, codeEnd);
    const htmlCode = await processStep(code, instance);

    return [htmlCode, startAt + codeStart, startAt + codeEnd + 7];
  }

  return ["", -1, -1];
}

export async function processHints(source: string) {
  const updates: [string, number, number][] = [];
  let hintInstance = 0;

  let [updatedCode, codeStart, codeEnd] = await processEachHintInstance(source, 0, hintInstance);
  hintInstance++;
  while (updatedCode !== "") {
    updates.push([updatedCode, codeStart, codeEnd]);
    [updatedCode, codeStart, codeEnd] = await processEachHintInstance(
      source,
      codeEnd,
      hintInstance,
    );
    hintInstance++;
  }

  let updatedContent = source;

  for (let i = updates.length - 1; i >= 0; i--) {
    const [c, s, e] = updates[i];
    updatedContent = updatedContent.slice(0, s) + c + updatedContent.slice(e);
  }

  return updatedContent;
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

  let updatedContent = source;

  for (let i = updates.length - 1; i >= 0; i--) {
    const [c, s, e] = updates[i];
    updatedContent = updatedContent.slice(0, s) + c + updatedContent.slice(e);
  }

  return updatedContent;
}
