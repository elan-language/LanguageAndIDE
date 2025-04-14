import { elanDeprecated, elanFunction } from "../../src/elan-type-annotations";
import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import { StdLibSymbols } from "../../src/standard-library/std-lib-symbols";
import {
  assertCompiles,
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

class TestStdLib {
  @elanDeprecated(0, 0, "LibRef.html#Xxxx")
  @elanFunction([])
  deprecated(): number {
    return 0;
  }

  @elanDeprecated(1, 0, "LibRef.html#Xxxx")
  @elanFunction([])
  notYetDeprecated1(): number {
    return 0;
  }

  @elanDeprecated(0, 20, "LibRef.html#Xxxx")
  @elanFunction([])
  notYetDeprecated2(): number {
    return 0;
  }
}

suite("Deprecation", () => {
  test("Pass_notYetDeprecatedMajor", async () => {
    const code = `${testHeader}

main
  variable x set to notYetDeprecated1()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });

  test("Pass_notYetDeprecatedMinor", async () => {
    const code = `${testHeader}

main
  variable x set to notYetDeprecated2()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });

  test("Fail_FunctionDeprecation", async () => {
    const code = `${testHeader}

main
  variable x set to deprecated()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [`Deprecated since 0.0LibRef.html#Xxxx`]);
  });
});
