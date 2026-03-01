import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Enum", () => {
  test("Pass_PrintValues", async () => {
    const code = `${testHeader}

main
  call printNoLine(Fruit.apple)
  call printNoLine(Fruit.orange)
  call printNoLine(Fruit.pear)
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  await _stdlib.printNoLine(Fruit.apple);
  await _stdlib.printNoLine(Fruit.orange);
  await _stdlib.printNoLine(Fruit.pear);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    await assertObjectCodeExecutes(fileImpl, "appleorangepear");
  });

  test("Pass_useInVariable", async () => {
    const code = `${testHeader}

main
  variable x set to Fruit.apple
  set x to Fruit.pear
  call printNoLine(x)
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let x = Fruit.apple;
  x = Fruit.pear;
  await _stdlib.printNoLine(x);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    await assertObjectCodeExecutes(fileImpl, "pear");
  });

  test("Pass_useAsType", async () => {
    const code = `${testHeader}

main
  variable x set to Fruit.apple
  variable y set to x
  call printNoLine(y)
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let x = Fruit.apple;
  let y = x;
  await _stdlib.printNoLine(y);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_passAsArgument", async () => {
    const code = `${testHeader}

main
  call printNoLine(isFavourite(Fruit.apple))
  call printNoLine(isFavourite(Fruit.pear))
end main
   
enum Fruit apple, orange, pear

function isFavourite(f as Fruit) returns Boolean
  return f is Fruit.pear
end function
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.isFavourite(Fruit.apple)));
  await _stdlib.printNoLine((await global.isFavourite(Fruit.pear)));
}

async function isFavourite(f) {
  return f === Fruit.pear;
}
global["isFavourite"] = isFavourite;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    await assertObjectCodeExecutes(fileImpl, "falsetrue");
  });

  test("Pass_returnFromFunction", async () => {
    const code = `${testHeader}

main
  call printNoLine(firstFruit() is Fruit.apple)
end main
   
enum Fruit apple, orange, pear

function firstFruit() returns Fruit
  return Fruit.apple
end function
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  await _stdlib.printNoLine((await global.firstFruit()) === Fruit.apple);
}

async function firstFruit() {
  return Fruit.apple;
}
global["firstFruit"] = firstFruit;
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    await assertObjectCodeExecutes(fileImpl, "true");
  });

  test("Pass_equality", async () => {
    const code = `${testHeader}

main
  variable x set to Fruit.apple
  call printNoLine(x is Fruit.apple)
  call printNoLine(x is Fruit.pear)
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let x = Fruit.apple;
  await _stdlib.printNoLine(x === Fruit.apple);
  await _stdlib.printNoLine(x === Fruit.pear);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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

  test("Pass_InInterpolatedString", async () => {
    const code = `${testHeader}

main
  variable a set to "Eat more {Fruit.apple}s!"
  call printNoLine(a)
end main
   
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = \`Eat more \${await _stdlib.asString(Fruit.apple)}s!\`;
  await _stdlib.printNoLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
    await assertObjectCodeExecutes(fileImpl, "Eat more apples!");
  });

  test("Fail_coercionToString", async () => {
    const code = `${testHeader}

main
  variable a set to "Eat more " + Fruit.apple
  call printNoLine(a)
end main
   
enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
      "Incompatible types. Expected: Float or Int, Provided: String.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Float or Int, Provided: Fruit.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_InvalidTypeName", async () => {
    const code = `${testHeader}

main
end main

enum fruit apple, orange, pear`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_InvalidValueName", async () => {
    const code = `${testHeader}

main
end main

enum Fruit apple, Orange, pear`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AssigningIntsToValues", async () => {
    const code = `${testHeader}

main
end main

enum Fruit apple = 1, orange = 2, pear = 3`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_coercionToInt", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  set a to Fruit.apple
end main

enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: Fruit.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_undefinedEnum", async () => {
    const code = `${testHeader}

main
  call printNoLine(Fruit.apple)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Fruit' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_undefinedEnumValue", async () => {
    const code = `${testHeader}

main
  call printNoLine(Fruit.kiwi)
end main

enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'kiwi' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testHeader}

main

end main

enum if apple, orange, pear`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfKeywordAsValue", async () => {
    const code = `${testHeader}

main

end main

enum Fruit apple, orange, if`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'if' matches a reserved word (even if different case), so may not be defined as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UseOfReservedWordAsValue", async () => {
    const code = `${testHeader}

main

end main

enum Fruit apple, orange, break`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' matches a reserved word (even if different case), so may not be defined as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_DuplicateNames", async () => {
    const code = `${testHeader}

main

end main

enum Fruit banana, kiwi

enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'Fruit' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_DuplicateValues", async () => {
    const code = `${testHeader}

main

end main

enum Fruit apple, orange, pear, orange`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Name 'orange' not unique in scope.LangRef.html#compile_error",
    ]);
  });
});
