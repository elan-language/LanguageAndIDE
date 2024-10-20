import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Record", () => {
  test("Pass_BasicRecord", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to new Foo()
  print f.p1
end main

record Foo
    property p1 as Float
end record`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.printLine(_stdlib.asString(f.p1));
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

  ignore_test("Fail_NewWithParam", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to new Foo(3)
end main

record Foo
  property p1 as Float
end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Parameters expected: 0 got: 1"]);
  });

  ignore_test("Pass_instantiateUsingWith", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to new Foo() with p1 to 3, p2 to "hello"
  print f.p1
  print f.p2
end main

record Foo
    property p1 as Float
    property p2 as String
end record`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo()); //Something more needed
  system.printLine(_stdlib.asString(f.p1));
  system.printLine(_stdlib.asString(f.p2));
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
    await assertObjectCodeExecutes(fileImpl, "3hello");
  });

  test("Fail_AbstractRecord", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to new Foo(3)
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
    const code = `# FFFF Elan Beta 3 valid

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
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to new Foo()
  print fun(f)
end main

record Foo
  property p1 as Int
end record

function fun(foo as Foo) return Int
    return foo.p1
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.printLine(_stdlib.asString(fun(f)));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

}

function fun(foo) {
  return foo.p1;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_RecordAsProcedureParameter", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var f set to new Foo()
  call proc(f)
end main

record Foo
  property p1 as Int
end record

procedure proc(foo as Foo)
    print foo.p1
end procedure
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  await proc(f);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  p1 = 0;

}

async function proc(foo) {
  system.printLine(_stdlib.asString(foo.p1));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Fail_PrivateProperty", async () => {
    const code = `# FFFF Elan Beta 3 valid

record Foo
  private property p1 as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
