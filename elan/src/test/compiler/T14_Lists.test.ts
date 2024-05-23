import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T14_Lists", () => {
  test("Pass_literalList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [4,5,6,7,8]
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([4, 5, 6, 7, 8]);
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ImmutableList [4, 5, 6, 7, 8]");
  });

  test("Pass_literalListofList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [[4, 5], [6, 7, 8]]
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([system.list([4, 5]), system.list([6, 7, 8])]);
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "ImmutableList [ImmutableList [4, 5], ImmutableList [6, 7, 8]]",
    );
  });

  test("Pass_literalListOfClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to new Foo()
  var b set to [a]
  print b
end main

class Foo
  constructor()
  end constructor

  function asString() return String
    return "foo"
  end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Foo());
  var b = system.list([a]);
  system.print(_stdlib.asString(b));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, []);};
  constructor() {

  }

  asString() {
    return "foo";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ImmutableList [foo]");
  });

  test("Pass_literalListOfValueId", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 1
  var b set to 1.1
  var c set to "c"
  var d set to "d"
  var e set to true
  var v set to [a]
  var w set to [b]
  var x set to [c]
  var y set to [d]
  var z set to [e]
  print v
  print w
  print x
  print y
  print z
end main

class Foo
  constructor()
  end constructor

  function asString() return String
    return "foo"
  end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = 1;
  var b = 1.1;
  var c = "c";
  var d = "d";
  var e = true;
  var v = system.list([a]);
  var w = system.list([b]);
  var x = system.list([c]);
  var y = system.list([d]);
  var z = system.list([e]);
  system.print(_stdlib.asString(v));
  system.print(_stdlib.asString(w));
  system.print(_stdlib.asString(x));
  system.print(_stdlib.asString(y));
  system.print(_stdlib.asString(z));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, []);};
  constructor() {

  }

  asString() {
    return "foo";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "ImmutableList [1]ImmutableList [1.1]ImmutableList [c]ImmutableList [d]ImmutableList [true]",
    );
  });

  test("Pass_literalListOfString", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to ["Foo", "Bar"]
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list(["Foo", "Bar"]);
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ImmutableList [Foo, Bar]");
  });

  test("Pass_literalListWithCoercion", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [4.1,5,6,7,8]
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([4.1, 5, 6, 7, 8]);
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ImmutableList [4.1, 5, 6, 7, 8]");
  });

  test("Pass_length", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var a set to [4,5,6,7,8]
    print a.length()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([4, 5, 6, 7, 8]);
  system.print(_stdlib.asString(_stdlib.length(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_emptyList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var a set to new ImmutableList<of Int>()
    print a.length()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.list(new Array()), ["Int"]);
  system.print(_stdlib.asString(_stdlib.length(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_index", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var a set to [4,5,6,7,8]
    print a[2]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([4, 5, 6, 7, 8]);
  system.print(_stdlib.asString(a[2]));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Pass_range", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [4,5,6,7,8]
  print a[2..]
  print a[1..3]
  print a[..2]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([4, 5, 6, 7, 8]);
  system.print(_stdlib.asString(system.list(a.slice(2))));
  system.print(_stdlib.asString(system.list(a.slice(1, 3))));
  system.print(_stdlib.asString(system.list(a.slice(0, 2))));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "ImmutableList [6, 7, 8]ImmutableList [5, 6]ImmutableList [4, 5]",
    );
  });

  test("Pass_addElementToList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [4,5,6,7,8]
  var b set to a + 9
  print a
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([4, 5, 6, 7, 8]);
  var b = system.concat(a, 9);
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "ImmutableList [4, 5, 6, 7, 8]ImmutableList [4, 5, 6, 7, 8, 9]",
    );
  });

  test("Pass_addListToElement", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [4,5,6,7,8]
  var b set to 9 + a
  print a
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([4, 5, 6, 7, 8]);
  var b = system.concat(9, a);
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "ImmutableList [4, 5, 6, 7, 8]ImmutableList [9, 4, 5, 6, 7, 8]",
    );
  });

  test("Pass_addListToListUsingPlus", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var a set to [4,5,6,7,8]
    var b set to [1,2,3]
    var c set to a + b
    print a
    print b
    print c
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.list([4, 5, 6, 7, 8]);
  var b = system.list([1, 2, 3]);
  var c = system.concat(a, b);
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
  system.print(_stdlib.asString(c));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "ImmutableList [4, 5, 6, 7, 8]ImmutableList [1, 2, 3]ImmutableList [4, 5, 6, 7, 8, 1, 2, 3]",
    );
  });

  test("Pass_constantLists", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to [4,5,6,7,8]
main
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = system.list([4, 5, 6, 7, 8]);

async function main() {
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ImmutableList [4, 5, 6, 7, 8]");
  });

  test("Pass_createEmptyListUsingConstructor", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to new ImmutableList<of Int>()
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(system.list(new Array()), ["Int"]);
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "empty ImmutableList");
  });

  test("Pass_Default", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  print f.it
end main
  
class Foo
  constructor()
  end constructor
  
  property it as ImmutableList<of Int>
  
  function asString() return String
    return "A Foo"
  end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.print(_stdlib.asString(f.it));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["it", "ImmutableList<of Int>"]]);};
  constructor() {

  }

  it = system.defaultList();

  asString() {
    return "A Foo";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "empty ImmutableList");
  });

  test("Fail_emptyLiteralList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to []
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_literalListInconsistentTypes1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [3, "apples"]
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_literalListInconsistentTypes2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [3, 3.1]
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  test("Fail_OutOfRange", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to [4, 5, 6, 7, 8]
  var b set to a[5]
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Failed");
  });
});
