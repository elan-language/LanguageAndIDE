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

suite("Variables", () => {
  test("Pass_Int", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_IntVariable", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  variable b set to a
  call printNoLine(b)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  let b = a;
  await _stdlib.printNoLine(b);
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
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_Int_Expression", async () => {
    const code = `${testHeader}

main
  variable a set to 3 + 4
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3 + 4;
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_Reassign", async () => {
    const code = `${testHeader}

main
  variable a set to 3
  set a to 4
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3;
  a = 4;
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_CoerceFloatToIntVar", async () => {
    const code = `${testHeader}

main
  variable a set to 3.1
  set a to 4
  call printNoLine(a)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3.1;
  a = 4;
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Pass_OperatorCoverage", async () => {
    const code = `${testHeader}

main
  variable a set to 3 - 4
  variable b set to 3 < 4
  variable c set to 3 <= 4
  variable d set to 3 > 4
  variable e set to 3 >= 4
  variable f set to 3 is 4
  variable g set to 3 isnt 4
  variable h set to not false
  variable k set to 4.0 / 3
  call printNoLine(a)
  call printNoLine(b)
  call printNoLine(c)
  call printNoLine(d)
  call printNoLine(e)
  call printNoLine(f)
  call printNoLine(g)
  call printNoLine(h)
  call printNoLine(k)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 3 - 4;
  let b = 3 < 4;
  let c = 3 <= 4;
  let d = 3 > 4;
  let e = 3 >= 4;
  let f = 3 === 4;
  let g = 3 !== 4;
  let h = !_stdlib.false;
  let k = 4 / 3;
  await _stdlib.printNoLine(a);
  await _stdlib.printNoLine(b);
  await _stdlib.printNoLine(c);
  await _stdlib.printNoLine(d);
  await _stdlib.printNoLine(e);
  await _stdlib.printNoLine(f);
  await _stdlib.printNoLine(g);
  await _stdlib.printNoLine(h);
  await _stdlib.printNoLine(k);
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
    await assertObjectCodeExecutes(fileImpl, "-1truetruefalsefalsefalsetruetrue1.3333333333333333");
  });

  test("Pass_Enum", async () => {
    const code = `${testHeader}

main
  variable a set to Fruit.apple
  call printNoLine(a)
end main
enum Fruit apple, orange, pear`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

const global = new class {};
async function main() {
  let a = Fruit.apple;
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_Iter", async () => {
    const code = `${testHeader}

constant a set to {1, 2}

main
  variable b set to a.map(lambda x as Int => x)
  set b to {1, 2}
  call printNoLine(b)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.listImmutable([1, 2]);

};
async function main() {
  let b = (await global.a.map(async (x) => x));
  b = system.listImmutable([1, 2]);
  await _stdlib.printNoLine(b);
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
    await assertObjectCodeExecutes(fileImpl, "{1, 2}");
  });

  //   test("Pass_Security", async () => {
  //     const code = `${testHeader}

  // main
  //   variable a set to ""
  //   variable b set to "{a}\` + eval('console.warn(\`fred\`)') + \`"
  // end main`;

  //     const objectCode = "let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
  // const global = new class {};
  // async function main() {
  //   let a = "";
  //   let b = \`\${await _stdlib.asString(a)}\\` + eval('console.warn(\\`fred\\`)') + \\`\`;
  // }
  // return [main, _tests];}";

  //     const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), new StdLib(new StubInputOutput()), true);
  //     await fileImpl.parseFrom(new CodeSourceFromString(code));

  //     assertParses(fileImpl);
  //     assertStatusIsValid(fileImpl);
  //     assertObjectCodeIs(fileImpl, objectCode);
  //     await assertObjectCodeExecutes(fileImpl, "");
  //   });

  test("Fail_WrongKeyword", async () => {
    const code = `${testHeader}

main
  var a set to 3
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_GlobalVariable", async () => {
    const code = `${testHeader}

variable a set to 4
main
 
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AssignIncompatibleType", async () => {
    const code = `${testHeader}

main
  variable a set to "astring"
  set a to 4.1
end main`;

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
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: String, Provided: Float.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_NotInitialized", async () => {
    const code = `${testHeader}

main
  variable a
  set a to 4.1
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_InvalidVariableName1", async () => {
    const code = `${testHeader}

main
  let a = 4.1
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_InvalidVariableName2", async () => {
    const code = `${testHeader}

main
  variable a@b set to 4.1
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testHeader}

main
  variable if set to 4.1
end main`;

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
    assertDoesNotCompile(fileImpl, [
      "'if' is a keyword, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UseOfReservedwordAsName", async () => {
    const code = `${testHeader}

main
  variable break set to 4.1
end main`;

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
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_TypeCheck1", async () => {
    const code = `${testHeader}

function f() returns Int
  return 0
end function
main
  variable a set to true
  variable b set to 1
  variable c set to ""
  variable d set to f()
  set a to 1.0
  set b to false
  set c to {1.0, 2}
  set d to 1.0
end main`;

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
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Boolean, Provided: Float.LangRef.html#TypesCompileError",

      "Incompatible types. Expected: Int, Provided: Boolean.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: String, Provided: ListImmutable<of Float>.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Int, Provided: Float.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_TypeCheck2", async () => {
    const code = `${testHeader}

main
  variable a set to createList(3, "")
  variable b set to {1.0, 2}
  variable c set to ["a":1.0, "b":3, "z":10]
  set a to {1.0, 2}
  set b to a
  set c to b
end main`;

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
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: List<of String>, Provided: ListImmutable<of Float>.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: ListImmutable<of Float> try converting with '.asListImmutable()', Provided: List<of String>.LangRef.html#TypesCompileError",
      "Incompatible types. Expected: Dictionary<of String, Float>, Provided: ListImmutable<of Float>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_RecursiveDefinition", async () => {
    const code = `${testHeader}

main
  variable x set to x + 1
end main`;

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
    assertDoesNotCompile(fileImpl, ["'x' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_referenceToExtensionFunction", async () => {
    const code = `${testHeader}

main
  variable x set to ref createFileForWriting
  variable y set to x("")
end main`;

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
    assertDoesNotCompile(fileImpl, [
      "The 'ref' keyword is no longer needed and we recommend that you remove it.LangRef.html#ref",
      "Library or class function 'createFileForWriting' cannot be used without bracketsLangRef.html#NotGlobalFunctionRefCompileError",
    ]);
  });

  test("Fail_referenceToExtensionFunction1", async () => {
    const code = `${testHeader}

main
  variable i set to 1
  variable x set to asList
  variable y set to i.x()
end main`;

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
    assertDoesNotCompile(fileImpl, [
      "'asList' is not defined.LangRef.html#compile_error",
      "'x' is not defined for type 'Int'.LangRef.html#compile_error",
    ]);
  });

  test("Pass_Redefine", async () => {
    const code = `${testHeader}

main
  variable a, length set to foo()
end main

function foo() returns (Int, Int)
  return tuple(0, 0)
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let [a, length] = (await global.foo());
}

async function foo() {
  return system.tuple([0, 0]);
}
global["foo"] = foo;
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
  test("Pass_fourOpenBrackets", async () => {
    const code = `${testHeader}

main
  variable a set to ((((3))))
  call printNoLine(a)
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = ((((3))));
  await _stdlib.printNoLine(a);
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
    await assertObjectCodeExecutes(fileImpl, "3");
  });
});
