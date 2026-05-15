export const defaultUsername = "guest";

export class Profile {
  constructor(prof: string) {
    this.name = prof;
  }

  name: string;

  isProcedural(): boolean {
    return this.name === "procedural";
  }
  isOOP(): boolean {
    return this.name === "oop";
  }
  isFunctional(): boolean {
    return this.name === "functional";
  }
  isAll() {
    return this.name === "all" || this.name === "";
  }
 
}
