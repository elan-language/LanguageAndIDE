export const defaultUsername = "guest";

export class Paradigm {
  constructor(para: string | undefined) {
    if (para === "procedural" || para === "oop" || para === "functional") {
      this.name = para;
    } else {
      this.name = "procedural";
    }
  }

  name: "procedural" | "oop" | "functional";

  isProcedural(): boolean {
    return this.name === "procedural";
  }
  isOOP(): boolean {
    return this.name === "oop";
  }
  isFunctional(): boolean {
    return this.name === "functional";
  }
}
