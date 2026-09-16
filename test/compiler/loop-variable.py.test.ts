import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Loop Variable", () => {
  test("Pass_Pattern1", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = "fred" # variable definition
  b = -a # variable definition
  printNoLine(b) # procedure call
# end main

def removeLetters(wordAsPlayed: str) -> None: # procedure
  for letter in wordAsPlayed:
    x = letter # variable definition
    removeLetter(x) # procedure call
  # end for
# end procedure

def removeLetter(l: str) -> None: # procedure

# end procedure

def main() -> None:

# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function removeLetters(wordAsPlayed) {
  const elan_iterelan_for5 = [...wordAsPlayed];
  for (const letter of elan_iterelan_for5) {
    let x = letter;
    await removeLetter(x);
  }
}
global["removeLetters"] = removeLetters;

async function removeLetter(l) {

}
global["removeLetter"] = removeLetter;

async function main() {

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Pass_Pattern2", async () => {
    const code = `${testPythonHeader}

def removeLetters(wordAsPlayed: str) -> None: # procedure
  for letter in wordAsPlayed:
    x = letter # variable definition
    removeLetter(x) # procedure call
  # end for
# end procedure

def main() -> None:

# end main

def removeLetters(wordAsPlayed: str) -> None: # procedure
  for letter in wordAsPlayed:
    removeLetter(letter) # procedure call
  # end for
# end procedure

def removeLetter(l: str) -> None: # procedure

# end procedure

def main() -> None:

# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function removeLetters(wordAsPlayed) {
  const elan_iterelan_for5 = [...wordAsPlayed];
  for (const letter of elan_iterelan_for5) {
    await removeLetter(letter);
  }
}
global["removeLetters"] = removeLetters;

async function removeLetter(l) {

}
global["removeLetter"] = removeLetter;

async function main() {

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });
});
