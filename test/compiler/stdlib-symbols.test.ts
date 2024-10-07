import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import { TestStatus } from "../../src/frames/status-enums";
import { AssertOutcome } from "../../src/system";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  assertTestObjectCodeExecutes,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("StdLib-symbols", () => {
  test("Pass_contains", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

constant lst set to {1, 2}
main
 
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
  });
});
