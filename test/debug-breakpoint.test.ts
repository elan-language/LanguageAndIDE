import { DefaultProfile } from "../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../src/frames/file-impl";
import { DebugSymbol } from "../src/web/web-worker-messages";
import { testHash, testHeader, transforms } from "./compiler/compiler-test-helpers";
import { asDebugSymbol, assertDebugBreakPoint } from "./testHelpers";

suite("DebugBreakpoint", () => {
  test("Pass_Main", async () => {
    const code = `${testHeader}

constant a set to 1

main

end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("Int", "a", 1),
      asDebugSymbol("List<of Int>", "b", [1, 2]),
      asDebugSymbol("String", "c", "fred"),
      asDebugSymbol("DictionaryImmutable<of Int, Int>", "d", "{1:2}"),
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("Int", "a", "1"),
      asDebugSymbol("List<of Int>", "b", "[1, 2]"),
      asDebugSymbol("String", "c", "fred"),
      asDebugSymbol("DictionaryImmutable<of Int, Int>", "d", "{1:2}"),
      asDebugSymbol("Int", "e", "3"),
    ];

    await assertDebugBreakPoint(fileImpl, "set22", expected);
  });

  test("Pass_LocalvariablesFunction", async () => {
    const code = `${testHeader}

main
  let a be ff(3)
end main

function ff(e as Int) returns Int
  variable a set to 1
  variable b set to [1, 2]
  variable c set to "fred"
  variable d set to {1:2}
  set a to 2
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("Int", "a", "1"),
      asDebugSymbol("List<of Int>", "b", "[1, 2]"),
      asDebugSymbol("String", "c", "fred"),
      asDebugSymbol("DictionaryImmutable<of Int, Int>", "d", "{1:2}"),
      asDebugSymbol("Int", "e", "3"),
    ];

    await assertDebugBreakPoint(fileImpl, "set25", expected);
  });

  test("Pass_LocalvariablesMemberProcedure", async () => {
    const code = `${testHeader}

main
  let f be new Foo()
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("Int", "a", "1"),
      asDebugSymbol("List<of Int>", "b", "[1, 2]"),
      asDebugSymbol("String", "c", "fred"),
      asDebugSymbol("DictionaryImmutable<of Int, Int>", "d", "{1:2}"),
      asDebugSymbol("Int", "e", "3"),
      asDebugSymbol("Int", "property.f", "0"),
    ];

    await assertDebugBreakPoint(fileImpl, "set32", expected);
  });

  test("Pass_LocalvariablesMemberFunction", async () => {
    const code = `${testHeader}

main
  let f be new Foo()
  let a be f.ff(3)
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("Int", "a", "1"),
      asDebugSymbol("List<of Int>", "b", "[1, 2]"),
      asDebugSymbol("String", "c", "fred"),
      asDebugSymbol("DictionaryImmutable<of Int, Int>", "d", "{1:2}"),
      asDebugSymbol("Int", "e", "3"),
      asDebugSymbol("Int", "property.f", "0"),
    ];

    await assertDebugBreakPoint(fileImpl, "set35", expected);
  });

  test("Pass_LocalvariablesConstructor", async () => {
    const code = `${testHeader}

main
  let f be new Foo(3)
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("Int", "a", "1"),
      asDebugSymbol("List<of Int>", "b", "[1, 2]"),
      asDebugSymbol("String", "c", "fred"),
      asDebugSymbol("DictionaryImmutable<of Int, Int>", "d", "{1:2}"),
      asDebugSymbol("Int", "e", "3"),
      asDebugSymbol("Int", "property.f", "0"),
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
  print tot
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("Int", "i", "1"), asDebugSymbol("Int", "tot", "0")];

    await assertDebugBreakPoint(fileImpl, "set12", expected);
  });

  test("Pass_InEachLoop", async () => {
    const code = `${testHeader}

main
  variable a set to {7,8,9}
  variable n set to 0
  each x in a
    set n to n + x
  end each
  print n
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("ListImmutable<of Int>", "a", "{7, 8, 9}"),
      asDebugSymbol("Int", "n", "0"),
      asDebugSymbol("Int", "x", "7"),
    ];

    await assertDebugBreakPoint(fileImpl, "set13", expected);
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
  print t
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      asDebugSymbol("Int", "t", "0"),
      asDebugSymbol("Int", "x", "0"),
      asDebugSymbol("Int", "y", "1"),
    ];

    await assertDebugBreakPoint(fileImpl, "set21", expected);
  });

  test("Pass_InRepeatLoop", async () => {
    const code = `${testHeader}

main
  variable x set to 0
  repeat
    set x to x + 1
  end repeat when x >= 10
  print x
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("Int", "x", "0")];

    await assertDebugBreakPoint(fileImpl, "set9", expected);
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
    print b
  end try
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("Int", "a", "1")];

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
    print b
  end try
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("String", "b", "error"), asDebugSymbol("String", "e", "error")];

    await assertDebugBreakPoint(fileImpl, "print19", expected);
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("Boolean", "a", "true"), asDebugSymbol("Int", "b", "1")];

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("Boolean", "a", "false"), asDebugSymbol("Int", "c", "1")];

    await assertDebugBreakPoint(fileImpl, "set21", expected);
  });

  test("Pass_InElseIf", async () => {
    const code = `${testHeader}

main
  variable a set to false
  if a then
    variable b set to 1
    set b to 2
  else if a is false then 
    variable c set to 1
    set c to 2
  end if
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("Boolean", "a", "false"), asDebugSymbol("Int", "c", "1")];

    await assertDebugBreakPoint(fileImpl, "set21", expected);
  });

  test("Pass_AsyncBreakPoints", async () => {
    const code = `${testHeader}

main
  variable a set to [ff(1), ff(2)]
  print a
end main

function ff(a as Int) returns Int
  return a
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("Int", "a", "1")];

    await assertDebugBreakPoint(fileImpl, "return13", expected);
  });

  test("Pass_OutParameter", async () => {
    const code = `${testHeader}

main
  variable x set to 1
  call printParameter(x)
end main
  
procedure printParameter(out n as Int)
  print n
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("Int", "n", "1")];

    await assertDebugBreakPoint(fileImpl, "print13", expected);
  });

  test("Pass_ClassTypeInfo", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  print x
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [asDebugSymbol("Int", "n", "1")];

    await assertDebugBreakPoint(fileImpl, "print6", expected);
  });
});
