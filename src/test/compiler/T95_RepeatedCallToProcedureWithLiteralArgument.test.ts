import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T95_RepeatedCallToProcedureWithLiteralArgument", () => {
  test("Pass_Simple", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  call square(3)
  call square(5)
end main

procedure square(x as Int)
  print x * x
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  await square(3);
  await square(5);
}

async function square(x) {
  system.printLine(_stdlib.asString(x * x));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "925");
  });
});
