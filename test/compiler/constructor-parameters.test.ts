import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertParses,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Constructor Parameters", () => {
  test("Fail_reassigningIntParam", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo
    constructor(p_1 as Int)
        set p_1 to p1
    end constructor

    property p1 as Int

    function asString() return String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not re-assign the parameter p_1"]);
  });

  test("Fail_MutatingArrayParam", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo
    constructor(a as Array<of Float>)
        call a.putAt(0, 4)
    end constructor

    function asString() return String
        return ""
    end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_SetPropertyWithoutPrefix", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo
    constructor()
        set p1 to 4
    end constructor

    property p1 as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["assigning to a property requires a prefix"]);
  });

  test("Fail_OutParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo
    constructor(out a as Int)
    end constructor

    property p1 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'out' parameters are only supported on procedures."]);
  });
});
