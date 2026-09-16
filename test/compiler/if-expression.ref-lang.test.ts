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
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("if Expression", () => {
  test("Pass_1", async () => {
    const code = `${testHeader}

main
  call printNoLine(if_(true, 1, 2))
  call printNoLine(if_(false, 3, 4))
  call printNoLine(if_(true, if_(true, "A", "B"), if_(true, "C", "D")))
  call printNoLine(if_(true, if_(false, "A", "B"), if_(true, "C", "D")))
  call printNoLine(if_(false, if_(true, "A", "B"), if_(true, "C", "D")))
  call printNoLine(if_(false, if_(true, "A", "B"), if_(false, "C", "D")))
end main`;

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
