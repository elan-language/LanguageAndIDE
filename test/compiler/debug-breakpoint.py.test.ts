import { DebugSymbol } from "../../src/compiler/compiler-interfaces/debug-symbol";
import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../../src/ide/frames/code-source-from-string";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { asDebugSymbol, assertDebugBreakPoint } from "../testHelpers";
import { ignore_test, testHash, testPythonHeader, transforms } from "./compiler-test-helpers";

suite("Python DebugBreakpoint", () => {
  test("Pass_Main", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo, out a as Int) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return "undefined"
  # end function method

# end class

a = 1 # constant

def main() -> None:

# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [] as DebugSymbol[];

    await assertDebugBreakPoint(fileImpl, "elan_main4", expected);
  });

  test("Pass_LocalvariablesMain", async () => {
    const code = `${testPythonHeader}

a = 1 # constant

def main() -> None:
  a = 1 # variable definition
  b = [1, 2] # variable definition
  c = "fred" # variable definition
  a = 2 # assignment
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set12", expected);
  });

  test("Pass_LocalvariablesProcedure", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = 1 # variable definition
  b = [1, 2] # variable definition
  c = "fred" # variable definition
  a = 2 # assignment
# end main

def main() -> None:
  pp(3) # procedure call
# end main

def pp(e: int) -> None: # procedure
  a = 1 # variable definition
  b = [1, 2] # variable definition
  c = "fred" # variable definition
  a = 2 # assignment
# end procedure

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
      asDebugSymbol("e", 3, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set19", expected);
  });

  test("Pass_LocalvariablesFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  pp(3) # procedure call
# end main

def main() -> None:
  a = ff(3) # variable definition
# end main

def ff(e: int) -> int: # function
  a = 1 # variable definition
  b = [1, 2] # variable definition
  c = "fred" # variable definition
  a = 2 # assignment
  return a
# end function

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
      asDebugSymbol("e", 3, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set22", expected);
  });

  test("Pass_LocalvariablesMemberProcedure", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ff(3) # variable definition
# end main

def main() -> None:
  f = Foo() # variable definition
  f.pp(3) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  f: int # property

  def pp(self: Foo, e: int) -> None: # procedure method
    a = 1 # variable definition
    b = [1, 2] # variable definition
    c = "fred" # variable definition
    a = 2 # assignment
  # end procedure method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
      asDebugSymbol("e", 3, '{"Type":"Int"}'),
      asDebugSymbol("this.f", 0, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set39", expected);
  });

  test("Pass_LocalvariablesMemberFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  f.pp(3) # procedure call
# end main

def main() -> None:
  f = Foo() # variable definition
  a = f.ff(3) # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  f: int # property

  def ff(self: Foo, e: int) -> int: # function method
    a = 1 # variable definition
    b = [1, 2] # variable definition
    c = "fred" # variable definition
    a = 2 # assignment
    return a
  # end function method

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
      asDebugSymbol("e", 3, '{"Type":"Int"}'),
      asDebugSymbol("this.f", 0, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set42", expected);
  });

  test("Pass_LocalvariablesConstructor", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo() # variable definition
  a = f.ff(3) # variable definition
# end main

def main() -> None:
  f = Foo(3) # variable definition
# end main

class Foo: # concrete class

  def __init__(self: Foo, e: int) -> None:
    a = 1 # variable definition
    b = [1, 2] # variable definition
    c = "fred" # variable definition
    a = 2 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  f: int # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
      asDebugSymbol("e", 3, '{"Type":"Int"}'),
      asDebugSymbol("this.f", 0, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set29", expected);
  });

  test("Pass_InForLoop", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  f = Foo(3) # variable definition
# end main

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("i", 1, '{"Type":"Int"}'),
      asDebugSymbol("tot", 0, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set10", expected);
  });

  test("Pass_InEachLoop", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  tot = 0 # variable definition
  for i in range(1, 11):
    tot = tot + i # assignment
  # end for
  printNoLine(tot) # procedure call
# end main

def main() -> None:
  a = [7, 8, 9] # variable definition
  n = 0 # variable definition
  for x in a:
    z = 101 # variable definition
    n = n + x # assignment
  # end for
  printNoLine(n) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", [7, 8, 9], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("n", 0, '{"Type":"Int"}'),
      asDebugSymbol("x", 7, '{"Type":"Int"}'),
      asDebugSymbol("z", 101, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set16", expected);
  });

  test("Pass_InWhileLoop", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [7, 8, 9] # variable definition
  n = 0 # variable definition
  for x in a:
    z = 101 # variable definition
    n = n + x # assignment
  # end for
  printNoLine(n) # procedure call
# end main

def main() -> None:
  t = 0 # variable definition
  x = 0 # variable definition
  while x < 3:
    y = 0 # variable definition
    while y < 4:
      y = y + 1 # assignment
      t = t + 1 # assignment
    # end while
    x = x + 1 # assignment
  # end while
  printNoLine(t) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("t", 0, '{"Type":"Int"}'),
      asDebugSymbol("x", 0, '{"Type":"Int"}'),
      asDebugSymbol("y", 1, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set21", expected);
  });

  ignore_test("Pass_InTry", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = 0 # variable definition
  x = 0 # variable definition
  while x < 3:
    y = 0 # variable definition
    while y < 4:
      y = y + 1 # assignment
      t = t + 1 # assignment
    # end while
    x = x + 1 # assignment
  # end while
  printNoLine(t) # procedure call
# end main

def main() -> None:
  try:
    a = 1 # variable definition
    a = 2 # assignment
    raise ElanRuntimeError("error")
  except CustomError as ElanRuntimeError: # catch
  # end try
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("a", 1, '{"Type":"Int"}')];

    await assertDebugBreakPoint(fileImpl, "elan_set12", expected);
  });

  ignore_test("Pass_InCatch", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  try:
    a = 1 # variable definition
    a = 2 # assignment
    raise ElanRuntimeError("error")
  except CustomError as ElanRuntimeError: # catch
  # end try
# end main

def main() -> None:
  try:
    a = 1 # variable definition
    a = 2 # assignment
    raise ElanRuntimeError("error")
  except CustomError as ElanRuntimeError: # catch
  # end try
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("b", 1, '{"Type":"Int"}'),
      asDebugSymbol("e", "error", '{"Type":"String"}'),
    ];
    await assertDebugBreakPoint(fileImpl, "call21", expected);
  });

  test("Pass_InIf", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  try:
    a = 1 # variable definition
    a = 2 # assignment
    raise ElanRuntimeError("error")
  except CustomError as ElanRuntimeError: # catch
  # end try
# end main

def main() -> None:
  a = True # variable definition
  if a:
    b = 1 # variable definition
    b = 2 # assignment
  else:
    c = 1 # variable definition
    c = 2 # assignment
  # end if
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", true, '{"Type":"Boolean"}'),
      asDebugSymbol("b", 1, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set12", expected);
  });

  test("Pass_InElse", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = True # variable definition
  if a:
    b = 1 # variable definition
    b = 2 # assignment
  else:
    c = 1 # variable definition
    c = 2 # assignment
  # end if
# end main

def main() -> None:
  a = False # variable definition
  if a:
    b = 1 # variable definition
    b = 2 # assignment
  else:
    c = 1 # variable definition
    c = 2 # assignment
  # end if
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", false, '{"Type":"Boolean"}'),
      asDebugSymbol("c", 1, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set19", expected);
  });

  test("Pass_InElseIf", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = False # variable definition
  if a:
    b = 1 # variable definition
    b = 2 # assignment
  else:
    c = 1 # variable definition
    c = 2 # assignment
  # end if
# end main

def main() -> None:
  a = False # variable definition
  if a:
    b = 1 # variable definition
    b = 2 # assignment
  elif a == False: # else if
    c = 1 # variable definition
    c = 2 # assignment
  # end if
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", false, '{"Type":"Boolean"}'),
      asDebugSymbol("c", 1, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_set20", expected);
  });

  test("Pass_AsyncBreakPoints", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = False # variable definition
  if a:
    b = 1 # variable definition
    b = 2 # assignment
  elif a == False: # else if
    c = 1 # variable definition
    c = 2 # assignment
  # end if
# end main

def main() -> None:
  a = [ff(1), ff(2)] # variable definition
  printNoLine(a) # procedure call
# end main

def ff(a: int) -> int: # function
  return a
# end function

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("a", 1, '{"Type":"Int"}')];

    await assertDebugBreakPoint(fileImpl, "elan_return14", expected);
  });

  test("Pass_ClassTypeInfo", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = [ff(1), ff(2)] # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  x = Foo() # variable definition
  printNoLine(x) # procedure call
# end main

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  barA: str # property

  def toString(self: Bar) -> str: # function method
    return "undefined"
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.a = 1 # assignment
    self.b = Bar() # assignment
    self.c = [1, 2] # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  a: int # property

  b: Bar # property

  c: list[int] # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol(
        "x",
        { a: 1, c: [1, 2], b: { barA: "" } },
        '{"Type":"Foo","Properties":{"a":{"Type":"Int"},"b":{"Type":"Bar","Properties":{"barA":{"Type":"String"}}},"c":{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}}}',
      ),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_call6", expected);
  });

  test("Pass_Enum", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = Foo() # variable definition
  printNoLine(x) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.a = 1 # assignment
    self.b = Bar() # assignment
    self.c = [1, 2] # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  a: int # property

  b: Bar # property

  c: list[int] # property

# end class

def main() -> None:
  x = Fruit.apple # variable definition
  printNoLine(x) # procedure call
# end main

class Fruit(Enum):
  apple = 1
  pear = 2

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("x", "apple", '{"Type":"Enum","OfTypes":{"Type":"Fruit"}}')];

    await assertDebugBreakPoint(fileImpl, "elan_call6", expected);
  });

  test("Pass_Tuple", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.a = 1 # assignment
    self.b = Bar() # assignment
    self.c = [1, 2] # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  a: int # property

  b: Bar # property

  c: list[int] # property

# end class

class Fruit(Enum):
  apple = 1
  pear = 2

def main() -> None:
  x = (1, "fred") # variable definition
  printNoLine(x) # procedure call
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol(
        "x",
        [1, "fred"],
        '{"Type":"(Int, String)","OfTypes":[{"Type":"Int"},{"Type":"String"}]}',
      ),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_call6", expected);
  });

  test("Pass_FunctionProperty", async () => {
    const code = `${testPythonHeader}

class Fruit(Enum):
  apple = 1
  pear = 2

def foo(f: Foo) -> int: # function
  return 1
# end function

class Foo: # concrete class

  def __init__(self: Foo, f: Callable[[Foo]int]) -> None:
    self.ff = f # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  ff: Callable[[Foo]int] # property

  def df(self: Foo) -> int: # function method
    return ff(self)
  # end function method

# end class

def main() -> None:
  a = Foo(foo) # variable definition
  b = a.df() # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol(
        "f",
        { ff: [] },
        '{"Type":"Foo","Properties":{"ff":{"Type":"Func<of Foo => Int>"}}}',
      ),
    ];

    await assertDebugBreakPoint(fileImpl, "elan_return6", expected);
  });
});
