import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotCompileWithId,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Arithmetic Operators", () => {
  test("Pass_IntAddition", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 + 4
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString(3 + 4));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_IntSubtraction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 - 4
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString(3 - 4));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "-1");
  });

  test("Pass_IntMultiplication", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 * 4
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString(3 * 4));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test("Pass_IncludeVariable", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  print a + 4
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = 3;
  system.printLine(_stdlib.asString(a + 4));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_DivideIntegersToFloat", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 / 2
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString(3 / 2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1.5");
  });

  test("Pass_IntegerDivision", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 7 div 2
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString(Math.floor(7 / 2)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_Mod", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 11 mod 3
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString(11 % 3));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_ModWithComparison", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print if (25 mod 20) < 19 then 1 else 2
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString((25 % 20) < 19 ? 1 : 2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_Power", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 3 ^ 3
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString(3 ** 3));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "27");
  });

  test("Pass_UseVariableBothSides", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  set a to a + 1
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  var a = 3;
  a = a + 1;
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4");
  });

  test("Fail_InvalidExpression", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var a = 3 4
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_PlusEquals", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  a += 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_PlusPlus", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  a++
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AddWrongTypes", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3 + true
  variable b set to true + 3
  variable c set to 3 + new Foo()
end main

class Foo
    constructor()
    end constructor
   
end class

`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "expr5", ["Incompatible types Boolean to Float or Int"]);

    assertDoesNotCompileWithId(fileImpl, "expr8", ["Incompatible types Boolean to Float or Int"]);

    assertDoesNotCompileWithId(fileImpl, "expr11", ["Incompatible types Foo to Float or Int"]);
  });

  test("Fail_IntegerDivisionOnFloats1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 7.6 div 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  test("Fail_IntegerDivisionOnFloats2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 7 div 2.5
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  system.printLine(_stdlib.asString(Math.floor(7.6 / 2.5)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  test("Fail_ModWithFloats1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 11 mod 3.2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  test("Fail_ModWithFloats2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print 11.7 mod 3
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });
});
