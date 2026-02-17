import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertExportedCSIs,
  assertExportedElanIs,
  assertExportedJavaIs,
  assertExportedPythonIs,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testCSHeader,
  testElanHeader,
  testHash,
  testHeader,
  testJavaHeader,
  testPythonHeader,
  transforms,
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");

    const pythonCode = `${testPythonHeader}

main

end main
`;

    const csCode = `${testCSHeader}

main

end main
`;

    const javaCode = `${testJavaHeader}

main

end main
`;

    const elanCode = `${testElanHeader}

main

end main
`;

    await assertExportedPythonIs(fileImpl, pythonCode);
    await assertExportedCSIs(fileImpl, csCode);
    await assertExportedJavaIs(fileImpl, javaCode);
    await assertExportedElanIs(fileImpl, elanCode);
  });

  test("Fail_TwoMain", async () => {
    const code = `${testHeader}

main
  variable a set to 3
end main

main
  variable a set to 3
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "There can only be one 'main' in a program.LangRef.html#compile_error",
    ]);
  });
});
