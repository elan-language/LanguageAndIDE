import assert from "assert";
import { testHash, testHeader, transforms } from "./compiler/compiler-test-helpers";
import { CodeSourceFromString } from "../src/ide/frames/code-source-from-string";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { FileImpl } from "../src/ide/frames/file-impl";
import { ParseStatus, CompileStatus, RunStatus } from "../src/ide/frames/status-enums";
import { TestStatus } from "../src/compiler/test-status";

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
    assert.equal(f.readParseStatus(), ParseStatus.valid);
    assert.equal(f.readCompileStatus(), CompileStatus.default);
    assert.equal(f.readTestStatus(), TestStatus.default);
    assert.equal(f.readRunStatus(), RunStatus.default);
  });
});
