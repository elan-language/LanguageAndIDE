import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { MainFrame } from "../../frames/globals/main-frame";
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

suite("T_4.5_LetStatement", () => {
  test("Pass_normal", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be 3
  let y be x + 3
  print x + y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = () => 3;
  var y = () => x() + 3;
  system.print(_stdlib.asString(x() + y()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "9");
  });

  test("Pass_proveLazilyEvaluated", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be  1 / 0
  let y be 4
  print y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = () => 1 / 0;
  var y = () => 4;
  system.print(_stdlib.asString(y()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4"); //i.e. does not generate a division by zero error from the first let (are we testing that it DOES for a var/set!)
  });

  test("Fail_cannotRedefine ", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be 3
  let x be 4
  print x + y
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not reassign x"]);
  });

  test("Fail_cannotAssign", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be 3
  set x to 4
  print x + y
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate x"]);
  });

  test("Fail_RecursiveDefinition", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be x + 1
  print x
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Unknown to Float", "x is not defined"]);
  });

  ignore_test("Fail_RecursiveDefinition1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 1
  let y be x.y
  print y
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Unknown to Float", "x is not defined"]);
  });
});
