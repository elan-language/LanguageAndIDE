import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import { assertDoesNotCompile, assertParses, testHash, transforms } from "./compiler-test-helpers";

suite("Main", () => {
  test("Fail_TwoMain", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  var a set to 3
end main

main
  var a set to 3
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["There can only be one 'main' in a program."]);
  });
});
