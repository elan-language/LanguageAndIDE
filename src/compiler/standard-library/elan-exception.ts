import { ClassOption, elanClass, ElanString } from "../elan-type-annotations";

@elanClass(ClassOption.abstract, [], ["message"], [ElanString])
export class ElanException extends Error {
  static emptyInstance() {
    return new ElanException("");
  }

  async _initialise(message: string) {
    this.message = message;
    return this;
  }

  protected constructor(err: string | Error) {
    super(err instanceof Error ? err.message : err);
  }

  asString() {
    return this.message ?? "a ElanException";
  }
}
