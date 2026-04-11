import {
  elanAnyType,
  ElanClass,
  elanClassExport,
  elanClassType,
  elanFunction,
  elanGenericParamT1Type,
  elanIntType,
  elanProcedure,
  ElanT1,
  FunctionOptions,
  ProcedureOptions,
} from "../../src/compiler/elan-type-annotations";
import { List } from "../../src/compiler/standard-library/list";
import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { StdLibSymbols } from "../../src/compiler/standard-library/std-lib-symbols";
import { VectorGraphic } from "../../src/compiler/standard-library/vector-graphic";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Profile } from "../../src/ide/frames/profile";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertCompiles,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

class TestStdLib {
  @elanClassExport(List)
  List = List;

  @elanClassExport(VectorGraphic)
  VectorGraphic = VectorGraphic;

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

  @elanFunction([], FunctionOptions.pureAsync, ElanClass(List, [ElanClass(VectorGraphic)]))
  async createVectorGraphics(): Promise<List<VectorGraphic>> {
    return await new List<VectorGraphic>()._initialise();
  }

  @elanProcedure(["list", "x", "y", "value"], ProcedureOptions.async)
  async initialise<T1>(
    @elanClassType(List, [ElanClass(List, [ElanT1])]) _listOfList: List<List<T1>>,
    @elanIntType() _x: number,
    @elanIntType() _y: number,
    @elanGenericParamT1Type() _value: T1,
  ) {}

  @elanProcedure(["list", "x", "y", "value"], ProcedureOptions.asyncExtension)
  async initialiseExt<T1>(
    @elanClassType(List, [ElanClass(List, [ElanT1])]) _listOfList: List<List<T1>>,
    @elanIntType() _x: number,
    @elanIntType() _y: number,
    @elanGenericParamT1Type() _value: T1,
  ) {}
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
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });

  test("Pass_Bug2576_1", async () => {
    const code = `${testHeader}

main
  variable x set to new List<of VectorGraphic>()
  set x to createVectorGraphics()
  call printNoLine(x)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });

  test("Pass_Bug2576_2", async () => {
    const code = `${testHeader}

main
  variable x set to new List<of List<of Int>>()
  variable y set to new List<of List<of String>>()
  call initialise(x, 2, 2, 2)
  call initialise(y, 2, 2, "")
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });

  ignore_test("Pass_Bug2576_3", async () => {
    const code = `${testHeader}

main
  variable x set to new List<of List<of Int>>()
  variable y set to new List<of List<of String>>()
  call x.initialiseExt(2, 2, 2)
  call y.initialiseExt(2, 2, "")
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });
});
