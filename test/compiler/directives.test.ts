import { StdLibSymbols } from "../../src/compiler/standard-library/std-lib-symbols";
import { elanFunction } from "../../src/elan-type-annotations";
import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertCompiles,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

class TestStdLib {
  @elanFunction([])
  simpleFunction(): number {
    return 101;
  }
}

suite("Directives", () => {
  test("Pass_SimpleFunction", async () => {
    const code = `${testHeader}

main
  variable x set to 0.0
  set x to simpleFunction()
  print x
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });
});
