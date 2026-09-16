import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Logical Operators", () => {
  test("Pass_and", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [1, 2, 3, 4] # variable definition
  b = -1 # variable definition
  a[b] = 3 # assignment
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = False and False # variable definition
  b = False and True # variable definition
  c = True and False # variable definition
  d = True and True # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(c) # procedure call
  printNoLine(d) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = false && false;
  let b = false && true;
  let c = true && false;
  let d = true && true;
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
  await _stdlib.printNoLine(c);
  await _stdlib.printNoLine(d);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsefalsefalsetrue");
  });

  test("Pass_or", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = False and False # variable definition
  b = False and True # variable definition
  c = True and False # variable definition
  d = True and True # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(c) # procedure call
  printNoLine(d) # procedure call
# end main

def main() -> None:
  a = False or False # variable definition
  b = False or True # variable definition
  c = True or False # variable definition
  d = True or True # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(c) # procedure call
  printNoLine(d) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = false || false;
  let b = false || true;
  let c = true || false;
  let d = true || true;
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
  await _stdlib.printNoLine(c);
  await _stdlib.printNoLine(d);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruetruetrue");
  });

  test("Pass_not", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = False or False # variable definition
  b = False or True # variable definition
  c = True or False # variable definition
  d = True or True # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(c) # procedure call
  printNoLine(d) # procedure call
# end main

def main() -> None:
  a = not False # variable definition
  b = not True # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = !false;
  let b = !true;
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });

  test("Pass_Precedence", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = not False # variable definition
  b = not True # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = not False and True # variable definition
  b = not (False and True) # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = !false && true;
  let b = !(false && true);
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetrue");
  });
  test("Pass_CombineLogicalOpsWithComparison1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = not False and True # variable definition
  b = not (False and True) # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = (4 > 3) and (6 > 5) # variable definition
  b = (3 > 4) or (6 == 6) # variable definition
  c = not (4 > 3) # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(c) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (4 > 3) && (6 > 5);
  let b = (3 > 4) || (6 === 6);
  let c = !(4 > 3);
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
  await _stdlib.printNoLine(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });
  test("Pass_CombineLogicalOpsWithComparison2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = (4 > 3) and (6 > 5) # variable definition
  b = (3 > 4) or (6 == 6) # variable definition
  c = not (4 > 3) # variable definition
  printNoLine(a) # procedure call
  printNoLine(b) # procedure call
  printNoLine(c) # procedure call
# end main

def main() -> None:
  a = (True and False) == (True or False) # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = (true && false) === (true || false);
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false");
  });

  test("Fail_TypeCheck", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = (True and False) == (True or False) # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = False and 1 # variable definition
  b = 1 and True # variable definition
  c = 1 and 1 # variable definition
  d = True or 0 # variable definition
  e = 0 or True # variable definition
  f = 0 or 0 # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Boolean, Provided: Int.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Boolean, Provided: Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_CombineLogicalOpsWithComparisonWithoutBrackets", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = False and 1 # variable definition
  b = 1 and True # variable definition
  c = 1 and 1 # variable definition
  d = True or 0 # variable definition
  e = 0 or True # variable definition
  f = 0 or 0 # variable definition
# end main

def main() -> None:
  a = 4 > 3 and 6 > 5 # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Boolean, Provided: Int.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: Boolean.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_CombineLogicalOpsWithComparisonWithoutBrackets2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 4 > 3 and 6 > 5 # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = not 4 > 3 # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Boolean, Provided: Int.ErrorMessages.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: Boolean.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_CombineLogicalOpsWithComparison2WithoutBrackets", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = not 4 > 3 # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = True and False == True or False # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = true && false === true || false;
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false");
  });

  test("Fail_UseNotWithTwoArgs", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = True and False == True or False # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = true not false # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_xor", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = true not false # variable definition
# end main

def main() -> None:
  a = false xor false # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_notOnNonBoolean1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = false xor false # variable definition
# end main

def main() -> None:
  a = not 1 # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Boolean, Provided: Int.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_notOnNonBoolean2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = not 1 # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = "fred" # variable definition
  b = not a # variable definition
  printNoLine(b) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Boolean, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_minusOnNonNumber1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "fred" # variable definition
  b = not a # variable definition
  printNoLine(b) # procedure call
# end main

def main() -> None:
  a = -True # variable definition
  printNoLine(a) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: Boolean.ErrorMessages.html#TypesCompileError",
    ]);
  });

  test("Fail_minusOnNonNumber2", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = -True # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  a = "fred" # variable definition
  b = -a # variable definition
  printNoLine(b) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: String.ErrorMessages.html#TypesCompileError",
    ]);
  });
});
