import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T31_Expressions5_LogicalOperators", () => {
  test("Pass_and", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to false and false
  var b set to false and true
  var c set to true and false
  var d set to true and true
  print a
  print b
  print c
  print d
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = false && false;
  var b = false && true;
  var c = true && false;
  var d = true && true;
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
  system.print(_stdlib.asString(c));
  system.print(_stdlib.asString(d));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsefalsefalsetrue");
  });

  test("Pass_or", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to false or false
  var b set to false or true
  var c set to true or false
  var d set to true or true
  print a
  print b
  print c
  print d
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = false || false;
  var b = false || true;
  var c = true || false;
  var d = true || true;
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
  system.print(_stdlib.asString(c));
  system.print(_stdlib.asString(d));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsetruetruetrue");
  });

  test("Pass_not", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to not false
  var b set to not true
  var c set to not not true
  var d set to not not false
  print a
  print b
  print c
  print d
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = !false;
  var b = !true;
  var c = !!true;
  var d = !!false;
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
  system.print(_stdlib.asString(c));
  system.print(_stdlib.asString(d));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalsetruefalse");
  });

  test("Pass_Precedence", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to not false and true
  var b set to not (false and true)
  print a
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = !false && true;
  var b = !(false && true);
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetrue");
  });
  test("Pass_CombineLogicalOpsWithComparison1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main 
  var a set to (4 > 3) and (6 > 5)
  var b set to (3 > 4) or (6 is 6)
  var c set to not (4 > 3)
  print a
  print b
  print c
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = (4 > 3) && (6 > 5);
  var b = (3 > 4) || (6 === 6);
  var c = !(4 > 3);
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
  system.print(_stdlib.asString(c));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruefalse");
  });
  test("Pass_CombineLogicalOpsWithComparison2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main 
  var a set to (true and false) is (true or false)
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = (true && false) === (true || false);
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false");
  });

  // TODO fails
  test("Fail_TypeCheck", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to false and 1
  var b set to 1 and true
  var c set to 1 and 1
  var d set to true or 0
  var e set to 0 or true
  var f set to 0 or 0
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Int to Boolean",
      "Incompatible types Int to Boolean",
      "Incompatible types Int to Boolean",
      "Incompatible types Int to Boolean",
      "Incompatible types Int to Boolean",
      "Incompatible types Int to Boolean",
      "Incompatible types Int to Boolean",
      "Incompatible types Int to Boolean",
    ]);
  });
  test("Fail_CombineLogicalOpsWithComparisonWithoutBrackets", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main 
  var a set to 4 > 3 and 6 > 5
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Boolean to Float"]);
  });

  test("Fail_CombineLogicalOpsWithComparisonWithoutBrackets2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main 
  var a set to not 4 > 3
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Boolean to Float"]);
  });

  test("fail_CombineLogicalOpsWithComparison2WithoutBrackets", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main 
  var a set to true and false is true or false
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = true && false === true || false;
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false");
  });
});
