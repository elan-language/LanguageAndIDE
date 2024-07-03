import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T36_ConditionalExpressions", () => {
  test("Pass_InFunction", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  print grade(90)
  print grade(70)
  print grade(50)
  print grade(30)
end main

function grade(score as Float) return String
  return if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail"
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.printLine(_stdlib.asString(grade(90)));
  system.printLine(_stdlib.asString(grade(70)));
  system.printLine(_stdlib.asString(grade(50)));
  system.printLine(_stdlib.asString(grade(30)));
}

function grade(score) {
  return score > 80 ? "Distinction" : score > 60 ? "Merit" : score > 40 ? "Pass" : "Fail";
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "DistinctionMeritPassFail");
  });

  test("Pass_InVariableDeclaration", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var score set to 70
  var grade set to if score > 80 then "Distinction" else if score > 60 then "Merit" else if score > 40 then "Pass" else "Fail"
  print grade
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var score = 70;
  var grade = score > 80 ? "Distinction" : score > 60 ? "Merit" : score > 40 ? "Pass" : "Fail";
  system.printLine(_stdlib.asString(grade));
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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

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
