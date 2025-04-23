import assert from "assert";
import { DefaultProfile } from "../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../src/frames/file-impl";
import { CompileStatus, ParseStatus, RunStatus, TestStatus } from "../src/frames/status-enums";
import { testHash, testHeader, transforms } from "./compiler/compiler-test-helpers";

suite("Overall Status Tests", () => {
  test("Pattern for starting from literal program", async () => {
    const code = `${testHeader}
  
      constant a set to 3
      main
        print a
      end main
      `;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
  });

  test("new file created with all statuses at default", async () => {
    const prof = new DefaultProfile();
    const f = new FileImpl(testHash, prof, "", transforms(), true);
    assert.equal(f.readParseStatus(), ParseStatus.default);
    assert.equal(f.readCompileStatus(), CompileStatus.default);
    assert.equal(f.readTestStatus(), TestStatus.default);
    assert.equal(f.readRunStatus(), RunStatus.default);
  });
});
