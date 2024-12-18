import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompileWithId,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Variables", () => {
  test("Pass_Int", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 3;
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_IntVariable", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  variable b set to a
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 3;
  var b = a;
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "3");
  });

  test("Pass_Int_Expression", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3 + 4
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 3 + 4;
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_Reassign", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  set a to 4
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 3;
  a = 4;
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

  test("Pass_CoerceFloatToIntVar", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3.1
  set a to 4
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 3.1;
  a = 4;
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

  test("Pass_OperatorCoverage", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3 - 4
  variable b set to 3 < 4
  variable c set to 3 <= 4
  variable d set to 3 > 4
  variable e set to 3 >= 4
  variable f set to 3 is 4
  variable g set to 3 isnt 4
  variable h set to not false
  variable k set to 4 / 3
  print a
  print b
  print c
  print d
  print e
  print f
  print g
  print h
  print k
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 3 - 4;
  var b = 3 < 4;
  var c = 3 <= 4;
  var d = 3 > 4;
  var e = 3 >= 4;
  var f = 3 === 4;
  var g = 3 !== 4;
  var h = !false;
  var k = 4 / 3;
  system.printLine(_stdlib.asString(a));
  system.printLine(_stdlib.asString(b));
  system.printLine(_stdlib.asString(c));
  system.printLine(_stdlib.asString(d));
  system.printLine(_stdlib.asString(e));
  system.printLine(_stdlib.asString(f));
  system.printLine(_stdlib.asString(g));
  system.printLine(_stdlib.asString(h));
  system.printLine(_stdlib.asString(k));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "-1truetruefalsefalsefalsetruetrue1.3333333333333333");
  });

  test("Pass_Enum", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to Fruit.apple
  print a
end main
enum Fruit apple, orange, pear`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
var Fruit = {
  _default : "apple", apple : "apple", orange : "orange", pear : "pear"
};

async function main() {
  var a = Fruit.apple;
  system.printLine(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "apple");
  });

  test("Pass_Iter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {1, 2}

main
  variable b set to a.map(lambda x as Int => x)
  set b to {1, 2}
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.list([1, 2]);

};
async function main() {
  var b = _stdlib.map(global.a, (x) => x);
  b = system.list([1, 2]);
  system.printLine(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1, 2}");
  });

  test("Fail_WrongKeyword", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var a set to 3
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_GlobalVariable", async () => {
    const code = `# FFFF Elan v1.0.0 valid

variable a set to 4
main
 
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_AssignIncompatibleType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to "astring"
  set a to 4.1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "set6", ["Incompatible types Float to String"]);
  });

  test("Fail_NotInitialized", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var a
  set a to 4.1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_InvalidVariableName1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var A = 4.1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_InvalidVariableName2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a@b set to 4.1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable if set to 4.1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "var3", [
      "'if' is a keyword, and may not be used as an identifier",
    ]);
  });

  test("Fail_UseOfReservedwordAsName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable break set to 4.1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "var3", [
      "'break' is a reserved word, and may not be used as an identifier",
    ]);
  });

  test("Fail_TypeCheck1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "set22", ["Incompatible types Float to Boolean"]);
    assertDoesNotCompileWithId(fileImpl, "set25", ["Incompatible types Boolean to Int"]);
    assertDoesNotCompileWithId(fileImpl, "set28", ["Incompatible types List<of Float> to String"]);
    assertDoesNotCompileWithId(fileImpl, "set31", ["Incompatible types Float to Int"]);
  });

  test("Fail_TypeCheck2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to createArray(3, "")
  variable b set to {1.0, 2}
  variable c set to ["a":1.0, "b":3, "z":10]
  set a to {1.0, 2}
  set b to a
  set c to b
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "set12", [
      "Incompatible types List<of Float> to Array<of String>",
    ]);

    assertDoesNotCompileWithId(fileImpl, "set15", [
      "Incompatible types Array<of String> to List<of Float> try converting with '.asList()'",
    ]);

    assertDoesNotCompileWithId(fileImpl, "set18", [
      "Incompatible types List<of Float> to Dictionary<of String, Float>",
    ]);
  });

  test("Fail_RecursiveDefinition", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to x + 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "expr5", ["'x' is not defined"]);
  });

  test("Fail_referenceToExtensionFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable i set to [1,2]
  variable x set to head
  variable y set to x(i)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "expr11", ["Cannot call extension method directly"]);
  });

  test("Fail_referenceToExtensionFunction1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable i set to [1,2]
  variable x set to head
  variable y set to i.x()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompileWithId(fileImpl, "expr11", [
      "'x' is not defined",
      "Cannot invoke identifier 'x' as a method",
    ]);
  });

  test("Pass_Redefine", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a, length set to foo()
end main

function foo() returns (Int, Int)
  return (0, 0)
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var [a, length] = foo();
}

function foo() {
  return system.tuple([0, 0]);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });
});
