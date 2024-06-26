import { CodeSourceFromString } from "../frames/code-source";
import { DefaultProfile } from "../frames/default-profile";
import { FileImpl } from "../frames/file-impl";
import { ignore_test, testHash, transforms } from "./compiler/compiler-test-helpers";
import { assertAutocompletes } from "./testHelpers";

suite("Autocomplete", () => {
  test("Pass_LocalVars", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var foo set to 1
  var foobar set to 2
  set f to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "Int"],
      ["foobar", "Int"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident10", "o", 1, expected);
  });

  test("Pass_FiltersByInput", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var foo set to 1
  var foobar set to 2
  set foo to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["foobar", "Int"]] as [string, string][];

    await assertAutocompletes(fileImpl, "ident10", "b", 3, expected);
  });

  test("Pass_NoConstant", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant fooyon set to 3

main
  var foo set to 1
  var foobar set to 2
  set f to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "Int"],
      ["foobar", "Int"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident13", "o", 1, expected);
  });

  test("Pass_CallLocalVars", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

procedure fooyon()

end procedure

main
  var foo set to 1
  var foobar set to 2
  call f()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "Int"],
      ["foobar", "Int"],
      ["fooyon", "Procedure ()"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident14", "o", 1, expected);
  });

  test("Pass_CallMembers", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo
  constructor()
  end constructor

  procedure proc1()
  end procedure

  procedure proc2()
  end procedure

  procedure pproc3()
  end procedure

  property prop1 as Int

  function func1() return Int
    return 0
  end function

end class

main
  var foo set to new Foo()
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["pproc3", "Procedure ()"],
      ["proc1", "Procedure ()"],
      ["proc2", "Procedure ()"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident39", ".", 3, expected);
  });

  test("Pass_CallMembersFilter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo
  constructor()
  end constructor

  procedure proc1()
  end procedure

  procedure proc2()
  end procedure

  procedure pproc3()
  end procedure

  property prop1 as Int

  function func1() return Int
    return 0
  end function

end class

main
  var foo set to new Foo()
  call foo.p()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["pproc3", "Procedure ()"]] as [string, string][];

    await assertAutocompletes(fileImpl, "ident39", "p", 5, expected);
  });

  test("Pass_CallExtensions", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var foo set to [1, 2]
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["add", "Procedure (ArrayList <Generic Parameter T>, Generic Parameter T)"],
      [
        "initialiseAsArray",
        "Procedure (ArrayList <Generic Parameter T>, Int, Generic Parameter T)",
      ],
      ["insert", "Procedure (ArrayList <Generic Parameter T>, Int, Generic Parameter T)"],
      ["remove", "Procedure (ArrayList <Generic Parameter T>, Int)"],
      ["removeAll", "Procedure (ArrayList <Generic Parameter T>, Generic Parameter T)"],
      ["removeFirst", "Procedure (ArrayList <Generic Parameter T>, Generic Parameter T)"],
      ["size", "Procedure (ArrayList <Generic Parameter T>, Int)"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident7", ".", 3, expected);
  });

  test("Pass_CallExtensionsFilter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var foo set to [1, 2]
  call foo.a()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["add", "Procedure (ArrayList <Generic Parameter T>, Generic Parameter T)"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident7", "d", 5, expected);
  });

  test("Pass_ExpressionId", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var foo set to 1
  var bar set to f
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["foo", "Int"]] as [string, string][];

    await assertAutocompletes(fileImpl, "expr8", "o", 1, expected);
  });

  test("Pass_ExpressionLocalVar", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var foo set to 1
  var bar set to 1 + f
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["foo", "Int"]] as [string, string][];

    await assertAutocompletes(fileImpl, "expr8", "o", 5, expected);
  });
});
