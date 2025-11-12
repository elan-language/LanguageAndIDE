class QuestionModel {
  constructor(public readonly id: string) {}

  value: string = "";

  setValue(v: string) {
    this.value = v;
  }

  isAnswered() {
    return !!this.value;
  }
}

class StepModel {
  constructor(private questions: QuestionModel[]) {}

  getQuestionById(id: string) {
    return this.questions.find((q) => q.id === id);
  }
}

export class WorksheetModel {
  constructor(private readonly steps: StepModel[]) {}

  getQuestionById(id: string) {
    for (const step of this.steps) {
      const q = step.getQuestionById(id);
      if (q) {
        return q;
      }
    }
    return undefined;
  }
}

function createQuestion(question: Element): QuestionModel {
  return new QuestionModel(question.id);
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
