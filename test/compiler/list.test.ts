import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
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

suite("List", () => {
  test("Pass_literalList", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {4,5,6,7,8}
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 5, 6, 7, 8}");
  });

  test("Pass_literalListofList", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {{4, 5}, {6, 7, 8}}
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([4, 5]), system.list([6, 7, 8])]);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{{4, 5}, {6, 7, 8}}");
  });

  test("Pass_literalListOfClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new Foo()
  variable b set to {a}
  print b
end main

class Foo
  constructor()
  end constructor

  function asString() returns String
    return "foo"
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new Foo()._initialise());
  let b = system.list([a]);
  await system.printLine(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async asString() {
    return "foo";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{foo}");
  });

  test("Pass_literalListOfValueId", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 1
  variable b set to 1.1
  variable c set to "c"
  variable d set to "d"
  variable e set to true
  variable v set to {a}
  variable w set to {b}
  variable x set to {c}
  variable y set to {d}
  variable z set to {e}
  print v
  print w
  print x
  print y
  print z
end main

class Foo
  constructor()
  end constructor

  function asString() returns String
    return "foo"
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = 1;
  let b = 1.1;
  let c = "c";
  let d = "d";
  let e = _stdlib.true;
  let v = system.list([a]);
  let w = system.list([b]);
  let x = system.list([c]);
  let y = system.list([d]);
  let z = system.list([e]);
  await system.printLine(v);
  await system.printLine(w);
  await system.printLine(x);
  await system.printLine(y);
  await system.printLine(z);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async asString() {
    return "foo";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1}{1.1}{c}{d}{true}");
  });

  test("Pass_literalListOfString", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"Foo", "Bar"}
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["Foo", "Bar"]);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{Foo, Bar}");
  });

  test("Pass_literalListWithCoercion", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {4.1,5,6,7,8}
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4.1, 5, 6, 7, 8]);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4.1, 5, 6, 7, 8}");
  });

  test("Pass_length", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to {4,5,6,7,8}
    print a.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  await system.printLine(_stdlib.length(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_emptyList", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to new List<of Int>()
    print a.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(system.list(new Array()));
  await system.printLine(_stdlib.length(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_index", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to {4,5,6,7,8}
    print a[2]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  await system.printLine(system.safeIndex(a, 2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Pass_put", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to {"one", "two", "three"}
    set a to a.withPutAt(1, "TWO")
    variable b set to a.withPutAt(0, "ONE")
    print a
    print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  a = _stdlib.withPutAt(a, 1, "TWO");
  let b = _stdlib.withPutAt(a, 0, "ONE");
  await system.printLine(a);
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, TWO, three}{ONE, TWO, three}");
  });

  test("Pass_withInsertAt", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to {"one", "two", "three"}
    set a to a.withInsertAt(1, "TWO")
    variable b set to a.withInsertAt(0, "ONE")
    print a
    print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  a = _stdlib.withInsertAt(a, 1, "TWO");
  let b = _stdlib.withInsertAt(a, 0, "ONE");
  await system.printLine(a);
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, TWO, two, three}{ONE, one, TWO, two, three}");
  });

  test("Pass_withRemove", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to {"one", "two", "three"}
    set a to a.withRemoveAt(1)
    variable b set to a.withRemoveAt(0)
    print a
    print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three"]);
  a = _stdlib.withRemoveAt(a, 1);
  let b = _stdlib.withRemoveAt(a, 0);
  await system.printLine(a);
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, three}{three}");
  });

  test("Pass_withRemoveFirst", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to {"one", "two", "three", "one", "two", "three"}
    set a to a.withRemoveFirst("two")
    print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three", "one", "two", "three"]);
  a = _stdlib.withRemoveFirst(a, "two");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, three, one, two, three}");
  });

  test("Pass_withRemoveAll", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to {"one", "two", "three", "one", "two", "three"}
    set a to a.withRemoveAll("two")
    print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["one", "two", "three", "one", "two", "three"]);
  a = _stdlib.withRemoveAll(a, "two");
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, three, one, three}");
  });

  test("Pass_Range", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {4,5,6,7,8}
  print a[2..5]
  print a[1..3]
  print a[0..2]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  await system.printLine(system.list(system.safeSlice(a, 2, 5)));
  await system.printLine(system.list(system.safeSlice(a, 1, 3)));
  await system.printLine(system.list(system.safeSlice(a, 0, 2)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{6, 7, 8}{5, 6}{4, 5}");
  });

  test("Pass_addElementToList", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {4,5,6,7,8}
  variable b set to a + 9
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  let b = system.concat(a, 9);
  await system.printLine(a);
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 5, 6, 7, 8}{4, 5, 6, 7, 8, 9}");
  });

  test("Pass_addListToElement", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {4,5,6,7,8}
  variable b set to 9 + a
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  let b = system.concat(9, a);
  await system.printLine(a);
  await system.printLine(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 5, 6, 7, 8}{9, 4, 5, 6, 7, 8}");
  });

  test("Pass_addListToListUsingPlus", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to {4,5,6,7,8}
    variable b set to {1,2,3}
    variable c set to a + b
    print a
    print b
    print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([4, 5, 6, 7, 8]);
  let b = system.list([1, 2, 3]);
  let c = system.concat(a, b);
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 5, 6, 7, 8}{1, 2, 3}{4, 5, 6, 7, 8, 1, 2, 3}");
  });

  test("Pass_addListToListUsingPlus1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to {"a", "b"}
    variable b set to "cd"
    variable c set to a + b[0]
    print a
    print b
    print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list(["a", "b"]);
  let b = "cd";
  let c = system.concat(a, system.safeIndex(b, 0));
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a, b}cd{a, b, c}");
  });

  test("Pass_constantLists", async () => {
    const code = `# FFFF Elan v1.0.0 valid

constant a set to {4,5,6,7,8}
main
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.list([4, 5, 6, 7, 8]);

};
async function main() {
  await system.printLine(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 5, 6, 7, 8}");
  });

  test("Pass_createEmptyListUsingConstructor", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to new List<of Int>()
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(system.list(new Array()));
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{}");
  });

  test("Pass_Default", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  print f.it
end main
  
class Foo
  constructor()
  end constructor
  
  property it as List<of Int>
  
  function asString() returns String
    return "A Foo"
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await system.printLine(f.it);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["it", system.emptyImmutableList()]]);};

  async _initialise() {

    return this;
  }

  it = system.emptyImmutableList();

  async asString() {
    return "A Foo";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{}");
  });

  test("Pass_EmptyImmutableList", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to empty List<of Int>
  variable b set to empty List<of Int>
  set b to a + 3
  print a
  print b
  print a is b
  print a is empty List<of Int>
  print b is empty List<of Int>
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.emptyImmutableList();
  let b = system.emptyImmutableList();
  b = system.concat(a, 3);
  await system.printLine(a);
  await system.printLine(b);
  await system.printLine(system.objectEquals(a, b));
  await system.printLine(system.objectEquals(a, system.emptyImmutableList()));
  await system.printLine(system.objectEquals(b, system.emptyImmutableList()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{}{3}falsetruefalse");
  });

  test("Fail_emptyLiteralList", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to []
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_literalListInconsistentTypes1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {3, "apples"}
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types. Expected: Int Provided: String"]);
  });

  test("Fail_literalListInconsistentTypes2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {3, 3.1}
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types. Expected: Int Provided: Float"]);
  });

  test("Fail_OutOfRange", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {4, 5, 6, 7, 8}
  variable b set to a[5]
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 5 size: 5");
  });

  test("Fail_CannotPutAt", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {4, 5, 6, 7, 8}
  call a.putAt(0, 0)
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of Int> Provided: List<of Int>",
    ]);
  });

  test("Fail_CannotSetIndex", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {4, 5, 6, 7, 8}
  set a[0] to 0
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_putAtKey", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"one", "two", "three"}
  set a to a.withPutAtKey(1, "TWO")
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: List<of String> Provided: DictionaryImmutable<of String, String>",
    ]);
  });

  test("Fail_add", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"one", "two", "three"}
  call a.append("four")
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of String> Provided: List<of String>",
    ]);
  });

  test("Fail_insertAt", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"one", "two", "three"}
  call a.insertAt(1, "four")
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of String> Provided: List<of String>",
    ]);
  });

  test("Fail_removeAt", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"one", "two", "three"}
  call a.removeAt(1)
  print a
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of String> Provided: List<of String>",
    ]);
  });

  test("Fail_removeFirst", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"one", "two", "three", "one", "two", "three"}
  call a.removeFirst("two")
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of String> Provided: List<of String>",
    ]);
  });

  test("Fail_removeAll", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {"one", "two", "three", "one", "two", "three"}
  call a.removeAll("two")
  print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Array<of String> Provided: List<of String>",
    ]);
  });

  test("Fail_withoutGenericType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to new List()
    print a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["<of Type(s)> Expected: 1 Provided: 0"]);
  });

  test("Fail_typeErrorMessage", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
    variable a set to empty Array<of Int>
    variable b set to empty List<of Int>
    set b to a
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: List<of Int> try converting with '.asList()' Provided: Array<of Int>",
    ]);
  });
  test("Pass_listOfListOfFloats", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to {{0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01}, {0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85}, {0.20, -0.26, 0.23, 0.22, 0.0, 1.60, 0.07}, {-0.15, 0.28, 0.26, 0.24, 0.0, 0.44, 0.07}}
  print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.list([system.list([0, 0, 0, 0.16, 0, 0, 0.01]), system.list([0.85, 0.04, (-0.04), 0.85, 0, 1.6, 0.85]), system.list([0.2, (-0.26), 0.23, 0.22, 0, 1.6, 0.07]), system.list([(-0.15), 0.28, 0.26, 0.24, 0, 0.44, 0.07])]);
  await system.printLine(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "{{0, 0, 0, 0.16, 0, 0, 0.01}, {0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.85}, {0.2, -0.26, 0.23, 0.22, 0, 1.6, 0.07}, {-0.15, 0.28, 0.26, 0.24, 0, 0.44, 0.07}}",
    );
  });
});
