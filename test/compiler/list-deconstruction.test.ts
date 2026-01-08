import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../../src/ide/frames/code-source-from-string";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("List Deconstruction", () => {
  test("Pass_DeconstructIntoExistingVariables", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2,3]
  variable x set to 1
  variable y set to empty List<of Int>
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3]);
  let x = 1;
  let y = system.initialise(_stdlib.List.emptyInstance());
  [x, y] = system.deconstructList(a);
  await system.print(x);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1[2, 3]");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard1", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2,3]
  variable y set to empty List<of Int>
  set _:y to a
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3]);
  let y = system.initialise(_stdlib.List.emptyInstance());
  [, y] = system.deconstructList(a);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[2, 3]");
  });

  test("Pass_DeconstructIntoExistingVariablesWithDiscard2", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2,3]
  variable x set to 1
  set x:_ to a
  print x
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3]);
  let x = 1;
  [x, ] = system.deconstructList(a);
  await system.print(x);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_DeconstructIntoNewVariables", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2,3]
  variable x:y set to a
  print x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1, 2, 3]);
  let [x, y] = system.deconstructList(a);
  await system.print(x);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1[2, 3]");
  });

  test("Pass_DeconstructListOfListIntoExistingVariables", async () => {
    const code = `${testHeader}

main
  variable a set to [[1,2,3], [4,5,6], [7,8,9]]
  variable x set to empty List<of Int>
  variable y set to empty List<of List<of Int>>
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([1, 2, 3]), system.list([4, 5, 6]), system.list([7, 8, 9])]);
  let x = system.initialise(_stdlib.List.emptyInstance());
  let y = system.initialise(_stdlib.List.emptyInstance());
  [x, y] = system.deconstructList(a);
  await system.print(x);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3][[4, 5, 6], [7, 8, 9]]");
  });

  test("Pass_DeconstructListOfListIntoNewVariables", async () => {
    const code = `${testHeader}

main
  variable a set to [[1,2,3], [4,5,6], [7,8,9]]
  variable x:y set to a
  print x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([1, 2, 3]), system.list([4, 5, 6]), system.list([7, 8, 9])]);
  let [x, y] = system.deconstructList(a);
  await system.print(x);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3][[4, 5, 6], [7, 8, 9]]");
  });

  test("Pass_DeconstructListOfListIntoNewLetVariables", async () => {
    const code = `${testHeader}

main
  variable a set to [[1,2,3], [4,5,6], [7,8,9]]
  let x:y be a
  print x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([1, 2, 3]), system.list([4, 5, 6]), system.list([7, 8, 9])]);
  const [x, y] = system.deconstructList(a);
  await system.print(x);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3][[4, 5, 6], [7, 8, 9]]");
  });

  test("Pass_DeconstructExistingOneElement", async () => {
    const code = `${testHeader}

main
  variable a set to [1]
  variable x set to 1
  variable y set to empty List<of Int>
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1]);
  let x = 1;
  let y = system.initialise(_stdlib.List.emptyInstance());
  [x, y] = system.deconstructList(a);
  await system.print(x);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1[]");
  });

  test("Pass_DeconstructIntoLetVariables", async () => {
    const code = `${testHeader}

main
  variable a set to {1,2,3}
  let x:y be a
  print x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([1, 2, 3]);
  const [x, y] = system.deconstructList(a);
  await system.print(x);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1{2, 3}");
  });

  test("Pass_DeconstructIntoLetVariablesWithDiscard1", async () => {
    const code = `${testHeader}

main
  variable a set to {1,2,3}
  let x:_ be a
  print x
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([1, 2, 3]);
  const [x, ] = system.deconstructList(a);
  await system.print(x);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_DeconstructIntoLetVariablesWithDiscard2", async () => {
    const code = `${testHeader}

main
  variable a set to {1,2,3}
  let _:y be a
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([1, 2, 3]);
  const [, y] = system.deconstructList(a);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{2, 3}");
  });

  test("Pass_DeconstructNewOneElement", async () => {
    const code = `${testHeader}

main
  variable a set to [1]
  variable x:y set to a
  print x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1]);
  let [x, y] = system.deconstructList(a);
  await system.print(x);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1[]");
  });

  test("Pass_DeconstructNewLetOneElement", async () => {
    const code = `${testHeader}

main
  variable a set to [1]
  let x:y be a
  print x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([1]);
  const [x, y] = system.deconstructList(a);
  await system.print(x);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1[]");
  });

  test("Pass_DeconstructListIntoNewVariables", async () => {
    const code = `${testHeader}

main
  variable a set to {1,2,3}
  variable x:y set to a
  print x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([1, 2, 3]);
  let [x, y] = system.deconstructList(a);
  await system.print(x);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1{2, 3}");
  });

  test("Pass_DeconstructListIntoExistingVariables", async () => {
    const code = `${testHeader}

main
  variable a set to {1,2,3}
  variable x set to 1
  variable y set to empty ListImmutable<of Int>
  set x:y to a
  print x
  print y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([1, 2, 3]);
  let x = 1;
  let y = system.initialise(_stdlib.ListImmutable.emptyInstance());
  [x, y] = system.deconstructList(a);
  await system.print(x);
  await system.print(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1{2, 3}");
  });

  test("Pass_DeconstructListTypes", async () => {
    const code = `${testHeader}

main
  variable a set to {1,2,3}
  variable x:y set to a
  set x to x
  set y to y
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([1, 2, 3]);
  let [x, y] = system.deconstructList(a);
  x = x;
  y = y;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_DeconstructIntoWrongType1", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable x set to ""
  variable y set to empty List<of Int>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: String, Provided: Int.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DeconstructIntoWrongType2", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable x set to 0
  variable y set to empty List<of String>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: String.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: List<of String>, Provided: List<of Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DeconstructIntoWrongType3", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable x set to ""
  variable y set to empty List<of String>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: List<of String>, Provided: List<of Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DeconstructIntoWrongType4", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable x set to 0
  variable y set to 0
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: List<of Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DeconstructIntoWrongType5", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable x set to empty List<of Int>
  variable y set to empty List<of Int>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: List<of Int>, Provided: Int.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DeconstructIntoWrongType6", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable x set to 0
  variable y set to empty ListImmutable<of Int>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: ListImmutable<of Int>, Provided: List<of Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DeconstructIntoWrongType1WithDiscard", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable x set to ""
  set x:_ to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: ListImmutable<of String> or List<of String>, Provided: List<of Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_DeconstructIntoWrongType2WithDiscard", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable y set to empty List<of String>
  set _:y to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: List<of String>, Provided: List<of Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_CannotDeconstruct1", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  variable x:y set to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expression must be able to be deconstructed.LangRef.html#TypeCompileError",
    ]);
  });

  test("Fail_CannotDeconstructLet", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  let x:y be a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expression must be able to be deconstructed.LangRef.html#TypeCompileError",
    ]);
  });

  test("Fail_CannotDeconstruct2", async () => {
    const code = `${testHeader}

main
  variable a set to "fred"
  variable x:y set to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expression must be able to be deconstructed.LangRef.html#TypeCompileError",
    ]);
  });

  test("Fail_CannotDeconstruct3", async () => {
    const code = `${testHeader}

main
  variable a set to {"fred":1}
  variable x:y set to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expression must be able to be deconstructed.LangRef.html#TypeCompileError",
    ]);
  });

  test("Fail_CannotDeconstruct4", async () => {
    const code = `${testHeader}

main
  variable a set to {1:1}
  variable x set to 0
  variable y set to empty List<of Int>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expression must be able to be deconstructed.LangRef.html#TypeCompileError",
    ]);
  });

  test("Fail_CannotDeconstruct5", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  variable x set to 0
  variable y set to empty List<of Int>
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expression must be able to be deconstructed.LangRef.html#TypeCompileError",
    ]);
  });

  test("Fail_DeconstructEmptyList1", async () => {
    const code = `${testHeader}

main
  variable a set to empty List<of Int>
  variable x:y set to a
  print x
  print y
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range error");
  });

  test("Fail_DeconstructEmptyList2", async () => {
    const code = `${testHeader}

main
  variable a set to empty List<of Int>
  variable x set to 0
  variable y set to empty List<of Int>
  set x:y to a
  print x
  print y
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range error");
  });

  test("Fail_DeconstructIntoExistingLetVariables", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2,3]
  let x be 1
  let y be empty List<of Int>
  set x:y to a
  print x
  print y
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the 'let' 'x'.LangRef.html#compile_error",
      "May not re-assign the 'let' 'y'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DeconstructIntoExistingAndNewVariables", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2,3]
  variable x set to 1
  set x:y to a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'y' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_TupleDeconstructList", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  let x, y be a
  print x
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot deconstruct List<of Int> as tuple.LangRef.html#compile_error",
    ]);
  });

  test("Fail_TupleSetDeconstructList", async () => {
    const code = `${testHeader}

main
  variable a set to [1,2]
  variable x set to 0
  variable y set to 0
  set x, y to a
  print x
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot deconstruct List<of Int> as tuple.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ListDeconstructTuple", async () => {
    const code = `${testHeader}

main
  variable a set to tuple(1,"apple")
  variable x:y set to a
  print x
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot deconstruct tuple(Int, String) as list.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ListSetDeconstructTuple", async () => {
    const code = `${testHeader}

main
  variable a set to tuple(1,"apple")
  variable x set to 0
  variable y set to ""
  set x:y to a
  print x
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: String.LangRef.html#TypesCompileError",
      "Cannot deconstruct tuple(Int, String) as list.LangRef.html#compile_error",
    ]);
  });

  test("Fail_Id1", async () => {
    const code = `${testHeader}

main
  variable a:b set to [1,2,3]
  call a()
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot invoke identifier 'a' as a method.LangRef.html#compile_error",
    ]);
  });

  test("Fail_Id2", async () => {
    const code = `${testHeader}

main
  variable a:b set to [1,2,3]
  call b()
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot invoke identifier 'b' as a method.LangRef.html#compile_error",
    ]);
  });
});
