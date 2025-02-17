import { DefaultProfile } from "../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../src/frames/file-impl";
import { ignore_test, testHash, transforms } from "./compiler/compiler-test-helpers";
import { assertDebugBreakPoint } from "./testHelpers";

suite("DebugBreakpoint", () => {
  test("Pass_Main", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to 1

main

end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "main4", expected);
  });

  test("Pass_LocalvariablesMain", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  variable b set to [1, 2]
  variable c set to "fred"
  variable d set to {1:2}
  set a to 2
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "1"],
      ["b", "[1, 2]"],
      ["c", "fred"],
      ["d", "{1:2}"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set15", expected);
  });

  test("Pass_LocalvariablesProcedure", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "1"],
      ["b", "[1, 2]"],
      ["c", "fred"],
      ["d", "{1:2}"],
      ["e", "3"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set22", expected);
  });

  test("Pass_LocalvariablesFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "1"],
      ["b", "[1, 2]"],
      ["c", "fred"],
      ["d", "{1:2}"],
      ["e", "3"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set25", expected);
  });

  test("Pass_LocalvariablesMemberProcedure", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "1"],
      ["b", "[1, 2]"],
      ["c", "fred"],
      ["d", "{1:2}"],
      ["e", "3"],
      ["property.f", "0"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set32", expected);
  });

  test("Pass_LocalvariablesMemberFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "1"],
      ["b", "[1, 2]"],
      ["c", "fred"],
      ["d", "{1:2}"],
      ["e", "3"],
      ["property.f", "0"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set35", expected);
  });

  test("Pass_LocalvariablesConstructor", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "1"],
      ["b", "[1, 2]"],
      ["c", "fred"],
      ["d", "{1:2}"],
      ["e", "3"],
      ["property.f", "0"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set25", expected);
  });

  test("Pass_InForLoop", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable tot set to 0
  for i from 1 to 10 step 1
    set tot to tot + i
  end for
  print tot
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["i", "1"],
      ["tot", "0"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set12", expected);
  });

  test("Pass_InEachLoop", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {7,8,9}
  variable n set to 0
  each x in a
    set n to n + x
  end each
  print n
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "{7, 8, 9}"],
      ["n", "0"],
      ["x", "7"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set13", expected);
  });

  test("Pass_InWhileLoop", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["t", "0"],
      ["x", "0"],
      ["y", "1"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set21", expected);
  });

  test("Pass_InRepeatLoop", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable x set to 0
  repeat
    set x to x + 1
  end repeat when x >= 10
  print x
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["x", "0"]] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set9", expected);
  });

  test("Pass_InTry", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["a", "1"]] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set11", expected);
  });

  test("Pass_InCatch", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["b", "error"],
      ["e", "error"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "print19", expected);
  });

  test("Pass_InIf", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "true"],
      ["b", "1"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set12", expected);
  });

  test("Pass_InElse", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "false"],
      ["c", "1"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set21", expected);
  });

  test("Pass_InElseIf", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "false"],
      ["c", "1"],
    ] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "set21", expected);
  });

  test("Pass_AsyncBreakPoints", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to [ff(1), ff(2)]
  print a
end main

function ff(a as Int) returns Int
  return a
end function
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["a", "1"]] as [string, string][];

    await assertDebugBreakPoint(fileImpl, "return13", expected);
  });
});
