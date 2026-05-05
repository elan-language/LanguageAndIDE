import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Profile } from "../../src/ide/frames/profile";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertExportedCSIs,
  assertExportedJavaIs,
  assertExportedPythonIs,
  assertExportedVBis,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
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

suite("This and Property", () => {
  test("Pass_DisambiguateParamAndProperty", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo(7)
  call printNoLine(x.p1)
end main

class Foo
  constructor(p1 as Float)
    set this.p1 to p1
  end constructor

  property p1 as Float

  function toString() returns String
    return ""
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7));
  await _stdlib.printNoLine(x.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise(p1) {
    this.p1 = p1;
    return this;
  }

  p1 = 0;

  async toString() {
    return "";
  }

}
return [main, _tests];}`;

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
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_UsingThisAsAnInstance", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call printNoLine(f.bar())
end main

function doubled(f as Foo) returns Float
    return 2 * f.p1
end function

class Foo
    constructor()
        set this.p1 to 3
    end constructor

    property p1 as Float

    function bar() returns Float
        return doubled(this)
    end function

    function toString() returns String
        return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine((await f.bar()));
}

async function doubled(f) {
  return 2 * f.p1;
}
global["doubled"] = doubled;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 3;
    return this;
  }

  p1 = 0;

  async bar() {
    return (await global.doubled(this));
  }

  async toString() {
    return "";
  }

}
return [main, _tests];}`;

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
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Pass_UsingPropertyAsIndex", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call printNoLine(f.bar())
end main

class Foo
  constructor()
    set this.p1 to 1
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as Int

  function bar() returns Int
    variable lst set to [1, 2]
    return lst[this.p1]
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine((await f.bar()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 1;
    return this;
  }

  async toString() {
    return "";
  }

  p1 = 0;

  async bar() {
    let lst = system.list([1, 2]);
    return system.safeIndex(lst, this.p1);
  }

}
return [main, _tests];}`;

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
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_PrintThis", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call f.bar()
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return "a Foo"
  end function
  procedure bar()
    call printNoLine(this)
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.bar();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "a Foo";
  }

  async bar() {
    await _stdlib.printNoLine(this);
  }

}
return [main, _tests];}`;

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
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  test("Fail_UsingPropertyAsIndex1", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call printNoLine(f.bar())
end main

class Foo
  constructor()
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as Int

  function bar() returns Int
    variable lst set to [1, 2]
    call lst.setAt(p1, 3)
    return lst[0]
  end function
end class`;

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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_NoSuchProperty", async () => {
    const code = `${testHeader}

main
    variable x set to new Foo(7)
    call printNoLine(x.p1)
end main

class Foo
    constructor(p1 as Float)
        set this.p to p1
    end constructor
  function toString() returns String
    return ""
  end function

    property p1 as Float

    function toString() returns String
        return ""
    end function

end class`;

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
    assertDoesNotCompile(fileImpl, ["'p' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_MissingSelfCausesCompileErrorDueToAssigningToParam", async () => {
    const code = `${testHeader}

main
    variable x set to new Foo(7)
    call printNoLine(x.p1)
end main

class Foo
    constructor(p1 as Float)
        set p1 to p1
    end constructor
  function toString() returns String
    return ""
  end function

    property p1 as Float

    function toString() returns String
        return ""
    end function

end class`;

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
    assertDoesNotCompile(fileImpl, [
      "May not mutate a parameter within a function or constructor.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ThisOutsideClassScope", async () => {
    const code = `${testHeader}

main
  call printNoLine(this)
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
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot use 'this' outside class context.LangRef.html#ThisCompileError",
    ]);
  });
  test("Pass_ConcreteClassAndMembersInLangs", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  call printNoLine(x.p1)
end main
  
class Foo
  constructor()
    set this.p1 to 0.1
  end constructor

  property p1 as Float

  private property p2 as Float

  procedure proc1()

  end procedure

  private procedure proc2(a as String)

  end procedure

  private function f1(a as Int) returns Int
    return a
  end function

  function toString() returns String
    return ""
  end function

end class`;

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
    const pythonCode = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
  printNoLine(x.p1) # call procedure

class Foo

  def __init__(self: Foo) -> None:
    self.p1 = 0.1 # change variable
  p1: float # property
  p2: float # private property
  def proc1(self: Foo) -> None: # procedure

  def proc2(self: Foo, a: str) -> None: # private procedure

  def f1(self: Foo, a: int) -> int: # private function
    return a
  def toString(self: Foo) -> str: # function
    return ""


main()
`;
    const vbCode = `${testVBHeader}

Sub main()
  Dim x = New Foo() ' variable definition
  printNoLine(x.p1) ' call procedure
End Sub

Class Foo

  Sub New()
    Me.p1 = 0.1 ' change variable
  End Sub
  Property p1 As Double
  Private Property p2 As Double
  Sub proc1() ' procedure

  End Sub
  Private Sub proc2(a As String) ' private procedure

  End Sub
  Private Function f1(a As Integer) As Integer
    Return a
  End Function
  Function toString() As String
    Return ""
  End Function
End Class
`;

    const csCode = `${testCSHeader}

static void main() {
  var x = new Foo();
  printNoLine(x.p1); // call procedure
}

class Foo {

  public Foo() {
    this.p1 = 0.1; // change variable
  }
  public double p1 {get; private set;} // property
  private double p2 {get; private set;} // private property
  public void proc1() { // procedure

  }
  private void proc2(string a) { // private procedure

  }
  private int f1(int a) { // private function
    return a;
  }
  public string toString() { // function
    return "";
  }
}
`;

    const javaCode = `${testJavaHeader}

static void main() {
  var x = new Foo();
  printNoLine(x.p1); // call procedure
}

class Foo {

  public Foo() {
    this.p1 = 0.1; // change variable
  }
  public double p1; // property
  private double p2; // private property
  public void proc1() { // procedure

  }
  private void proc2(String a) { // private procedure

  }
  private int f1(int a) { // private function
    return a;
  }
  public String toString() { // function
    return "";
  }
}
`;

    await assertExportedPythonIs(fileImpl, pythonCode);
    await assertExportedVBis(fileImpl, vbCode);
    await assertExportedCSIs(fileImpl, csCode);
    await assertExportedJavaIs(fileImpl, javaCode);
  });
});
