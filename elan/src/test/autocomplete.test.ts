import { CodeSourceFromString } from "../frames/code-source";
import { DefaultProfile } from "../frames/default-profile";
import { FileImpl } from "../frames/file-impl";
import {
  testHash,
  transforms,
  assertParses,
  assertStatusIsValid,
  assertObjectCodeIs,
  assertObjectCodeExecutes,
  ignore_test,
} from "./compiler/compiler-test-helpers";

suite("Autocomplete", () => {
  ignore_test("Pass_Minimal", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var foo set to 1
  var foobar set to 2
  set f
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
  });
});
