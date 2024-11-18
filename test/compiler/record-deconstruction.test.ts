import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Record Deconstruction", () => {
  test("Pass_DeconstructIntoExistingVariables", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to new Foo() with a to 100, b to "fred"
  var a set to 0
  var b set to ""
  set a, b to x
  print a
  print b
end main

record Foo
  property a as Int
  property b as String
end record`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = 100; _a.b = "fred"; return _a;})();
  var a = 0;
  var b = "";
  ({a, b} = x);
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0], ["b", ""]]);};
  a = 0;

  b = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "100fred");
  });

  test("Pass_DeconstructIntoLet", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to new Foo() with a to 3, fruit to "Apple", aBool to true, aFloat to 1.1
  let a, fruit, aBool, aFloat be x
  print a
  print fruit
  print aBool
  print aFloat
end main


record Foo
  property a as Int
  property fruit as String
  property aBool as Boolean
  property aFloat as Float
end record
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = 3; _a.fruit = "Apple"; _a.aBool = true; _a.aFloat = 1.1; return _a;})();
  const {a, fruit, aBool, aFloat} = x;
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(fruit));
  system.printLine(_stdlib.asString(aBool));
  system.printLine(_stdlib.asString(aFloat));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0], ["fruit", ""], ["aBool", false], ["aFloat", 0]]);};
  a = 0;

  fruit = "";

  aBool = false;

  aFloat = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Appletrue1.1");
  });

  test("Fail_DeconstructIntoExistingVariablesWithDiscard", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to new Foo() with a to 100, b to "fred"
  var b set to ""
  set _, b to x
  print b
end main

record Foo
  property a as Int
  property b as String
end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot discard in record deconstruction"]);
  });

  test("Fail_DeconstructIntoLetVariablesWithDiscard", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to new Foo() with a to 100, b to "fred"
  let _, b be x
  print b
end main

record Foo
  property a as Int
  property b as String
end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot discard in record deconstruction"]);
  });

  test("Pass_DeconstructIntoNewVariables", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to new Foo() with a to 100, b to "fred"
  var a, b set to x
  print a
  print b
end main

record Foo
  property a as Int
  property b as String
end record`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = 100; _a.b = "fred"; return _a;})();
  var {a, b} = x;
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0], ["b", ""]]);};
  a = 0;

  b = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "100fred");
  });

  test("Fail_DeconstructIntoNewVariablesWithDiscard", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to new Foo() with a to 100, b to "fred"
  var _, b set to x
  print b
end main

record Foo
  property a as Int
  property b as String
end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot discard in record deconstruction"]);
  });

  test("Pass_DeconstructIntoNewVariablesTypeCheck", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to new Foo() with a to 100, b to "fred"
  var a, b set to x
  var y set to 0
  var z set to ""
  set y to a
  set z to b
  print y
  print z
end main

record Foo
  property a as Int
  property b as String
end record`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = 100; _a.b = "fred"; return _a;})();
  var {a, b} = x;
  var y = 0;
  var z = "";
  y = a;
  z = b;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString(z));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", 0], ["b", ""]]);};
  a = 0;

  b = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "100fred");
  });

  test("Pass_DeconstructTupleWithListIntoNew", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to new Foo() with a to {1,2}, b to "fred"
  var a, b set to x
  var y set to empty {Int}
  var z set to ""
  set y to a
  set z to b
  print y
  print z
end main

record Foo
  property a as {Int}
  property b as String
end record`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = system.list([1, 2]); _a.b = "fred"; return _a;})();
  var {a, b} = x;
  var y = system.emptyImmutableList();
  var z = "";
  y = a;
  z = b;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString(z));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.emptyImmutableList()], ["b", ""]]);};
  a = system.emptyImmutableList();

  b = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1, 2}fred");
  });

  test("Pass_DeconstructLetRecordWithListIntoNewLet", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  let x be new Foo() with a to {1,2}, b to "fred"
  let a, b be x
  print a
  print typeof a
  print b
  print typeof b
end main

record Foo
  property a as {Int}
  property b as String
end record`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = system.list([1, 2]); _a.b = "fred"; return _a;})();
  const {a, b} = x;
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString("{Int}"));
  system.printLine(_stdlib.asString(b));
  system.printLine(_stdlib.asString("String"));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.emptyImmutableList()], ["b", ""]]);};
  a = system.emptyImmutableList();

  b = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1, 2}{Int}fredString");
  });

  test("Pass_DeconstructVarRecordWithListIntoNewLet", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to new Foo() with a to {1,2}, b to "fred"
  let a, b be x
  print a
  print typeof a
  print b
  print typeof b
end main

record Foo
  property a as {Int}
  property b as String
end record`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = system.list([1, 2]); _a.b = "fred"; return _a;})();
  const {a, b} = x;
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString("{Int}"));
  system.printLine(_stdlib.asString(b));
  system.printLine(_stdlib.asString("String"));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.emptyImmutableList()], ["b", ""]]);};
  a = system.emptyImmutableList();

  b = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1, 2}{Int}fredString");
  });

  ignore_test("Pass_DeconstructTupleWithTupleIntoNew", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to (1,2)
  var x set to (3, a)
  var y, z set to x
  print y
  print typeof y
  print z
  print typeof z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.tuple([1, 2]);
  var x = system.tuple([3, a]);
  var [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString("(Int, Int)"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int(1, 2)(Int, Int)");
  });

  ignore_test("Pass_DeconstructTupleWithTupleIntoNewLet", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to (1,2)
  var x set to (3, a)
  let y, z be x
  print y
  print typeof y
  print z
  print typeof z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.tuple([1, 2]);
  var x = system.tuple([3, a]);
  const [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString("(Int, Int)"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int(1, 2)(Int, Int)");
  });

  ignore_test("Pass_DeconstructTupleWithTupleIntoExisting", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to (1, 2)
  var x set to (3, a)
  var y set to 0
  var z set to (0, 0)
  set y, z to x
  print y
  print typeof y
  print z
  print typeof z
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.tuple([1, 2]);
  var x = system.tuple([3, a]);
  var y = 0;
  var z = system.tuple([0, 0]);
  [y, z] = x;
  system.printLine(_stdlib.asString(y));
  system.printLine(_stdlib.asString("Int"));
  system.printLine(_stdlib.asString(z));
  system.printLine(_stdlib.asString("(Int, Int)"));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3Int(1, 2)(Int, Int)");
  });

  ignore_test("Fail_DeconstructIntoWrongType", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to (3,"Apple")
  var y set to 0
  var z set to ""
  set z, y to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Int to String",
      "Incompatible types String to Int",
    ]);
  });

  ignore_test("Fail_DeconstructIntoMixed1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to (3,"Apple")
  var z set to ""
  set z, y to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String", "y is not defined"]);
  });

  ignore_test("Fail_DeconstructIntoMixed2", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to (3,"Apple")
  var z set to ""
  var z, y set to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "The identifier 'z' is already used for a variable and cannot be re-defined here.",
    ]);
  });

  ignore_test("Fail_DeconstructIntoWrongTypeWithDiscard", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to (3, "Apple")
  var y set to ""
  set y, _ to x
  print y
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  ignore_test("Fail_DeconstructIntoExistingLetVariables", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var x set to (3, "Apple")
  let y be 0
  let z be ""
  set y, z to x
  print y
  print z
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the 'let' y",
      "May not re-assign the 'let' z",
    ]);
  });

  ignore_test("Fail_CannotDeconstruct", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to 1
  var x,y set to a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  ignore_test("Fail_CannotDeconstructLet", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var a set to 1
  let x, y be a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });
});
