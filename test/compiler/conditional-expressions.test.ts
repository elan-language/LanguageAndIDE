import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Conditional Expressions", () => {
  test("Pass_InFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  print grade(90)
  print grade(70)
  print grade(50)
  print grade(30)
end main

function grade(score as Float) returns String
  return if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail"
end function`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine((await grade(90)));
  await system.printLine((await grade(70)));
  await system.printLine((await grade(50)));
  await system.printLine((await grade(30)));
}

async function grade(score) {
  return score > 80 ? "Distinction" : score > 60 ? "Merit" : score > 40 ? "Pass" : "Fail";
}
global["grade"] = grade;
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "DistinctionMeritPassFail");
  });

  test("Pass_InVariableDeclaration", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable score set to 70
  variable grade set to if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail"
  print grade
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let score = 70;
  let grade = score > 80 ? "Distinction" : score > 60 ? "Merit" : score > 40 ? "Pass" : "Fail";
  await system.printLine(grade);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Merit");
  });

  test("Fail_EndIf", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 print grade(90)
 print grade(70)
 print grade(50)
 print grade(30)
end main

function grade(score as Int) as String
    if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail" end if
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
