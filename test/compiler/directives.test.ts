import {
  elanAnyType,
  elanFunction,
  elanProcedure,
  ProcedureOptions,
} from "../../src/compiler/elan-type-annotations";
import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { StdLibSymbols } from "../../src/compiler/standard-library/std-lib-symbols";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
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

  @elanProcedure(["any"], ProcedureOptions.async)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async printNoLine(@elanAnyType() s: any) {
    const sl = new StdLib(new StubInputOutput());
    await sl.printNoLine(s);
  }
}

suite("Directives", () => {
  test("Pass_SimpleFunction", async () => {
    const code = `${testHeader}

main
  variable x set to 0.0
  set x to simpleFunction()
  call printNoLine(x)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });
});
