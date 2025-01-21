import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Record Deconstruction", () => {
  test("Pass_DeconstructIntoExistingVariables", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to 100,
   b set to "fred"
  variable a set to 0
  variable b set to ""
  set a, b to x
  print a
  print b
end main

record Foo
  property a as Int
  property b as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = 100; _a.b = "fred"; return _a;})();
  let a = 0;
  let b = "";
  ({a, b} = x);
  system.printLine(a);
  system.printLine(b);
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to 3,
   fruit set to "Apple",
   aBool set to true,
   aFloat set to 1.1
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = 3; _a.fruit = "Apple"; _a.aBool = _stdlib.true; _a.aFloat = 1.1; return _a;})();
  const {a, fruit, aBool, aFloat} = x;
  system.printLine(a);
  system.printLine(fruit);
  system.printLine(aBool);
  system.printLine(aFloat);
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to 100,
   b set to "fred"
  variable b set to ""
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to 100,
   b set to "fred"
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to 100,
   b set to "fred"
  variable a, b set to x
  print a
  print b
end main

record Foo
  property a as Int
  property b as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = 100; _a.b = "fred"; return _a;})();
  let {a, b} = x;
  system.printLine(a);
  system.printLine(b);
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to 100,
   b set to "fred"
  variable _, b set to x
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
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to 100,
   b set to "fred"
  variable a, b set to x
  variable y set to 0
  variable z set to ""
  set y to a
  set z to b
  print y
  print z
end main

