import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python if Expression", () => {
  test("Pass_1", async () => {
    const code = `${testPythonHeader}

a = foo() # constant

def main() -> None:
  printNoLine(if_(True, 1, 2)) # procedure call
  printNoLine(if_(False, 3, 4)) # procedure call
  printNoLine(if_(True, if_(True, "A", "B"), if_(True, "C", "D"))) # procedure call
  printNoLine(if_(True, if_(False, "A", "B"), if_(True, "C", "D"))) # procedure call
  printNoLine(if_(False, if_(True, "A", "B"), if_(True, "C", "D"))) # procedure call
  printNoLine(if_(False, if_(True, "A", "B"), if_(False, "C", "D"))) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((true ? 1 : 2));
  await _stdlib.printNoLine((false ? 3 : 4));
  await _stdlib.printNoLine((true ? (true ? "A" : "B") : (true ? "C" : "D")));
  await _stdlib.printNoLine((true ? (false ? "A" : "B") : (true ? "C" : "D")));
  await _stdlib.printNoLine((false ? (true ? "A" : "B") : (true ? "C" : "D")));
  await _stdlib.printNoLine((false ? (true ? "A" : "B") : (false ? "C" : "D")));
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
    await assertObjectCodeExecutes(fileImpl, "14ABCD");
  });
});
