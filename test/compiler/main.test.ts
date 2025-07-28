import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "There can only be one 'main' in a program.LangRef.html#compile_error",
    ]);
  });
});
