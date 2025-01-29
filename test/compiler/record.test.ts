import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Record", () => {
  test("Pass_BasicRecord", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  print f.p1
end main

record Foo
    property p1 as Float
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  await system.printLine(f.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Fail_NewWithParam", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo(3)
end main

record Foo
  property p1 as Float
end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Too many argument(s). Expected: none"]);
  });

  test("Pass_instantiateUsingWith", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo() with p1 set to 3, p2 set to "hello"
  print f.p1
  print f.p2
end main

record Foo
    property p1 as Float
    property p2 as String
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = (() => {const _a = {...system.initialise(new Foo())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new Foo()))); _a.p1 = 3; _a.p2 = "hello"; return _a;})();
  await system.printLine(f.p1);
  await system.printLine(f.p2);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};
  p1 = 0;

  p2 = "";

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3hello");
  });

  test("Fail_AbstractRecord", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo(3)
  print f.p1
  print f.square()
end main

abstract record Bar

end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_ProcedureOnRecord", async () => {
    const code = `# FFFF Elan v1.0.0 valid

record Foo
  procedure setP1(p1 as Int)
    set property.p1 to p1
  end procedure

end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_RecordAsFunctionParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  print fun(f)
end main

record Foo
  property p1 as Int
end record

function fun(foo as Foo) returns Int
    return foo.p1
end function
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  await system.printLine(await fun(f));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

}

async function fun(foo) {
  return foo.p1;
}
global["fun"] = fun;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_RecordAsProcedureParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  call proc(f)
end main

record Foo
  property p1 as Int
end record

procedure proc(foo as Foo)
    print foo.p1
end procedure
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  await proc(f);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

}

async function proc(foo) {
  await system.printLine(foo.p1);
}
global["proc"] = proc;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_ImmutableProperties", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

record Foo
  property p1 as Int
  property p2 as Float
  property p3 as String
  property p4 as Boolean
  property p5 as RegExp
  property p6 as List<of Int>
  property p7 as DictionaryImmutable<of String, Int>
  property p8 as Bar
end record

record Bar
  property p1 as Int
end record
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", 0], ["p3", ""], ["p4", false], ["p5", system.emptyRegExp()], ["p6", system.emptyImmutableList()], ["p7", system.emptyDictionaryImmutable()]]);};
  p1 = 0;

  p2 = 0;

  p3 = "";

  p4 = false;

  p5 = system.emptyRegExp();

  p6 = system.emptyImmutableList();

  p7 = system.emptyDictionaryImmutable();

  _p8;
  get p8() {
    return this._p8 ??= Bar.emptyInstance();
  }
  set p8(p8) {
    this._p8 = p8;
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};
  p1 = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_PrivateProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

record Foo
  private property p1 as Int

end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_NotImmutableProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

record Foo
  property p1 as Array<of Int> 
  property p2 as Dictionary<of String, Int> 
  property p3 as Bar
end record

class Bar
  constructor()
  end constructor
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Property p1 is not of an immutable type.",
      "Property p2 is not of an immutable type.",
      "Property p3 is not of an immutable type.",
    ]);
  });
});
