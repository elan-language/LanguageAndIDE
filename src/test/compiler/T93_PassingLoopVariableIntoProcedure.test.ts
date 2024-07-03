import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { TestStatus } from "../../frames/status-enums";
import { AssertOutcome } from "../../system";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertGraphicsContains,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T93_PassingLoopVariableIntoProcedure", () => {
  test("Pass_CorrectedPattern", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

procedure removeLetters(wordAsPlayed as String)
  each letter in wordAsPlayed
    var x set to letter
    call removeLetter(x)
  end each
end procedure

procedure removeLetter(l as String)
end procedure

main
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function removeLetters(wordAsPlayed) {
  for (const letter of wordAsPlayed) {
    var x = letter;
    await removeLetter(x);
  }
}

async function removeLetter(l) {

}

async function main() {

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Fail_InvalidPattern", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

procedure removeLetters(wordAsPlayed as String)
  each letter in wordAsPlayed
    call removeLetter(letter)
  end each
end procedure

procedure removeLetter(l as String)
end procedure

main
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate counter"]);
  });
});
