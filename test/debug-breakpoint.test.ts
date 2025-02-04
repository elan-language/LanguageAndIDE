import { DefaultProfile } from "../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../src/frames/file-impl";
import { testHash, transforms } from "./compiler/compiler-test-helpers";
import { assertDebugBreakPoint } from "./testHelpers";

suite("DebugBreakpoint", () => {
  test("Pass_Main", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to 1

main

end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["a", "1"]] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "main4", expected);
  });
});
