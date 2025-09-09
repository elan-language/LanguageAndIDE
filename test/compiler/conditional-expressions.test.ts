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

suite("Conditional Expressions", () => {
  test("Pass_InFunction", async () => {
    const code = `${testHeader}

main
  print grade(90)
  print grade(70)
  print grade(50)
  print grade(30)
end main

function grade(score as Float) returns String
  return if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail"
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine((await global.grade(90)));
  await system.printLine((await global.grade(70)));
  await system.printLine((await global.grade(50)));
  await system.printLine((await global.grade(30)));
}

async function grade(score) {
  return (score > 80 ? "Distinction" : (score > 60 ? "Merit" : (score > 40 ? "Pass" : "Fail")));
}
global["grade"] = grade;
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
    await assertObjectCodeExecutes(fileImpl, "DistinctionMeritPassFail");
  });

  test("Pass_InVariableDeclaration", async () => {
    const code = `${testHeader}

main
  variable score set to 70
  variable grade set to if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail"
  print grade
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = 70;
  let grade = (score > 80 ? "Distinction" : (score > 60 ? "Merit" : (score > 40 ? "Pass" : "Fail")));
  await system.printLine(grade);
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
    await assertObjectCodeExecutes(fileImpl, "Merit");
  });

  test("Pass_InExpression", async () => {
    const code = `${testHeader}

main
  variable score set to 70
  set score to score + if score is 70 then 1 else 2
  print score
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = 70;
  score = score + (score === 70 ? 1 : 2);
  await system.printLine(score);
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
    await assertObjectCodeExecutes(fileImpl, "71");
  });

  test("Pass_MostPreciseType1", async () => {
    const code = `${testHeader}

main
  variable score set to 70.1
  set score to if true then 60.1 else 60
  print score
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = 70.1;
  score = (_stdlib.true ? 60.1 : 60);
  await system.printLine(score);
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
    await assertObjectCodeExecutes(fileImpl, "60.1");
  });

  test("Pass_MostPreciseType2", async () => {
    const code = `${testHeader}

main
  variable score set to 70.1
  set score to if false then 60 else 60.1
  print score
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = 70.1;
  score = (_stdlib.false ? 60 : 60.1);
  await system.printLine(score);
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
    await assertObjectCodeExecutes(fileImpl, "60.1");
  });

  test("Pass_CommonSuperClass1", async () => {
    const code = `${testHeader}

main
  variable score set to cast(new Bar())
  set score to if false then new Bar() else cast(new Bar())
  print score
end main

abstract class Foo
end class

class Bar inherits Foo
end class

function cast(bar as Foo) returns Foo
  return bar
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = (await global.cast(system.initialise(await new Bar()._initialise())));
  score = (_stdlib.false ? system.initialise(await new Bar()._initialise()) : (await global.cast(system.initialise(await new Bar()._initialise()))));
  await system.printLine(score);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  async _initialise() { return this; }

}

async function cast(bar) {
  return bar;
}
global["cast"] = cast;
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
    await assertObjectCodeExecutes(fileImpl, "a Bar");
  });

  test("Pass_CommonSuperClass2", async () => {
    const code = `${testHeader}

main
  variable score set to cast(new Bar())
  set score to if false then cast(new Bar()) else new Bar()
  print score
end main

abstract class Foo
end class

class Bar inherits Foo
end class

function cast(bar as Foo) returns Foo
  return bar
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = (await global.cast(system.initialise(await new Bar()._initialise())));
  score = (_stdlib.false ? (await global.cast(system.initialise(await new Bar()._initialise()))) : system.initialise(await new Bar()._initialise()));
  await system.printLine(score);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

}

class Bar extends Foo {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  async _initialise() { return this; }

}

async function cast(bar) {
  return bar;
}
global["cast"] = cast;
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
    await assertObjectCodeExecutes(fileImpl, "a Bar");
  });

  test("Fail_EndIf", async () => {
    const code = `${testHeader}

main
 print grade(90)
 print grade(70)
 print grade(50)
 print grade(30)
end main

function grade(score as Int) as String
    if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail" end if
end function
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_NotBooleanCondition", async () => {
    const code = `${testHeader}

main
 variable a set to if 2 then 5 else 7
 print a
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Condition of 'if' expression does not evaluate to a Boolean.LangRef.html#compile_error",
    ]);
  });

  test("Fail_BranchesDifferentTypes", async () => {
    const code = `${testHeader}

main
 variable a set to if true then "five" else 7
 print a
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot determine common type between Int and String.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MostPreciseType1", async () => {
    const code = `${testHeader}

main
 variable a set to 10
 set a to if true then 0.5 else 10
 print a
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: Float.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_MostPreciseType2", async () => {
    const code = `${testHeader}

main
 variable a set to 10
 set a to if true then 10 else 0.5
 print a
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
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: Float.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_NoCommonSuperClass1", async () => {
    const code = `${testHeader}

main
  variable score set to new Bar()
  set score to if false then new Foo() else new Bar()
  print score
end main

class Foo
end class

class Bar
end class`;

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
      "Cannot determine common type between Bar and Foo.LangRef.html#compile_error",
      "Incompatible types. Expected: Bar, Provided: Foo.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_NoCommonSuperClass2", async () => {
    const code = `${testHeader}

main
  variable score set to new Bar()
  set score to if false then new Bar() else new Foo()
  print score
end main

class Foo
end class

class Bar
end class`;

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
      "Cannot determine common type between Foo and Bar.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotAssignToBaseClass1", async () => {
    const code = `${testHeader}

main
  variable score set to new Bar()
  set score to if false then new Bar() else cast(new Bar())
  print score
end main

abstract class Foo
end class

class Bar inherits Foo
end class

function cast(bar as Foo) returns Foo
  return bar
end function`;

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
      "Incompatible types. Expected: Bar, Provided: Foo.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_CannotAssignToBaseClass2", async () => {
    const code = `${testHeader}

main
  variable score set to new Bar()
  set score to if false then cast(new Bar()) else new Bar()
  print score
end main

abstract class Foo
end class

class Bar inherits Foo
end class

function cast(bar as Foo) returns Foo
  return bar
end function`;

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
      "Incompatible types. Expected: Bar, Provided: Foo.LangRef.html#TypesCompileError",
    ]);
  });
});
