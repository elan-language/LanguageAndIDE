export interface change {
  added: boolean;
  removed: boolean;
  value: string;
  count: number;
}

interface IQuestionModel {
  id: string;
  value: string;
}

interface IHintModel {
  id: string;
  diff: change[];
  taken: boolean;
  timeTaken: string;
}

interface IStepModel {
  id: string;
  questions: IQuestionModel[];
  hints: IHintModel[];
  done: boolean;
  timeDone: string;
  diff: change[];
}

export interface IWorksheetModel {
  username: IQuestionModel;
  steps: IStepModel[];
}

function getNow() {
  const dt = new Date();
  const sp = document.createElement("span");
  sp.classList.add("timestamp");
  return `${dt.toLocaleTimeString()} ${dt.toLocaleDateString()}`;
}

export class QuestionModel implements IQuestionModel {
  constructor(public readonly id: string) {}

  value: string = "";

  setValue(v: string) {
    this.value = v;
  }

  isAnswered() {
    return !!this.value;
  }

  setAnswers(answers: IQuestionModel) {
    this.value = answers.value;
  }
}

class StepModel implements IStepModel {
  constructor(
    public readonly id: string,
    public readonly questions: QuestionModel[],
    public readonly hints: HintModel[],
  ) {}

  done: boolean = false;

  timeDone: string = "";

  diff: change[] = [];

  conditionalSetDone() {
    if (this.questions.every((q) => q.isAnswered())) {
      this.done = true;
      this.timeDone = getNow();
    }
  }

  setDiff(diff: change[]) {
    this.diff = diff;
  }

  getQuestionById(id: string) {
    return this.questions.find((q) => q.id === id);
  }

  getHintById(id: string) {
    return this.hints.find((h) => h.id === id);
  }

  setAnswers(answers: IStepModel) {
    this.done = answers.done;
    this.timeDone = answers.timeDone;
    this.diff = answers.diff;
    for (const a of answers.questions) {
      this.getQuestionById(a.id)?.setAnswers(a);
    }
    for (const a of answers.hints) {
      this.getHintById(a.id)?.setAnswers(a);
    }
  }
}

export class HintModel implements IHintModel {
  constructor(public readonly id: string) {}

  diff: change[] = [];

  taken: boolean = false;

  timeTaken: string = "";

  setDiff(diff: change[]) {
    this.diff = diff;
  }

  setTaken() {
    this.taken = true;
    this.timeTaken = getNow();
  }

  setAnswers(answers: IHintModel) {
    this.diff = answers.diff;
    this.taken = answers.taken;
    this.timeTaken = answers.timeTaken;
  }
}

export class WorksheetModel implements IWorksheetModel {
  constructor(
    public readonly username: QuestionModel,
    public readonly steps: StepModel[],
  ) {}

  setAnswers(answers: IWorksheetModel) {
    this.username.setAnswers(answers.username);
    for (const a of answers.steps) {
      this.getStepById(a.id)?.setAnswers(a);
    }
  }

  getQuestionById(id: string) {
    for (const step of this.steps) {
      const q = step.getQuestionById(id);
      if (q) {
        return q;
      }
    }
    return undefined;
  }

  getHintById(id: string) {
    for (const step of this.steps) {
      const h = step.getHintById(id);
      if (h) {
        return h;
      }
    }
    return undefined;
  }

  getStepById(id: string) {
    return this.steps.find((s) => s.id === id);
  }

  getNextStep() {
    return this.steps.find((s) => !s.done);
  }
}

function createQuestion(question: Element): QuestionModel {
  return new QuestionModel(question.id);
}

function createStep(step: Element): StepModel {
  return new StepModel(
    step.id,
    Array.from(step.querySelectorAll("input.question, textarea.question, select.question")).map(
      (q) => createQuestion(q),
    ),
    Array.from(step.querySelectorAll("div.hint")).map((h) => createHint(h)),
  );
}

function createHint(hint: Element): HintModel {
  return new HintModel(hint.id);
}

export function createModelFromDocument(document: Document) {
  return new WorksheetModel(
    createQuestion(document.querySelector("#username")!),
    Array.from(document.querySelectorAll("div.step")).map((s) => createStep(s)),
  );
}
