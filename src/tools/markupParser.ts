export async function processStep(_markup: string, instance: number): Promise<string> {
  return `<div class="step" id="step${instance}">
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
