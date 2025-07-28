import { List } from "../../src/compiler/standard-library/list";
import { StdLibSymbols } from "../../src/compiler/standard-library/std-lib-symbols";
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

@elanClass(ClassOption.concrete)
export class DeprecatedClass1 {
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

  @elanDeprecated(Deprecation.methodHidden, 0, 0, "LibRef.html#Xxxx")
  @elanProcedure([])
  hiddenDeprecatedProcedure() {}

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

  @elanDeprecated(Deprecation.classParametersChanged, 0, 0, "LibRef.html#Xxxx")
  @elanClassExport(DeprecatedClass1)
  DeprecatedClass1 = DeprecatedClass1;

  @elanClassExport(List)
  List = List;

  @elanDeprecated(Deprecation.methodParametersChanged, 0, 0, "LibRef.html#Xxxx")
  @elanFunction([])
  deprecatedFunctionWithParameters1(): number {
    return 0;
  }

  @elanDeprecated(Deprecation.methodParametersChanged, 0, 0, "LibRef.html#Xxxx")
  @elanFunction(["s"])
  deprecatedFunctionWithParameters2(s: string): number {
    return 0;
  }

  @elanDeprecated(Deprecation.methodParametersChanged, 0, 0, "LibRef.html#Xxxx")
  @elanProcedure([])
  deprecatedProcedureWithParameters1() {}

  @elanDeprecated(Deprecation.methodParametersChanged, 0, 0, "LibRef.html#Xxxx")
  @elanProcedure(["s"])
  deprecatedProcedureWithParameters2(s: string) {}
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

  test("Pass_hiddenDeprecated", async () => {
    const code = `${testHeader}

main
  call hiddenDeprecatedProcedure()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });

  test("Pass_ParametersChangedWithoutCompileErrors1", async () => {
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

  test("Pass_ParametersChangedWithoutCompileErrors2", async () => {
    const code = `${testHeader}

main
  variable x set to deprecatedFunctionWithParameters2("fred")
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });

  test("Pass_ParametersChangedWithoutCompileErrors3", async () => {
    const code = `${testHeader}

main
  call deprecatedProcedureWithParameters1()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });

  test("Pass_ParametersChangedWithoutCompileErrors4", async () => {
    const code = `${testHeader}

main
  call deprecatedProcedureWithParameters2("fred")
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertCompiles(fileImpl);
  });

  test("Pass_ParametersChangedWithoutCompileErrorsOnClass", async () => {
    const code = `${testHeader}

main
  variable x set to new DeprecatedClass1()
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
    assertDoesNotCompile(fileImpl, [
      `Code change required. Method was removed in v0.0.LibRef.html#Xxxx`,
    ]);
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
    assertDoesNotCompile(fileImpl, [
      `Code change required. Method was removed in v0.0.LibRef.html#Xxxx`,
    ]);
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
    assertDoesNotCompile(fileImpl, [
      `Code change required. Class was removed in v0.0.LibRef.html#Xxxx`,
    ]);
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
    assertDoesNotCompile(fileImpl, [
      `Code change required. Class was removed in v0.0.LibRef.html#Xxxx`,
    ]);
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
    assertDoesNotCompile(fileImpl, [
      `Code change required. Class was removed in v0.0.LibRef.html#Xxxx`,
    ]);
  });

  test("Fail_ParametersChangedWithCompileErrors1", async () => {
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
      "Too many argument(s). Expected: none.LangRef.html#compile_error",
      `Code change required. Parameters for method were changed in v0.0.LibRef.html#Xxxx`,
    ]);
  });

  test("Fail_ParametersChangedWithCompileErrors2", async () => {
    const code = `${testHeader}

main
  variable x set to deprecatedFunctionWithParameters2()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: s (String).LangRef.html#compile_error",
      `Code change required. Parameters for method were changed in v0.0.LibRef.html#Xxxx`,
    ]);
  });

  test("Fail_ParametersChangedWithCompileErrors3", async () => {
    const code = `${testHeader}

main
  call deprecatedProcedureWithParameters1("fred")
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Too many argument(s). Expected: none.LangRef.html#compile_error",
      `Code change required. Parameters for method were changed in v0.0.LibRef.html#Xxxx`,
    ]);
  });

  test("Fail_ParametersChangedWithCompileErrors4", async () => {
    const code = `${testHeader}

main
  call deprecatedProcedureWithParameters2()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Missing argument(s). Expected: s (String).LangRef.html#compile_error",
      `Code change required. Parameters for method were changed in v0.0.LibRef.html#Xxxx`,
    ]);
  });

  test("Fail_ParametersChangedWithCompileErrorsOnClass", async () => {
    const code = `${testHeader}

main
  variable x set to new DeprecatedClass1<of Int>()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    fileImpl.setSymbols(new StdLibSymbols(new TestStdLib()));

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "<of Type> was not expected here.LangRef.html#GenericParametersCompileError",
      `Code change required. Parameters for class were changed in v0.0.LibRef.html#Xxxx`,
    ]);
  });
});
