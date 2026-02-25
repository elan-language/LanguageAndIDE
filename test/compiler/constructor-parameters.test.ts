import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not mutate a parameter within a function or constructor.LangRef.html#compile_error",
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "referencing a property requires a prefix.LangRef.html#compile_error",
    ]);
  });

  test("Fail_OutParameter", async () => {
    const code = `${testHeader}

class Foo
    constructor(out a as Int)
    end constructor

    property p1 as Int
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
