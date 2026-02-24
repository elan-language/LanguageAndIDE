import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
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

suite("If Statement", () => {
  test("Pass_1", async () => {
    const code = `${testHeader}

main
  call printNoLine(if true then 1 else 2)
  call printNoLine(if false then 3 else 4)
  call printNoLine(if true then if true then "A" else "B" else if true then "C" else "D")
  call printNoLine(if true then if false then "A" else "B" else if true then "C" else "D")
  call printNoLine(if false then if true then "A" else "B" else if true then "C" else "D")
  call printNoLine(if false then if true then "A" else "B" else if false then "C" else "D")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printNoLine((_stdlib.true ? 1 : 2));
  await _stdlib.printNoLine((_stdlib.false ? 3 : 4));
  await _stdlib.printNoLine((_stdlib.true ? (_stdlib.true ? "A" : "B") : (_stdlib.true ? "C" : "D")));
  await _stdlib.printNoLine((_stdlib.true ? (_stdlib.false ? "A" : "B") : (_stdlib.true ? "C" : "D")));
  await _stdlib.printNoLine((_stdlib.false ? (_stdlib.true ? "A" : "B") : (_stdlib.true ? "C" : "D")));
  await _stdlib.printNoLine((_stdlib.false ? (_stdlib.true ? "A" : "B") : (_stdlib.false ? "C" : "D")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
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
