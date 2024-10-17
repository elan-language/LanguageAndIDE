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

suite("Each Loop", () => {
  test("Pass_List", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {7,8,9}
  var n set to 0
  each x in a
      set n to n + x
  end each
  print n
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([7, 8, 9]);
  var n = 0;
  for (const x of a) {
    n = n + x;
  }
  system.printLine(_stdlib.asString(n));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "24");
  });

  test("Pass_Array", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {7,8,9}.asArray()
  var n set to 0
  each x in a
      set n to n + x
  end each
  print n
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = _stdlib.asArray(system.list([7, 8, 9]));
  var n = 0;
  for (const x of a) {
    n = n + x;
  }
  system.printLine(_stdlib.asString(n));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "24");
  });

  test("Pass_String", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to "hello"
  each x in a
    print x
  end each
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = "hello";
  for (const x of a) {
    system.printLine(_stdlib.asString(x));
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "hello");
  });

  test("Pass_DoubleLoop", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  each x in "12"
    each y in "34"
      print "{x}{y}"
    end each
  end each
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  for (const x of "12") {
    for (const y of "34") {
      system.printLine(_stdlib.asString(\`\${_stdlib.asString(x)}\${_stdlib.asString(y)}\`));
    }
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "13142324");
  });

  test("Pass_functionProvidingList", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  each x in fruit()
    print x
  end each
end main

function fruit() return List<of String>
  return {"apple","orange", "pear"}
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  for (const x of fruit()) {
    system.printLine(_stdlib.asString(x));
  }
}

function fruit() {
  return system.list(["apple", "orange", "pear"]);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "appleorangepear");
  });

  test("Fail_variableIsScoped", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {7, 8, 9}
  var x set to "hello"
  each x in a
    print x
  end each
  print x
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not reassign x"]);
  });

  test("Fail_variableIsScoped2", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {7, 8, 9}
  each x in a
    print x
  end each
  print x
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["x is not defined"]);
  });

  test("Fail_NoEndeach", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to [7, 8, 9]
  each x in a
    print x
  end for
  print x
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_applyToANonIterable", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var y set to 10
  each x in y
    print x
  end each
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot iterate Int"]);
  });

  test("Fail_CannotAlterTheIterableWithinLoop", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var a set to {1, 2, 3, 4, 5}
  each x in a
    set a to a + x
  end each
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate counter"]);
  });
});
