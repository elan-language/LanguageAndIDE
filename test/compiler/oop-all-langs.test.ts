import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Profile } from "../../src/ide/frames/profile";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertExportedCSIs,
  assertExportedJavaIs,
  assertExportedPythonIs,
  assertExportedVBis,
  assertObjectCodeExecutes,
  assertParses,
  assertStatusIsValid,
  testCSHeader,
  testHash,
  testHeader,
  testJavaHeader,
  testPythonHeader,
  testVBHeader,
  transforms,
} from "./compiler-test-helpers";

suite("OOP all languages", () => {
  test("Pass_DefineAbstractClassAndInheritFromIt", async () => {
    const code = `${testHeader}

abstract class Foo
  abstract function method_Foo() returns Int

end class

abstract class Foo1 inherits Foo
  property prop_Foo1 as String

end class

interface I1
  abstract function method_I1() returns Int

end interface

interface I2
  abstract function method_I2() returns Int

end interface

interface I3 inherits I2
  abstract property prop_I3 as Int

end interface

class Yon inherits I3, Foo1, I2
  constructor()
    set this.prop_Foo1 to ""
  end constructor

  property prop_I3 as Int

  function method_Foo() returns Int
    return 0
  end function

  function method_I1() returns Int
    return 0
  end function

  function method_I2() returns Int
    return 0
  end function

  function toString() returns String
    return this.prop_Foo1
  end function

end class`;

    //const objectCode = ``;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    //assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
    const pythonCode = `${testPythonHeader}

class Foo(ABC)

  @abstractmethod
def method_Foo() -> int:
  pass # abstract function


class Foo1(ABC, Foo)

  prop_Foo1: str # property


class I1(ABC)

  @abstractmethod
def method_I1() -> int:
  pass # abstract function


class I2(ABC)

  @abstractmethod
def method_I2() -> int:
  pass # abstract function


class I3(ABC, I2)

  @property
@abstractmethod
def prop_I3(self: I3) -> int:
  pass # abstract property


class Yon(I3, Foo1, I2)

  def __init__(self: Yon) -> None:
    self.prop_Foo1 = "" # set
  prop_I3: int # property
  def method_Foo(self: Yon) -> int: # function
    return 0
  def method_I1(self: Yon) -> int: # function
    return 0
  def method_I2(self: Yon) -> int: # function
    return 0
  def toString(self: Yon) -> str: # function
    return self.prop_Foo1


main()
`;

    const vbCode = `${testVBHeader}

MustInherit Class Foo

  MustOverride Function method_Foo() As Integer
End Class

MustInherit Class Foo1
  Inherits Foo
  

  Property prop_Foo1 As String
End Class

Interface I1

  MustOverride Function method_I1() As Integer
End Interface

Interface I2

  MustOverride Function method_I2() As Integer
End Interface

Interface I3
  Inherits I2
  

  MustOverride Property prop_I3 As Integer
End Interface

Class Yon
  Inherits Foo1
  Implements I3, I2
  

  Sub New()
    Me.prop_Foo1 = "" ' set
  End Sub
  Property prop_I3 As Integer
  Overrides Function method_Foo() As Integer
    Return 0
  End Function
  Function method_I1() As Integer
    Return 0
  End Function
  Function method_I2() As Integer Implements I2.method_I2
    Return 0
  End Function
  Function toString() As String
    Return Me.prop_Foo1
  End Function
End Class
`;

    const csCode = `${testCSHeader}

abstract class Foo {

  abstract int method_Foo(); // abstract function
}

abstract class Foo1: Foo {

  public string prop_Foo1 {get; private set;} // property
}

interface I1 {

  abstract int method_I1(); // abstract function
}

interface I2 {

  abstract int method_I2(); // abstract function
}

interface I3: I2 {

  abstract int prop_I3 {get; private set;} // abstract property
}

class Yon: I3, Foo1, I2 {

  public Yon() {
    this.prop_Foo1 = ""; // set
  }
  public int prop_I3 {get; private set;} // property
  public override int method_Foo() { // function
    return 0;
  }
  public int method_I1() { // function
    return 0;
  }
  public int method_I2() { // function
    return 0;
  }
  public string toString() { // function
    return this.prop_Foo1;
  }
}
`;

    const javaCode = `${testJavaHeader}

abstract class Foo {

  abstract int method_Foo(); // abstract function
}

abstract class Foo1 extends Foo {

  public String prop_Foo1; // property
}

interface I1 {

  abstract int method_I1(); // abstract function
}

interface I2 {

  abstract int method_I2(); // abstract function
}

interface I3 extends I2 {

  abstract int prop_I3; // abstract property
}

class Yon extends Foo1 implements I3, I2  {

  public Yon() {
    this.prop_Foo1 = ""; // set
  }
  public int prop_I3; // property
  public  int method_Foo() { // function
    return 0;
  }
  public int method_I1() { // function
    return 0;
  }
  public int method_I2() { // function
    return 0;
  }
  public String toString() { // function
    return this.prop_Foo1;
  }
}
`;

    await assertExportedPythonIs(fileImpl, pythonCode);
    await assertExportedVBis(fileImpl, vbCode);
    await assertExportedCSIs(fileImpl, csCode);
    await assertExportedJavaIs(fileImpl, javaCode);
  });
});
