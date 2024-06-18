export class ElanRuntimeError extends Error {
  constructor(msg: string) {
    super(msg);
  }

  useLine(token: string) {
    return !(
      token.startsWith("System") ||
      token.startsWith("data") ||
      token.startsWith("http") ||
      token.startsWith("async") ||
      token.startsWith("Array")
    );
  }

  get elanStack() {
    const jsStack = this.stack;
    const elanStack: string[] = [];

    if (jsStack) {
      let lines = jsStack.split("\n").map((l) => l.trim());

      if (lines.length > 0) {
        elanStack.push(lines[0]);
        lines = lines.slice(1);

        for (const l of lines) {
          const line = l.split(" ");

          if (line.length > 1) {
            let fn = line[1];
            fn = fn === "runTests" ? "test" : fn;

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
