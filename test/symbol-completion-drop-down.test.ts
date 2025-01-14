import { DefaultProfile } from "../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../src/frames/file-impl";
import { ignore_test, testHash, transforms } from "./compiler/compiler-test-helpers";
import { assertAutocompletes, assertAutocompletesWithString } from "./testHelpers";

suite("SymbolCompletionDropDown", () => {
  test("Pass_LocalVars", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to 1
  variable foobar set to 2
  set f to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "foo", "foo"],
      ["foobar", "foobar", "foobar"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident10", "o", 1, expected);
  });

  test("Pass_LocalVars1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to 1
  variable foobar set to 2
  set f to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["property", "property", "property."],
      ["foo", "foo", "foo"],
      ["foobar", "foobar", "foobar"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident10", " ", expected);
  });

  test("Pass_Let", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let foo be foo
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "foo", "foo"],
      ["createFileForWriting", "createFileForWriting", "createFileForWriting("],
      ["openFileForReading", "openFileForReading", "openFileForReading("],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "fo", expected);
  });

  test("Pass_keyword", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["not", "not", "not"],
      ["bitNot", "bitNot", "bitNot("],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "no", expected);
  });

  test("Pass_Keywords", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["and", "and", "and "],
      ["div", "div", "div "],
      ["is", "is", "is "],
      ["isnt", "isnt", "isnt "],
      ["mod", "mod", "mod "],
      ["or", "or", "or "],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "expr5", " ", 1, expected);
  });

  test("Pass_emptyExpression", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to 0
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    await assertAutocompletesWithString(fileImpl, "expr5", " ", 70);
  });

  test("Pass_LocalVarsCaseInsensitive1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to 1
  variable fooBar set to 2
  set foo to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["fooBar", "*", "*"]] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident10", "b", 3, expected);
  });

  test("Pass_LocalVarsCaseInsensitive2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to 1
  variable foobar set to 2
  set f to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident10", "O", 1, expected);
  });

  test("Pass_InClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
      ["aa2", "property.aa2", "property.aa2"],
      ["aa3", "property.aa3", "property.aa3"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident15", "a", 1, expected);
  });

  test("Pass_InConstructor", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo
  constructor()
    set a to 0
  end constructor

  property aa2 as Int
  property aa3 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["aa2", "property.aa2", "property.aa2"],
      ["aa3", "property.aa3", "property.aa3"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident9", "a", expected);
  });

  test("Pass_InProcedure", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo
  constructor()
  end constructor

  procedure pp()
    variable a set to 0
    set a to 0
  end procedure

  property aa2 as Int
  property aa3 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "a", "a"],
      ["aa2", "property.aa2", "property.aa2"],
      ["aa3", "property.aa3", "property.aa3"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident16", "a", expected);
  });

  test("Pass_InProcedureParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo
  constructor()
  end constructor

  procedure pp(aa4 as Int)
    variable a set to 0
    set a to 0
  end procedure

  property aa2 as Int
  property aa3 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "a", "a"],
      ["aa2", "property.aa2", "property.aa2"],
      ["aa3", "property.aa3", "property.aa3"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident16", "a", expected);
  });

  test("Pass_InProcedureOutParameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

class Foo
  constructor()
  end constructor

  procedure pp(out aa4 as Int)
    variable a set to 0
    set a to 0
  end procedure

  property aa2 as Int
  property aa3 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["a", "a", "a"],
      ["aa2", "property.aa2", "property.aa2"],
      ["aa3", "property.aa3", "property.aa3"],
      ["aa4", "aa4", "aa4"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident16", "a", expected);
  });

  test("Pass_FiltersByInput", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to 1
  variable foobar set to 2
  set foo to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["foobar", "foobar", "foobar"]] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident10", "b", 3, expected);
  });

  test("Pass_NoConstant", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant fooyon set to 3

main
  variable foo set to 1
  variable foobar set to 2
  set f to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "foo", "foo"],
      ["foobar", "foobar", "foobar"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident13", "o", 1, expected);
  });

  test("Pass_StdLibConstant", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to w
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["white", "white", "white"]] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "wh", expected);
  });

  test("Pass_CallLocalVars", async () => {
    const code = `# FFFF Elan v1.0.0 valid

procedure fooyon()

end procedure

main
  variable foo set to 1
  variable foobar set to 2
  call f()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "foo", "foo."],
      ["foobar", "foobar", "foobar."],
      ["fooyon", "fooyon", "fooyon"],
      ["waitForAnyKey", "waitForAnyKey", "waitForAnyKey"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident14", "o", 1, expected);
  });

  test("Pass_CallMembers", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

  function func1() returns Int
    return 0
  end function

end class

main
  variable foo set to new Foo()
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["pproc3", "*", "*"],
      ["proc1", "*", "*"],
      ["proc2", "*", "*"],
      ["prop1", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident36", ".", 3, expected);
  });

  test("Pass_CallLibMembers", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to new BlockGraphics()
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["clearGraphics", "clearGraphics", "clearGraphics"],
      ["clearKeyBuffer", "clearKeyBuffer", "clearKeyBuffer"],
      ["display", "display", "display"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident7", ".", 3, expected);
  });

  test("Pass_CallMembersFilter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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

  function func1() returns Int
    return 0
  end function

end class

main
  variable foo set to new Foo()
  call foo.p()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["pproc3", "*", "*"]] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident36", "p", 5, expected);
  });

  test("Pass_CallExtensions", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to [1, 2]
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["append", "*", "*"],
      ["appendList", "*", "*"],
      ["insertAt", "*", "*"],
      ["prepend", "*", "*"],
      ["prependList", "*", "*"],
      ["putAt", "*", "*"],
      ["removeAll", "*", "*"],
      ["removeAt", "*", "*"],
      ["removeFirst", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident7", ".", 3, expected);
  });

  test("Pass_CallExtensionsFilter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to [1, 2]
  call foo.a()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["append", "*", "*"],
      ["appendList", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident7", "p", 5, expected);
  });

  test("Pass_ExpressionId", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to 1
  variable bar set to f
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "*", "*"],
      ["createFileForWriting", "*", "*"],
      ["openFileForReading", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "expr8", "o", 1, expected);
  });

  test("Pass_ExpressionLocalVar", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to 1
  variable bar set to 1 + f
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "*", "*"],
      ["createFileForWriting", "*", "*"],
      ["openFileForReading", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "expr8", "o", 5, expected);
  });

  test("Pass_ExpressionLocalFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to 1
  variable bar set to 1 + f
end main

function foobar() returns Int
  return 0
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["foo", "*", "*"],
      ["foobar", "*", "*"],
      ["createFileForWriting", "*", "*"],
      ["openFileForReading", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "expr8", "o", 5, expected);
  });

  test("Pass_ExpressionDictionaryExtension", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to {"a":1}
  variable bar set to foo.w
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["withPutAtKey", "*", "*"],
      ["withRemoveAtKey", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "expr8", "i", 5, expected);
  });

  test("Pass_ExpressionAbstractDictionaryExtension", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to {"a":1}
  variable bar set to foo.k
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["keys", "*", "*"],
      ["hasKey", "*", "*"],
      ["withPutAtKey", "*", "*"],
      ["withRemoveAtKey", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "expr8", "e", 5, expected);
  });

  test("Pass_CallImmutableDict", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to {"a":1}
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident7", ".", 3, expected);
  });

  test("Pass_CallDict", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to ["a":1]
  call foo()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["putAtKey", "*", "*"],
      ["removeAtKey", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident7", ".", 3, expected);
  });

  test("Pass_ExprDict", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to ["a":1]
  variable bar set to foo
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["asString", "*", "*"],
      ["hasKey", "*", "*"],
      ["keys", "*", "*"],
      ["values", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "expr8", ".", 3, expected);
  });

  test("Pass_ExprImmutableDict", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to {"a":1}
  variable bar set to foo
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["asString", "*", "*"],
      ["hasKey", "*", "*"],
      ["keys", "*", "*"],
      ["values", "*", "*"],
      ["withPutAtKey", "*", "*"],
      ["withRemoveAtKey", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "expr8", ".", 3, expected);
  });

  test("Pass_properties1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    variable f set to 0
    variable p set to 0
    variable bar set to 0
    set f to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["f", "*", "*"],
      ["foo", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident24", "f", 0, expected, true);
  });

  test("Pass_properties2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    variable f set to 0
    variable p set to 0
    variable bar set to 0
    set f to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["foo", "*", "*"]] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident24", "o", 1, expected);
  });

  test("Pass_properties3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    variable f set to 0
    variable p set to 0
    variable bar set to 0
    set f to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["property", "*", "*"],
      ["p", "*", "*"],
      ["foo", "*", "*"],
      ["b", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident24", "p", 0, expected, true);
  });

  test("Pass_properties4", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    variable f set to 0
    variable p set to 0
    variable bar set to 0
    set p to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["property", "*", "*"],
      ["foo", "*", "*"],
      ["b", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident24", "r", 1, expected);
  });

  test("Pass_properties5", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    variable f set to 0
    variable p set to 0
    variable bar set to 0
    set f to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["foo", "*", "*"]] as [string, string, string][];
    await assertAutocompletesWithString(fileImpl, "ident24", "property.f", expected);
  });

  test("Pass_properties6", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    variable f set to 0
    variable p set to 0
    variable bar set to 0
    set f to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["b", "*", "*"],
      ["bar", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident24", "b", 0, expected, true);
  });

  test("Pass_properties7", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main

end main

class Foo
  constructor()

  end constructor

  procedure pp1()
    variable f set to 0
    variable p set to 0
    variable bar set to 0
    set b to 0
  end procedure

  property foo as Int
  property b as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["bar", "*", "*"]] as [string, string, string][];

    await assertAutocompletes(fileImpl, "ident24", "a", 1, expected);
  });

  test("Pass_private1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable foo set to new Foo()
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

    const expected = [["pp2", "*", "*"]] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident7", "foo.p", expected);
  });

  test("Pass_private2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
      ["pp1", "*", "*"],
      ["pp2", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident19", "pp", expected);
  });

  test("Pass_assert", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor

  function ff() returns Int
    return 0
  end function

end class

test tt
  variable gr set to new Foo()
  assert gr.ff() is 0
end test`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["asString", "*", "*"],
      ["ff", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "text24", "gr.", expected);
  });

  test("Pass_typeName1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

function foo(a as String) returns String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["Set", "*", "*"],
      ["Stack", "*", "*"],
      ["String", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as S", expected);
  });

  test("Pass_typeName2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

function foo(a as String) returns String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["Int", "*", "*"],
      ["Iterable", "*", "*"],
      ["DictionaryImmutable", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as I", expected);
  });

  test("Pass_type_dictionaryImmutable", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

function foo(a as String) returns String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["BaseVG", "*", "*"],
      ["BlockGraphics", "*", "*"],
      ["Boolean", "*", "*"],
      ["GraphicsBase", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(
      fileImpl,
      "params6",
      "a as Dictionary<of Float, B",
      expected,
    );
  });

  test("Pass_typeName5", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

function foo(a as String) returns String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["BaseVG", "*", "*"],
      ["BlockGraphics", "*", "*"],
      ["Boolean", "*", "*"],
      ["GraphicsBase", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as Int, b as B", expected);
  });

  test("Pass_typeName6", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

function foo(a as String) returns String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["Int", "*", "*"],
      ["Iterable", "*", "*"],
      ["DictionaryImmutable", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as Set<of I", expected);
  });

  test("Pass_typeName7", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

function foo(a as String) returns String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["GraphicsBase", "*", "*"],
      ["BlockGraphics", "*", "*"],
      ["VectorGraphics", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "params6", "a as Graphics", expected);
  });

  test("Pass_returnType1", async () => {
    const code = `# FFFF Elan Beta 3 valid

function foo(a as String) returns String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["Set", "*", "*"],
      ["Stack", "*", "*"],
      ["String", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "type5", "S", expected);
  });

  test("Pass_returnType2", async () => {
    const code = `# FFFF Elan Beta 3 valid

function foo(a as String) returns String
  return a
end function`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["GraphicsBase", "*", "*"],
      ["BlockGraphics", "*", "*"],
      ["VectorGraphics", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "type5", "Graphics", expected);
  });

  test("Pass_functionResult", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  variable a set to foo().f1()
end main

function foo() returns Bar
  return new Bar()
end function

class Bar
  constructor()
  end constructor

  function f1() returns Int
    return 0
  end function

  function f2() returns String
    return ""
  end function

  property f3 as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["asString", "*", "*"],
      ["f1", "*", "*"],
      ["f2", "*", "*"],
      ["f3", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "foo().", expected);
  });

  test("Pass_functionResultWithParams", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  variable a set to foo(1).f1()
end main

function foo(a as Int) returns Bar
  return new Bar()
end function

class Bar
  constructor()
  end constructor

  function f1() returns Int
    return 0
  end function

  function f2() returns String
    return ""
  end function

  property f3 as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["asString", "*", "*"],
      ["f1", "*", "*"],
      ["f2", "*", "*"],
      ["f3", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "foo(1).", expected);
  });

  test("Pass_complexExpression1", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  variable alpha set to 0
  variable beta set to abs(alpha)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["alpha", "*", "*"],
      ["false", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr8", "abs(al", expected);
  });

  test("Pass_with1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
      variable a set to new Foo()
      variable b set to copy a with a to 2
    end main
    
    record Foo
      property a as Int
    end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["a", "*", "*"]] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr8", "copy a with ", expected);
  });

  test("Pass_withIgnoreKeyword1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
      variable a set to new Foo()
      variable b set to copy a with a to 2
    end main
    
    record Foo
      property a as Int
    end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["with", "*", "*"]] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr8", "copy a ", expected);
  });

  test("Pass_withIgnoreKeyword2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
      variable a set to new Foo()
      variable b set to copy a with a to 2
    end main
    
    record Foo
      property a as Int
    end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["with", "*", "*"]] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr8", "copy a w", expected);
  });

  test("Pass_withIgnoreKeyword3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
      variable a set to new Foo()
      variable b set to copy a with a to 2
    end main
    
    record Foo
      property a as Int
    end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["to", "*", "*"]] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr8", "copy a with a ", expected);
  });

  test("Pass_with2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
      variable a set to new Foo()
      variable b set to copy a with a to 2
    end main
    
    record Foo
      property aa as Int
      property ab as Int
    end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["aa", "*", "*"],
      ["ab", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr8", "copy a with a", expected);
  });

  test("Pass_with3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
      variable a set to new Foo()
      variable b set to copy a with a to 2
    end main
    
    record Foo
      property aa as Int
      property ab as Int
    end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["aa", "*", "*"],
      ["ab", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr8", "copy a with aa to 0, a", expected);
  });

  test("Pass_newWith1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
      variable a set to new Foo() with a to 2
    end main
    
    record Foo
      property a as Int
    end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["a", "*", "*"]] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "new Foo() with ", expected);
  });

  test("Pass_newWith2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
      variable a set to new Foo() with a to 2
    end main
    
    record Foo
      property aa as Int
      property ab as Int
    end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["aa", "*", "*"],
      ["ab", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "new Foo() with a", expected);
  });

  test("Pass_newWith3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
      variable a set to new Foo() with a to 2
    end main
    
    record Foo
      property aa as Int
      property ab as Int
    end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["aa", "*", "*"],
      ["ab", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "new Foo() with aa to 0, a", expected);
  });

  test("Pass_libExtension1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
      variable foo set to new BlockGraphics()
      call foo()
    end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["clearGraphics", "*", "*"],
      ["clearKeyBuffer", "*", "*"],
      ["display", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident7", "foo.", expected);
  });

  test("Pass_libExtension2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

    main
      variable foo set to new BlockGraphics()
      variable a set to foo
    end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["asHtml", "*", "*"],
      ["asString", "*", "*"],
      ["getBackground", "*", "*"],
      ["getChar", "*", "*"],
      ["getForeground", "*", "*"],
      ["withBackground", "*", "*"],
      ["withBlock", "*", "*"],
      ["withText", "*", "*"],
      ["withUnicode", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr8", "foo.", expected);
  });

  test("Pass_newType1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let foo be new BlockGraphics()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["BlockGraphics", "*", "*"],
      ["Boolean", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "new B", expected);
  });

  test("Pass_newType2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let foo be new BlockGraphics()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["Array", "*", "Array<of "],
      ["Array2D", "*", "Array2D<of "],
      ["BlockGraphics", "*", "*"],
      ["Boolean", "*", "*"],
      ["CircleVG", "*", "*"],
      ["Dictionary", "*", "*"],
      ["DictionaryImmutable", "*", "*"],
      ["Float", "*", "*"],
      ["Int", "*", "*"],
      ["LineVG", "*", "*"],
      ["List", "*", "List<of "],
      ["Queue", "*", "*"],
      ["Random", "*", "*"],
      ["RectangleVG", "*", "*"],
      ["RegExp", "*", "*"],
      ["Set", "*", "*"],
      ["Stack", "*", "*"],
      ["String", "*", "*"],
      ["TextFileReader", "*", "*"],
      ["TextFileWriter", "*", "*"],
      ["Turtle", "*", "*"],
      ["VectorGraphics", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "new ", expected);
  });

  test("Pass_Deconstruction1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable ab set to 0
  variable aa:ac set to [0]
  set aa to 0
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["aa", "aa", "aa"],
      ["ab", "ab", "ab"],
      ["ac", "ac", "ac"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident10", "a", expected);
  });

  test("Pass_Deconstruction2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable ab set to 0
  variable aa,ac set to (0, "fred")
  set aa to 0
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["aa", "aa", "aa"],
      ["ab", "ab", "ab"],
      ["ac", "ac", "ac"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident10", "a", expected);
  });

  test("Pass_Deconstruction3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable ab set to 0
  variable aa,ac set to new Foo()
  set aa to 0
end main

record Foo
  property aa as Int
  property ac as String
end record`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["aa", "aa", "aa"],
      ["ab", "ab", "ab"],
      ["ac", "ac", "ac"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident10", "a", expected);
  });

  test("Pass_Parameter", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable bubbles set to empty Array<of CircleVG>
  call bubbles.putAt(0, new CircleVG())
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["CircleVG", "CircleVG", "CircleVG"]] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "args8", "0, new C", expected);
  });

  test("Pass_withParameters", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let c be new CircleVG() with cx to 1
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["cx", "cx", "cx"],
      ["cy", "cy", "cy"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "new CircleVG() with c", expected);
  });

  test("Pass_newConcreteType #897", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new VectorGraphics()
  let vg2 be vg.add(new CircleVG())
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["Array", "*", "*"],
      ["Array2D", "*", "Array2D<of "],
      ["BlockGraphics", "*", "*"],
      ["Boolean", "*", "*"],
      ["CircleVG", "*", "*"],
      ["Dictionary", "*", "*"],
      ["DictionaryImmutable", "*", "*"],
      ["Float", "*", "*"],
      ["Int", "*", "*"],
      ["LineVG", "*", "*"],
      ["List", "*", "*"],
      ["Queue", "*", "*"],
      ["Random", "*", "*"],
      ["RectangleVG", "*", "*"],
      ["RegExp", "*", "*"],
      ["Set", "*", "*"],
      ["Stack", "*", "*"],
      ["String", "*", "*"],
      ["TextFileReader", "*", "*"],
      ["TextFileWriter", "*", "*"],
      ["Turtle", "*", "*"],
      ["VectorGraphics", "*", "*"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr8", "vg.add(new ", expected);
  });

  test("Pass_EnumType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be Fruit.apple
end main

enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [["Fruit", "Fruit", "Fruit"]] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "Fr", expected);
  });

  test("Pass_enumValue", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be Fruit.apple
end main

enum Fruit apple, orange, pear`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["apple", "apple", "apple"],
      ["orange", "orange", "orange"],
      ["pear", "pear", "pear"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "expr5", "Fruit.", expected);
  });

  test("Pass_propProc", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main

end main

class Foo
  constructor()
  end constructor

  property bar1 as Int

  procedure bar2()
  end procedure

  procedure bb()
    call bar2()
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [
      ["bar1", "property.bar1", "property.bar1"],
      ["bar2", "bar2", "bar2"],
    ] as [string, string, string][];

    await assertAutocompletesWithString(fileImpl, "ident22", "ba", expected);
  });

  // pending fix for 'extractContextFromText'
  ignore_test("Pass_largeConstant", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {0,0}
main
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    const expected = [] as [string, string, string][];

    await assertAutocompletesWithString(
      fileImpl,
      "text3",
      "{{0.0,0.0,0.0,0.16,0.0,0.0,0.01},{0.85,0.04,-0.04,0.85,0.0,1.60,0.85},{0.20,-0.26,0.23,0.22,0.0,1.60,0.07},{-0.15,0.28,0.26,0.24,0.0,0.44,0.07}}",
      expected,
    );
  });
});
