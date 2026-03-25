import { ClassOption, elanClass, ElanString } from "../elan-type-annotations";
import { System } from "../system";

@elanClass(ClassOption.concrete, [], ["message"], [ElanString])
export class CustomError extends Error {
  static emptyInstance() {
    return new CustomError("");
  }

  async _initialise(message: string) {
    this.message = message;
    return this;
  }

  private system?: System;

  constructor(private readonly err: string | Error) {
    super(err instanceof Error ? err.message : err);
  }

  toString() {
    return this.message ?? "a ElanRuntimeError";
  }

  useLine(token: string) {
    return !(
      token.startsWith("data") ||
      token.startsWith("http") ||
      token.startsWith("async") ||
      token.startsWith("Array") ||
      token.startsWith("System") ||
      token.startsWith("onmessage")
    );
  }

  updateLine0(l0: string) {
    if (l0.startsWith("RangeError")) {
      return "Error: Stack Overflow";
    }
    return l0;
  }

  get elanStack() {
    const jsStack = this.err instanceof Error ? this.err.stack : this.stack;
    const elanStack: string[] = [];

    if (jsStack) {
      let lines = jsStack.split("\n").map((l) => l.trim());

      if (lines.length > 0) {
        elanStack.push(this.updateLine0(lines[0]));
        lines = lines.slice(1);

        for (const l of lines) {
          const line = l.split(" ");

          if (line.length > 1) {
            let fn = line[1];
            fn = fn === "runTests" ? "test" : fn;
            fn = fn === "System.print" ? "print" : fn;

            if (this.useLine(fn)) {
              elanStack.push(`at ${fn}`);
            }
          }
        }
      }
    }

    if (elanStack.length > 0) {
      return elanStack.join("\n");
    }
    return "";
  }
}
