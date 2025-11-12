class QuestionModel {}

class StepModel {
  constructor(private _questions: QuestionModel[]) {}
}

export class WorksheetModel {
  constructor(private readonly _steps: StepModel[]) {}
}

function createQuestion(_question: Element): QuestionModel {
  return new QuestionModel();
}

function createStep(step: Element): StepModel {
  return new StepModel(
    Array.from(step.querySelectorAll("input.question, textarea.question, select.question")).map(
      (q) => createQuestion(q),
    ),
  );
}

export function createModelFromDocument(document: Document) {
  return new WorksheetModel(
    Array.from(document.querySelectorAll("div.step")).map((s) => createStep(s)),
  );
}
