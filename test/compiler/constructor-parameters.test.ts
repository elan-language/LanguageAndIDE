import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertParses,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Constructor Parameters", () => {
  test("Fail_reassigningIntParam", async () => {
    const code = `${testHeader}

class Foo
    constructor(p_1 as Int)
        set p_1 to property.p1
    end constructor

    property p1 as Int

    function asString() returns String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the parameter 'p_1'. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MutatingListParam", async () => {
    const code = `${testHeader}

class Foo
    constructor(a as List<of Float>)
        call a.put(0, 4)
    end constructor

    function asString() returns String
        return ""
    end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_SetPropertyWithoutPrefix", async () => {
    const code = `${testHeader}

class Foo
    constructor()
        set p1 to 4
    end constructor

    property p1 as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "referencing a property requires a prefix. Click for more info.LangRef.html#compile_error",
    ]);
  });

  test("Fail_OutParameter", async () => {
    const code = `${testHeader}

class Foo
    constructor(out a as Int)
    end constructor

    property p1 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'out' parameters are only supported on procedures. Click for more info.LangRef.html#compile_error",
    ]);
  });
});
