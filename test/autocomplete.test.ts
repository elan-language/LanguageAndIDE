import { DefaultProfile } from "../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../src/frames/file-impl";
import { testHash, transforms } from "./compiler/compiler-test-helpers";
import { assertAutocompletes } from "./testHelpers";

suite("Autocomplete", () => {
  test("Pass_LocalVars", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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

  test("Pass_InClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    set a to 2
  end procedure

  property aa2 as Int
  property aa3 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["aa2", "Int"],
      ["aa3", "Int"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident15", "a", 1, expected);
  });

  test("Pass_FiltersByInput", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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

    await assertAutocompletes(fileImpl, "ident36", ".", 3, expected);
  });

  test("Pass_CallMembersFilter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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

    await assertAutocompletes(fileImpl, "ident36", "p", 5, expected);
  });

  test("Pass_CallExtensions", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var foo set to [1, 2]
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["append", "Procedure ([Generic Parameter T], Generic Parameter T)"],
      ["appendList", "Procedure ([Generic Parameter T], [Generic Parameter T])"],
      ["insertAt", "Procedure ([Generic Parameter T], Int, Generic Parameter T)"],
      ["prepend", "Procedure ([Generic Parameter T], Generic Parameter T)"],
      ["prependList", "Procedure ([Generic Parameter T], [Generic Parameter T])"],
      ["putAt", "Procedure ([Generic Parameter T], Int, Generic Parameter T)"],
      ["removeAll", "Procedure ([Generic Parameter T], Generic Parameter T)"],
      ["removeAt", "Procedure ([Generic Parameter T], Int)"],
      ["removeFirst", "Procedure ([Generic Parameter T], Generic Parameter T)"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident7", ".", 3, expected);
  });

  test("Pass_CallExtensionsFilter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var foo set to [1, 2]
  call foo.a()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["append", "Procedure ([Generic Parameter T], Generic Parameter T)"],
      ["appendList", "Procedure ([Generic Parameter T], [Generic Parameter T])"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident7", "p", 5, expected);
  });

  test("Pass_ExpressionId", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

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
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var foo set to 1
  var bar set to 1 + f
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["foo", "Int"]] as [string, string][];

    await assertAutocompletes(fileImpl, "expr8", "o", 5, expected);
  });

  test("Pass_ExpressionLocalFunction", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var foo set to 1
  var bar set to 1 + f
end main

function foobar() return Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "Int"],
      ["foobar", "Func<of  => Int>"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "expr8", "o", 5, expected);
  });

  test("Pass_ExpressionDictionaryExtension", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var foo set to {"a":1}
  var bar set to foo.w
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      [
        "withPutAtKey",
        "Func<of {Generic Parameter T1:Generic Parameter T2}, Generic Parameter T1, Generic Parameter T2 => {Generic Parameter T1:Generic Parameter T2}>",
      ],
      [
        "withRemoveAtKey",
        "Func<of {Generic Parameter T1:Generic Parameter T2}, Generic Parameter T1 => {Generic Parameter T1:Generic Parameter T2}>",
      ],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "expr8", "i", 5, expected);
  });
});
