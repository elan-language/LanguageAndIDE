import { JSDOM } from "jsdom";
import prettier from "prettier";

export async function processStep(markup: string, instance: number): Promise<string> {
  const endOfTag = markup.indexOf(">");
  const content = markup.slice(endOfTag + 1);
  const attr = markup.slice(0, endOfTag);
  const match = attr.match(/id\s*=\s*"(\w+)"/);
  let heading = "";

  if (match?.length === 2 && !match[1].toLowerCase().startsWith("step")) {
    heading = `<h3>${match[1]}</h3>`;
  }

  return `<div class="step" id="step${instance}">
  ${heading}${content}
  <label class="done" for="done${instance}">Step completed</label>
  <input type="checkbox" class="step-complete" id="done${instance}" />
  <span> Total hints used: <span class="hints-taken"></span>/<span class="hints-total"></span></span>
</div>`;
}

export async function processStepJsDom(markup: string, instance: number): Promise<string> {
  const input = new JSDOM(markup);
  const inDoc = input.window.document;

  const output = new JSDOM(`<div class="step" id="step${instance}"></div>`);
  const outDoc = output.window.document;

  const step = inDoc.querySelector("step");

  const div = outDoc.querySelector("div")!;

  div.innerHTML = step?.innerHTML ?? "";

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
  //return await prettier.format(stepHtml, { parser: "html", bracketSameLine: true });
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
    // const code = toProcessCode.slice(codeStart + 5, codeEnd);
    // const htmlCode = await processStep(code, instance);
    const code = toProcessCode.slice(codeStart, codeEnd);
    const htmlCode = await processStepJsDom(code, instance);

    return [htmlCode, startAt + codeStart, startAt + codeEnd + 7];
  }

  return ["", -1, -1];
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
