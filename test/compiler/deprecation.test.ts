import {
  ClassOption,
  elanClass,
  elanClassExport,
  elanDeprecated,
  elanFunction,
  elanProcedure,
} from "../../src/elan-type-annotations";
import { Deprecation } from "../../src/elan-type-interfaces";
import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import { List } from "../../src/standard-library/list";
import { StdLibSymbols } from "../../src/standard-library/std-lib-symbols";
import {
  assertCompiles,
  assertDoesNotCompile,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

@elanClass(ClassOption.concrete)
export class DeprecatedClass {
  async _initialise() {
    return this;
  }

  static emptyInstance() {
    return new DeprecatedClass();
  }
}

class TestStdLib {
  @elanDeprecated(Deprecation.methodRemoved, 0, 0, "LibRef.html#Xxxx")
  @elanFunction([])
  deprecatedFunction(): number {
    return 0;
  }

  @elanDeprecated(Deprecation.methodRemoved, 0, 0, "LibRef.html#Xxxx")
  @elanProcedure([])
  deprecatedProcedure() {}

  @elanDeprecated(Deprecation.methodRemoved, 2, 0, "LibRef.html#Xxxx")
  @elanFunction([])
  notYetDeprecated1(): number {
    return 0;
  }

  @elanDeprecated(Deprecation.methodRemoved, 1, 20, "LibRef.html#Xxxx")
  @elanFunction([])
  notYetDeprecated2(): number {
    return 0;
  }

  @elanDeprecated(Deprecation.classRemoved, 0, 0, "LibRef.html#Xxxx")
  @elanClassExport(DeprecatedClass)
  DeprecatedClass = DeprecatedClass;

  @elanClassExport(List)
  List = List;

  @elanDeprecated(Deprecation.parametersChanged, 0, 0, "LibRef.html#Xxxx")
  @elanFunction([])
  deprecatedFunctionWithParameters1(): number {
    return 0;
  }

  @elanDeprecated(Deprecation.parametersChanged, 0, 0, "LibRef.html#Xxxx")
  @elanFunction(["s"])
  deprecatedFunctionWithParameters2(s: string): number {
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

  test("Pass_ParametersChangedWithoutCompileErrors", async () => {
    const code = `${testHeader}

main
  variable x set to deprecatedFunctionWithParameters1()
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
  variable x set to deprecatedFunction()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [`Deprecated since 0.0LibRef.html#Xxxx`]);
  });

  test("Fail_ProcedureDeprecation", async () => {
    const code = `${testHeader}

main
  call deprecatedProcedure()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [`Deprecated since 0.0LibRef.html#Xxxx`]);
  });

  test("Fail_NewClassDeprecation", async () => {
    const code = `${testHeader}

main
  let a be new DeprecatedClass()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [`Deprecated since 0.0LibRef.html#Xxxx`]);
  });

  test("Fail_EmptyClassDeprecation", async () => {
    const code = `${testHeader}

main
  let a be empty DeprecatedClass
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [`Deprecated since 0.0LibRef.html#Xxxx`]);
  });

  test("Fail_OfClassDeprecation", async () => {
    const code = `${testHeader}

main
  let a be new List<of DeprecatedClass>()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [`Deprecated since 0.0LibRef.html#Xxxx`]);
  });

  test("Fail_ParametersChangedWithCompileErrors", async () => {
    const code = `${testHeader}

main
  variable x set to deprecatedFunctionWithParameters1("fred")
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: none",
      `Deprecated since 0.0LibRef.html#Xxxx`,
    ]);
  });
});
