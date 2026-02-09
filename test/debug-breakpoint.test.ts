import { DebugSymbol } from "../src/compiler/compiler-interfaces/debug-symbol";
import { StdLib } from "../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../src/ide/frames/code-source-from-string";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { FileImpl } from "../src/ide/frames/file-impl";
import { StubInputOutput } from "../src/ide/stub-input-output";
import { testHash, testHeader, transforms } from "./compiler/compiler-test-helpers";
import { asDebugSymbol, assertDebugBreakPoint } from "./testHelpers";

suite("DebugBreakpoint", () => {
  test("Pass_Main", async () => {
    const code = `${testHeader}

constant a set to 1

main

end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [] as DebugSymbol[];

    await assertDebugBreakPoint(fileImpl, "main4", expected);
  });

  test("Pass_LocalvariablesMain", async () => {
    const code = `${testHeader}

main
  variable a set to 1
  variable b set to [1, 2]
  variable c set to "fred"
  variable d set to {1:2}
  set a to 2
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
      asDebugSymbol(
        "d",
        { 1: 2 },
        '{"Type":"DictionaryImmutable<of Int, Int>","KeyType":{"Type":"Int"},"ValueType":{"Type":"Int"}}',
      ),
    ];

    await assertDebugBreakPoint(fileImpl, "set15", expected);
  });

  test("Pass_LocalvariablesProcedure", async () => {
    const code = `${testHeader}

main
  call pp(3)
end main

procedure pp(e as Int)
  variable a set to 1
  variable b set to [1, 2]
  variable c set to "fred"
  variable d set to {1:2}
  set a to 2
end procedure`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
      asDebugSymbol(
        "d",
        { 1: 2 },
        '{"Type":"DictionaryImmutable<of Int, Int>","KeyType":{"Type":"Int"},"ValueType":{"Type":"Int"}}',
      ),
      asDebugSymbol("e", 3, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "set22", expected);
  });

  test("Pass_LocalvariablesFunction", async () => {
    const code = `${testHeader}

main
  variable a set to ff(3)
end main

function ff(e as Int) returns Int
  variable a set to 1
  variable b set to [1, 2]
  variable c set to "fred"
  variable d set to {1:2}
  set a to 2
  return a
end function`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
      asDebugSymbol(
        "d",
        { 1: 2 },
        '{"Type":"DictionaryImmutable<of Int, Int>","KeyType":{"Type":"Int"},"ValueType":{"Type":"Int"}}',
      ),
      asDebugSymbol("e", 3, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "set25", expected);
  });

  test("Pass_LocalvariablesMemberProcedure", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call f.pp(3)
end main

class Foo

  property f as Int

  procedure pp(e as Int)
    variable a set to 1
    variable b set to [1, 2]
    variable c set to "fred"
    variable d set to {1:2}
    set a to 2
  end procedure
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
      asDebugSymbol(
        "d",
        { 1: 2 },
        '{"Type":"DictionaryImmutable<of Int, Int>","KeyType":{"Type":"Int"},"ValueType":{"Type":"Int"}}',
      ),
      asDebugSymbol("e", 3, '{"Type":"Int"}'),
      asDebugSymbol("property.f", 0, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "set32", expected);
  });

  test("Pass_LocalvariablesMemberFunction", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable a set to f.ff(3)
end main

class Foo

  property f as Int

  function ff(e as Int) returns Int
    variable a set to 1
    variable b set to [1, 2]
    variable c set to "fred"
    variable d set to {1:2}
    set a to 2
    return a
  end function
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
      asDebugSymbol(
        "d",
        { 1: 2 },
        '{"Type":"DictionaryImmutable<of Int, Int>","KeyType":{"Type":"Int"},"ValueType":{"Type":"Int"}}',
      ),
      asDebugSymbol("e", 3, '{"Type":"Int"}'),
      asDebugSymbol("property.f", 0, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "set35", expected);
  });

  test("Pass_LocalvariablesConstructor", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo(3)
end main

class Foo

  constructor(e as Int)
    variable a set to 1
    variable b set to [1, 2]
    variable c set to "fred"
    variable d set to {1:2}
    set a to 2
  end constructor

  property f as Int

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", 1, '{"Type":"Int"}'),
      asDebugSymbol("b", [1, 2], '{"Type":"List<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("c", "fred", '{"Type":"String"}'),
      asDebugSymbol(
        "d",
        { 1: 2 },
        '{"Type":"DictionaryImmutable<of Int, Int>","KeyType":{"Type":"Int"},"ValueType":{"Type":"Int"}}',
      ),
      asDebugSymbol("e", 3, '{"Type":"Int"}'),
      asDebugSymbol("property.f", 0, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "set25", expected);
  });

  test("Pass_InForLoop", async () => {
    const code = `${testHeader}

main
  variable tot set to 0
  for i from 1 to 10 step 1
    set tot to tot + i
  end for
  call printNoLine(tot)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("i", 1, '{"Type":"Int"}'),
      asDebugSymbol("tot", 0, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "set12", expected);
  });

  test("Pass_InEachLoop", async () => {
    const code = `${testHeader}

main
  variable a set to {7,8,9}
  variable n set to 0
  each x in a
    variable z set to 101
    set n to n + x
  end each
  call printNoLine(n)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", [7, 8, 9], '{"Type":"ListImmutable<of Int>","OfTypes":{"Type":"Int"}}'),
      asDebugSymbol("n", 0, '{"Type":"Int"}'),
      asDebugSymbol("x", 7, '{"Type":"Int"}'),
      asDebugSymbol("z", 101, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "set16", expected);
  });

  test("Pass_InWhileLoop", async () => {
    const code = `${testHeader}

main
  variable t set to 0
  variable x set to 0
  while x < 3
    variable y set to 0
      while y < 4
        set y to y + 1
        set t to t + 1
      end while
      set x to x + 1
  end while
  call printNoLine(t)
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("t", 0, '{"Type":"Int"}'),
      asDebugSymbol("x", 0, '{"Type":"Int"}'),
      asDebugSymbol("y", 1, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "set21", expected);
  });

  test("Pass_InTry", async () => {
    const code = `${testHeader}

main
  try
    variable a set to 1
    set a to 2
    throw exception "error"
  catch exception in e
    variable b set to e
    call printNoLine(b)
  end try
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("a", 1, '{"Type":"Int"}')];

    await assertDebugBreakPoint(fileImpl, "set11", expected);
  });

  test("Pass_InCatch", async () => {
    const code = `${testHeader}

main
  try
    variable a set to 1
    set a to 2
    throw exception "error"
  catch exception in e
    variable b set to e
    call printNoLine(b)
  end try
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("b", "error", '{"Type":"String"}'),
      asDebugSymbol("e", "error", '{"Type":"String"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "call19", expected);
  });

  test("Pass_InIf", async () => {
    const code = `${testHeader}

main
  variable a set to true
  if a then
    variable b set to 1
    set b to 2
  else
    variable c set to 1
    set c to 2
  end if
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", true, '{"Type":"Boolean"}'),
      asDebugSymbol("b", 1, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "set12", expected);
  });

  test("Pass_InElse", async () => {
    const code = `${testHeader}

main
  variable a set to false
  if a then
    variable b set to 1
    set b to 2
  else
    variable c set to 1
    set c to 2
  end if
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", false, '{"Type":"Boolean"}'),
      asDebugSymbol("c", 1, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "set19", expected);
  });

  test("Pass_InElseIf", async () => {
    const code = `${testHeader}

main
  variable a set to false
  if a then
    variable b set to 1
    set b to 2
  elif a is false then 
    variable c set to 1
    set c to 2
  end if
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("a", false, '{"Type":"Boolean"}'),
      asDebugSymbol("c", 1, '{"Type":"Int"}'),
    ];

    await assertDebugBreakPoint(fileImpl, "set20", expected);
  });

  test("Pass_AsyncBreakPoints", async () => {
    const code = `${testHeader}

main
  variable a set to [ff(1), ff(2)]
  call printNoLine(a)
end main

function ff(a as Int) returns Int
  return a
end function
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("a", 1, '{"Type":"Int"}')];

    await assertDebugBreakPoint(fileImpl, "return14", expected);
  });

  test("Pass_ClassTypeInfo", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  call printNoLine(x)
end main
  
class Bar
  property barA as String
end class

class Foo
  constructor()
    set property.a to 1
    set property.b to new Bar()
    set property.c to [1,2]
  end constructor

  property a as Int
  property b as Bar
  property c as List<of Int>
end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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

    await assertDebugBreakPoint(fileImpl, "call6", expected);
  });

  test("Pass_Enum", async () => {
    const code = `${testHeader}

main
  variable x set to Fruit.apple
  call printNoLine(x)
end main
  
enum Fruit apple, pear`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("x", "apple", '{"Type":"Enum","OfTypes":{"Type":"Fruit"}}')];

    await assertDebugBreakPoint(fileImpl, "call6", expected);
  });

  test("Pass_Tuple", async () => {
    const code = `${testHeader}

main
  variable x set to tuple(1, "fred")
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
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol(
        "x",
        [1, "fred"],
        '{"Type":"tuple(Int, String)","OfTypes":[{"Type":"Int"},{"Type":"String"}]}',
      ),
    ];

    await assertDebugBreakPoint(fileImpl, "call6", expected);
  });

  test("Pass_TupleDeconstruction", async () => {
    const code = `${testHeader}

main
  variable x, y set to a
  call printNoLine(x)
end main

constant a set to tuple(1, "fred")`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol(
        "x",
        1,
        '{"Type":"Deconstructed","Ids":{"x":{"Type":"Int"},"y":{"Type":"String"}}}',
      ),
      asDebugSymbol(
        "y",
        "fred",
        '{"Type":"Deconstructed","Ids":{"x":{"Type":"Int"},"y":{"Type":"String"}}}',
      ),
    ];

    await assertDebugBreakPoint(fileImpl, "call6", expected);
  });

  test("Pass_ListDeconstruction", async () => {
    const code = `${testHeader}

main
  variable x:y set to a
  call printNoLine(x)
end main

constant a set to {1, 2, 3}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol(
        "x",
        1,
        '{"Type":"Deconstructed","Ids":{"x":{"Type":"Int"},"y":{"Type":"ListImmutable<of Int>","OfTypes":{"Type":"Int"}}}}',
      ),
      asDebugSymbol(
        "y",
        [2, 3],
        '{"Type":"Deconstructed","Ids":{"x":{"Type":"Int"},"y":{"Type":"ListImmutable<of Int>","OfTypes":{"Type":"Int"}}}}',
      ),
    ];

    await assertDebugBreakPoint(fileImpl, "call6", expected);
  });

  test("Pass_RecordDeconstruction", async () => {
    const code = `${testHeader}

main
  variable x, y set to new Foo() with x set to 1, y set to "fred"
  call printNoLine(x)
end main

record Foo
  property x as Int
  property y as String
end record`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol(
        "x",
        1,
        '{"Type":"Deconstructed","Ids":{"x":{"Type":"Int"},"y":{"Type":"String"}}}',
      ),
      asDebugSymbol(
        "y",
        "fred",
        '{"Type":"Deconstructed","Ids":{"x":{"Type":"Int"},"y":{"Type":"String"}}}',
      ),
    ];

    await assertDebugBreakPoint(fileImpl, "call6", expected);
  });

  test("Pass_FunctionProperty", async () => {
    const code = `${testHeader}

function foo(f as Foo) returns Int
  return 1
end function

class Foo
  constructor(f as Func<of Foo => Int>)
    set property.ff to ref f
  end constructor

  property ff as Func<of Foo => Int>

  function df() returns Int
    return ff(this)
  end function

end class

main
  variable a set to new Foo(ref foo)
  variable b set to a.df()
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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

    await assertDebugBreakPoint(fileImpl, "return6", expected);
  });
});
