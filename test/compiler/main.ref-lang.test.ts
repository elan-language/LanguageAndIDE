import { CodeSourceFromString } from "../../src/ide/frames/file-impl";
import { LanguageElan } from "../../src/ide/frames/language-elan";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  newFileImpl,
  testHeader,
} from "./compiler-test-helpers";

suite("Main", () => {
  test("Pass_EmptyMain", async () => {
    const code = `${testHeader}

  main

  end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}
return [main, _tests];}`;

    const fileImpl = newFileImpl(LanguageElan.Instance, true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Fail_TwoMain", async () => {
    const code = `${testHeader}

main
  variable a set to 3
end main

main
  variable a set to 3
end main`;

    const fileImpl = newFileImpl(LanguageElan.Instance, true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "There can only be one 'main' in a program.ErrorMessages.html#compile_error",
    ]);
  });
});
