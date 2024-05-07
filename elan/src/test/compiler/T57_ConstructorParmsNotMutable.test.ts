import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T57_ConstructorParmsNotMutable', () => {

  test('Fail_reassigningIntParam', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo
    constructor(p_1 as Int)
        set p_1 to p1
    end constructor

    property p1 as Int

    function asString() return String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate parameter"]);
  });

  test('Fail_MutatingArrayParam', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo
    constructor(a as Array<of Float>)
        set a[0] to 4
    end constructor

    function asString() return String
        return ""
    end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate parameter"]);
  });


});
