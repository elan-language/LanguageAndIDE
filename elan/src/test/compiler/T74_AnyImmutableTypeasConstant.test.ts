import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite("T74_AnyImmutableTypeAsConstant", () => {
  test("Pass_String", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant k set to "Apple"

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = "Apple";

async function main() {
  system.print(_stdlib.asString(k));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_Tuple", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant k set to (3, "Apple")

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = system.tuple([3, "Apple"]);

async function main() {
  system.print(_stdlib.asString(k));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Tuple (3, Apple)");
  });

  test("Pass_List", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant k set to [1, 2, 3]

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = system.list([1, 2, 3]);

async function main() {
  system.print(_stdlib.asString(k));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "List [1, 2, 3]");
  });

  test("Pass_Dictionary", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant k set to ["a":1, "b":3, "c":3]

main 
  print k
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = {"a" : 1, "b" : 3, "c" : 3};

async function main() {
  system.print(_stdlib.asString(k));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, c:3]");
  });

  // no longer supported ?
  ignore_test("Pass_ImmutableClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant k set to 0

main 
  print k
end main

immutable class Foo
  constructor(p1 as Int)
    set property.p1 to p1 * 2
  end constructor
    
  property p1 as Int
    
  function asString() return String
    return "{p1}"
  end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const k = new Foo(3);

async function main() {
  system.print(_stdlib.asString(k));
}

class Foo {
  constructor(p1) {
    property.p1 = p1 * 2;
  }

  p1 = 0;

  asString() {
    return \`\${p1}\`;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, c:3]");
  });

  // Fails TODO
});
