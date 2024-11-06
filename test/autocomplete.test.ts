import { DefaultProfile } from "../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../src/frames/file-impl";
import { ignore_test, testHash, transforms } from "./compiler/compiler-test-helpers";
import { assertAutocompletes, assertAutocompletesWithString } from "./testHelpers";

suite("Autocomplete", () => {
  test("Pass_LocalVars", async () => {
    const code = `# FFFF Elan Beta 4 valid

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

  test("Pass_LocalVarsCaseInsensitive", async () => {
    const code = `# FFFF Elan Beta 4 valid

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

    await assertAutocompletes(fileImpl, "ident10", "O", 1, expected);
  });

  test("Pass_InClass", async () => {
    const code = `# FFFF Elan Beta 4 valid

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
    const code = `# FFFF Elan Beta 4 valid

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
    const code = `# FFFF Elan Beta 4 valid

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
    const code = `# FFFF Elan Beta 4 valid

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
    const code = `# FFFF Elan Beta 4 valid

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

  //RP: Failing because no auto-complete options are found. Yet all three expected show up when using the editor with same code?
  //Note that the three have all changed from being instance methods, to extension methods
  ignore_test("Pass_CallLibMembers", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to new BlockGraphics()
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["clearGraphics", "Procedure ()"],
      ["clearKeyBuffer", "Procedure ()"],
      ["display", "Procedure ()"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident7", ".", 3, expected);
  });

  test("Pass_CallMembersFilter", async () => {
    const code = `# FFFF Elan Beta 4 valid

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
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to [1, 2]
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["append", "Procedure ([Generic Parameter T1], Generic Parameter T1)"],
      ["appendList", "Procedure ([Generic Parameter T1], [Generic Parameter T1])"],
      ["insertAt", "Procedure ([Generic Parameter T1], Int, Generic Parameter T1)"],
      ["prepend", "Procedure ([Generic Parameter T1], Generic Parameter T1)"],
      ["prependList", "Procedure ([Generic Parameter T1], [Generic Parameter T1])"],
      ["putAt", "Procedure ([Generic Parameter T1], Int, Generic Parameter T1)"],
      ["removeAll", "Procedure ([Generic Parameter T1], Generic Parameter T1)"],
      ["removeAt", "Procedure ([Generic Parameter T1], Int)"],
      ["removeFirst", "Procedure ([Generic Parameter T1], Generic Parameter T1)"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident7", ".", 3, expected);
  });

  test("Pass_CallExtensionsFilter", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to [1, 2]
  call foo.a()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["append", "Procedure ([Generic Parameter T1], Generic Parameter T1)"],
      ["appendList", "Procedure ([Generic Parameter T1], [Generic Parameter T1])"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident7", "p", 5, expected);
  });

  test("Pass_ExpressionId", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to 1
  var bar set to f
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "*"],
      ["createFileForWriting", "*"],
      ["openFileForReading", "*"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "expr8", "o", 1, expected);
  });

  test("Pass_ExpressionLocalVar", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to 1
  var bar set to 1 + f
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "*"],
      ["createFileForWriting", "*"],
      ["openFileForReading", "*"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "expr8", "o", 5, expected);
  });

  test("Pass_ExpressionLocalFunction", async () => {
    const code = `# FFFF Elan Beta 4 valid

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
      ["foo", "*"],
      ["foobar", "Func<of  => Int>"],
      ["createFileForWriting", "*"],
      ["openFileForReading", "*"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "expr8", "o", 5, expected);
  });

  test("Pass_ExpressionDictionaryExtension", async () => {
    const code = `# FFFF Elan Beta 4 valid

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

  test("Pass_ExpressionAbstractDictionaryExtension", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to {"a":1}
  var bar set to foo.k
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      [
        "keys",
        "Func<of AbstractDictionary <Generic Parameter T1,Generic Parameter T2> => {Generic Parameter T1}>",
      ],
      ["hasKey", "*"],
      ["withPutAtKey", "*"],
      ["withRemoveAtKey", "*"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "expr8", "e", 5, expected);
  });

  test("Pass_CallImmutableDict", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to {"a":1}
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [] as [string, string][];

    await assertAutocompletes(fileImpl, "ident7", ".", 3, expected);
  });

  test("Pass_CallDict", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to ["a":1]
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["putAtKey", "*"],
      ["removeAtKey", "*"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident7", ".", 3, expected);
  });

  test("Pass_ExprDict", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to ["a":1]
  var bar set to foo
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["asString", "*"],
      ["hasKey", "*"],
      ["keys", "*"],
      ["values", "*"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "expr8", ".", 3, expected);
  });

  test("Pass_ExprImmutableDict", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to {"a":1}
  var bar set to foo
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["asString", "*"],
      ["hasKey", "*"],
      ["keys", "*"],
      ["values", "*"],
      ["withPutAtKey", "*"],
      ["withRemoveAtKey", "*"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "expr8", ".", 3, expected);
  });

  test("Pass_properties1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    var f set to 0
    var p set to 0
    var bar set to 0
    set f to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["f", "*"],
      ["foo", "*"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident24", "f", 0, expected, true);
  });

  test("Pass_properties2", async () => {
    const code = `# FFFF Elan Beta 4 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    var f set to 0
    var p set to 0
    var bar set to 0
    set f to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["foo", "*"]] as [string, string][];

    await assertAutocompletes(fileImpl, "ident24", "o", 1, expected);
  });

  test("Pass_properties3", async () => {
    const code = `# FFFF Elan Beta 4 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    var f set to 0
    var p set to 0
    var bar set to 0
    set f to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["p", "*"],
      ["foo", "*"],
      ["b", "*"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident24", "p", 0, expected, true);
  });

  test("Pass_properties4", async () => {
    const code = `# FFFF Elan Beta 4 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    var f set to 0
    var p set to 0
    var bar set to 0
    set p to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "*"],
      ["b", "*"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident24", "r", 1, expected);
  });

  test("Pass_properties5", async () => {
    const code = `# FFFF Elan Beta 4 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    var f set to 0
    var p set to 0
    var bar set to 0
    set f to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["foo", "*"]] as [string, string][];

    await assertAutocompletesWithString(fileImpl, "ident24", "property.f", expected);
  });

  test("Pass_properties6", async () => {
    const code = `# FFFF Elan Beta 4 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    var f set to 0
    var p set to 0
    var bar set to 0
    set f to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["b", "*"],
      ["bar", "*"],
    ] as [string, string][];

    await assertAutocompletes(fileImpl, "ident24", "b", 0, expected, true);
  });

  test("Pass_properties6", async () => {
    const code = `# FFFF Elan Beta 4 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    var f set to 0
    var p set to 0
    var bar set to 0
    set b to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["bar", "*"]] as [string, string][];

    await assertAutocompletes(fileImpl, "ident24", "a", 1, expected);
  });

  test("Pass_private1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
  var foo set to new Foo()
  call foo.p()
end main

class Foo
  constructor()
  end constructor

  private procedure pp1()
  end procedure

  procedure pp2()
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["pp2", "*"]] as [string, string][];

    await assertAutocompletesWithString(fileImpl, "ident7", "foo.p", expected);
  });

  test("Pass_private2", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
 
end main

class Foo
  constructor()
  end constructor

  private procedure pp1()
  end procedure

  procedure pp2()
    call p()
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["pp1", "*"],
      ["pp2", "*"],
    ] as [string, string][];

    await assertAutocompletesWithString(fileImpl, "ident19", "pp", expected);
  });

  test("Pass_assert", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
 
end main

class Foo
  constructor()
  end constructor

  function ff() return Int
    return 0
  end function

end class

test tt
  var gr set to new Foo()
  assert gr.ff() is 0
end test`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["ff", "*"]] as [string, string][];

    await assertAutocompletesWithString(fileImpl, "text24", "gr.", expected);
  });

  test("Pass_typeName1", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
 
end main

function foo(a as String) return String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["Set", "*"],
      ["Stack", "*"],
      ["String", "*"],
    ] as [string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as S", expected);
  });

  test("Pass_typeName2", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
 
end main

function foo(a as String) return String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["Int", "*"]] as [string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as [I", expected);
  });

  test("Pass_typeName3", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
 
end main

function foo(a as String) return String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["Float", "*"]] as [string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as {F", expected);
  });

  test("Pass_typeName4", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
 
end main

function foo(a as String) return String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["BaseVG", "*"],
      ["BlockGraphics", "*"],
      ["Boolean", "*"],
    ] as [string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as {Float:B", expected);
  });

  test("Pass_typeName5", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
 
end main

function foo(a as String) return String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["BaseVG", "*"],
      ["BlockGraphics", "*"],
      ["Boolean", "*"],
    ] as [string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as Int, b as B", expected);
  });

  test("Pass_typeName6", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
 
end main

function foo(a as String) return String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["Int", "*"]] as [string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as Set<of I", expected);
  });

  test("Pass_typeName7", async () => {
    const code = `# FFFF Elan Beta 4 valid

main
 
end main

function foo(a as String) return String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["GraphicsBase", "*"],
      ["BlockGraphics", "*"],
      ["VectorGraphics", "*"],
    ] as [string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as Graphics", expected);
  });
});
