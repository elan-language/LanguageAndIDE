import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Loop Variable", () => {
  test("Pass_Pattern1", async () => {
    const code = `# FFFF Elan Beta 3 valid

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

  test("Pass_Pattern2", async () => {
    const code = `# FFFF Elan Beta 3 valid

procedure removeLetters(wordAsPlayed as String)
  each letter in wordAsPlayed
    call removeLetter(letter)
  end each
end procedure

procedure removeLetter(l as String)
end procedure

main
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function removeLetters(wordAsPlayed) {
  for (const letter of wordAsPlayed) {
    await removeLetter(letter);
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
});
