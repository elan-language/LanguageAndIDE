import { DefaultProfile } from "../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../src/frames/file-impl";
import { testHash, transforms } from "./compiler/compiler-test-helpers";
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

  test("Pass_InLoop", async () => {
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
});
