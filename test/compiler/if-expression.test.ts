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

suite("if Expression", () => {
  test("Pass_1", async () => {
    const code = `${testHeader}

main
  call printNoLine(if(true, 1, 2))
  call printNoLine(if(false, 3, 4))
  call printNoLine(if(true, if(true, "A", "B"), if(true, "C", "D")))
  call printNoLine(if(true, if(false, "A", "B"), if(true, "C", "D")))
  call printNoLine(if(false, if(true, "A", "B"), if(true, "C", "D")))
  call printNoLine(if(false, if(true, "A", "B"), if(false, "C", "D")))
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
