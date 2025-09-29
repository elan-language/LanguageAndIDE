export async function processStep(markup: string, instance: number): Promise<string> {
  const endOfTag = markup.indexOf(">");
  const content = markup.slice(endOfTag + 1);

  return `<div class="step" id="step${instance}">
  ${content}
  <label class="done" for="done${instance}">Step completed</label>
  <input type="checkbox" class="step-complete" id="done${instance}" />
  <span> Total hints used: <span class="hints-taken"></span>/<span class="hints-total"></span></span>
</div>`;
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
    const code = toProcessCode.slice(codeStart + 5, codeEnd);

    const htmlCode = await processStep(code, instance);

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
