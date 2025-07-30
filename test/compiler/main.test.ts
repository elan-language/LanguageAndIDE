import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertParses,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Main", () => {
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