record Foo
  property a as Int
  property b as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = 100; _a.b = "fred"; return _a;})();
  let {a, b} = x;
  let y = 0;
  let z = "";
  y = a;
  z = b;
  system.printLine(y);
  system.printLine(z);
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

  test("Pass_DeconstructRecordWithListIntoNew", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to {1,2},
   b set to "fred"
  variable a, b set to x
  variable y set to empty List<of Int>
  variable z set to ""
  set y to a
  set z to b
  print y
  print z
end main

record Foo
  property a as List<of Int>
  property b as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = system.list([1, 2]); _a.b = "fred"; return _a;})();
  let {a, b} = x;
  let y = system.emptyImmutableList();
  let z = "";
  y = a;
  z = b;
  system.printLine(y);
  system.printLine(z);
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
    const code = `# FFFF Elan v1.0.0 valid

main
  let x be new Foo() with
   a set to {1,2},
   b set to "fred"
  let a, b be x
  print a
  print b
end main

record Foo
  property a as List<of Int>
  property b as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = system.list([1, 2]); _a.b = "fred"; return _a;})();
  const {a, b} = x;
  system.printLine(a);
  system.printLine(b);
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

  test("Pass_DeconstructVarRecordWithListIntoNewLet", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to {1,2},
   b set to "fred"
  let a, b be x
  print a
  print b
end main

record Foo
  property a as List<of Int>
  property b as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = system.list([1, 2]); _a.b = "fred"; return _a;})();
  const {a, b} = x;
  system.printLine(a);
  system.printLine(b);
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

  test("Pass_DeconstructVarRecordWithRecordIntoNewVar", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to {1,2},
   b set to "fred"
  variable y set to new Bar() with
   c set to x
  variable c, d set to y
  print c
  print d
end main

record Foo
  property a as List<of Int>
  property b as String
end record

record Bar
  property c as Foo
  property d as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = system.list([1, 2]); _a.b = "fred"; return _a;})();
  let y = (() => {const _a = {...system.initialise(new Bar())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Bar()))); _a.c = x; return _a;})();
  let {c, d} = y;
  system.printLine(c);
  system.printLine(d);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.emptyImmutableList()], ["b", ""]]);};
  a = system.emptyImmutableList();

  b = "";

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["d", ""]]);};
  _c;
  get c() {
    return this._c ??= Foo.emptyInstance();
  }
  set c(c) {
    this._c = c;
  }

  d = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  test("Pass_DeconstructLetRecordWithRecordIntoNewVar", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let x be new Foo() with
   a set to {1,2},
   b set to "fred"
  let y be new Bar() with
   c set to x
  variable c, d set to y
  print c
  print d
end main

record Foo
  property a as List<of Int>
  property b as String
end record

record Bar
  property c as Foo
  property d as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = system.list([1, 2]); _a.b = "fred"; return _a;})();
  const y = (() => {const _a = {...system.initialise(new Bar())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Bar()))); _a.c = x; return _a;})();
  let {c, d} = y;
  system.printLine(c);
  system.printLine(d);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.emptyImmutableList()], ["b", ""]]);};
  a = system.emptyImmutableList();

  b = "";

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["d", ""]]);};
  _c;
  get c() {
    return this._c ??= Foo.emptyInstance();
  }
  set c(c) {
    this._c = c;
  }

  d = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  //
  test("Pass_DeconstructRecordWithListIntoExisting", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to {1,2},
   b set to "fred"
  variable a set to empty List<of Int>
  variable b set to ""
  set a, b to x
  print a
  print b
end main

record Foo
  property a as List<of Int>
  property b as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = system.list([1, 2]); _a.b = "fred"; return _a;})();
  let a = system.emptyImmutableList();
  let b = "";
  ({a, b} = x);
  system.printLine(a);
  system.printLine(b);
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

  test("Pass_DeconstructVarRecordWithRecordIntoExistingVar", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to {1,2},
   b set to "fred"
  variable y set to new Bar() with
   c set to x
  variable c set to empty Foo
  variable d set to ""
  set c, d to y
  print c
  print d
end main

record Foo
  property a as List<of Int>
  property b as String
end record

record Bar
  property c as Foo
  property d as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = system.list([1, 2]); _a.b = "fred"; return _a;})();
  let y = (() => {const _a = {...system.initialise(new Bar())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Bar()))); _a.c = x; return _a;})();
  let c = Foo.emptyInstance();
  let d = "";
  ({c, d} = y);
  system.printLine(c);
  system.printLine(d);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.emptyImmutableList()], ["b", ""]]);};
  a = system.emptyImmutableList();

  b = "";

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["d", ""]]);};
  _c;
  get c() {
    return this._c ??= Foo.emptyInstance();
  }
  set c(c) {
    this._c = c;
  }

  d = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  test("Pass_DeconstructLetRecordWithRecordIntoExistingVar", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let x be new Foo() with
   a set to {1,2},
   b set to "fred"
  let y be new Bar() with
   c set to x
  variable c set to empty Foo
  variable d set to ""
  set c, d to y
  print c
  print d
end main

record Foo
  property a as List<of Int>
  property b as String
end record

record Bar
  property c as Foo
  property d as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const x = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.a = system.list([1, 2]); _a.b = "fred"; return _a;})();
  const y = (() => {const _a = {...system.initialise(new Bar())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Bar()))); _a.c = x; return _a;})();
  let c = Foo.emptyInstance();
  let d = "";
  ({c, d} = y);
  system.printLine(c);
  system.printLine(d);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.emptyImmutableList()], ["b", ""]]);};
  a = system.emptyImmutableList();

  b = "";

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["d", ""]]);};
  _c;
  get c() {
    return this._c ??= Foo.emptyInstance();
  }
  set c(c) {
    this._c = c;
  }

  d = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  test("Fail_DeconstructIntoWrongType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to 100,
   b set to "fred"
  variable a set to ""
  variable b set to 0
  set a, b to x
  print a
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
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Int to String",
      "Incompatible types String to Int",
    ]);
  });

  test("Fail_DeconstructIntoMixed1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to 100,
   b set to "fred"
  variable a set to ""
  set a, b to x
  print a
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
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String", "'b' is not defined"]);
  });

  test("Fail_DeconstructIntoMixed2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to 100,
   b set to "fred"
  variable a set to ""
  variable a, b set to x
  print a
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
    assertDoesNotCompile(fileImpl, [
      "The identifier 'a' is already used for a variable and cannot be re-defined here.",
      "Incompatible types Int to String",
    ]);
  });

  test("Fail_DeconstructIntoExistingLetVariables", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo() with
   a set to 100,
   b set to "fred"
  let a be 0
  let b be ""
  set a, b to x
  print a
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
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the 'let' 'a'",
      "May not re-assign the 'let' 'b'",
    ]);
  });

  test("Fail_CannotDeconstructNew", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo()
  variable a, b set to x
  print a
  print b
end main

class Foo
  constructor()
  end constructor

  property a as Int
  property b as String
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  test("Fail_CannotDeconstructExisting", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo()
  variable a set to 0
  variable b set to ""
  set a, b to x
  print a
  print b
end main

class Foo
  constructor()
  end constructor

  property a as Int
  property b as String
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });

  test("Fail_CannotDeconstructLet", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to new Foo()
  let a, b be x
  print a
  print b
end main

class Foo
  constructor()
  end constructor

  property a as Int
  property b as String
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Expression must be able to be deconstructed"]);
  });
});
