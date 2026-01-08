import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
    assertDoesNotCompile,
    assertDoesNotParse,
    assertObjectCodeDoesNotExecute,
    assertObjectCodeExecutes,
    assertObjectCodeIs,
    assertParses,
    assertStatusIsValid,
    testHash,
    testHeader,
    transforms,
} from "./compiler-test-helpers";

suite("ListImmutable", () => {
  test("Pass_literalListImmutable", async () => {
    const code = `${testHeader}

main
  variable a set to {4,5,6,7,8}
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]);
  await system.print(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 5, 6, 7, 8}");
  });

  test("Pass_literalListImmutableofListImmutable", async () => {
    const code = `${testHeader}

main
  variable a set to {{4, 5}, {6, 7, 8}}
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([system.listImmutable([4, 5]), system.listImmutable([6, 7, 8])]);
  await system.print(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{{4, 5}, {6, 7, 8}}");
  });

  test("Pass_literalListImmutableOfRecord", async () => {
    const code = `${testHeader}

main
  variable a set to new Foo()
  variable b set to {a}
  print b
end main

record Foo

end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new Foo()._initialise());
  let b = system.listImmutable([a]);
  await system.print(b);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  async _initialise() { return this; }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a Foo}");
  });

  test("Pass_lImmutableOfValueId", async () => {
    const code = `${testHeader}

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
  let v = system.listImmutable([a]);
  let w = system.listImmutable([b]);
  let x = system.listImmutable([c]);
  let y = system.listImmutable([d]);
  let z = system.listImmutable([e]);
  await system.print(v);
  await system.print(w);
  await system.print(x);
  await system.print(y);
  await system.print(z);
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1}{1.1}{c}{d}{true}");
  });

  test("Pass_literalListImmutableOfString", async () => {
    const code = `${testHeader}

main
  variable a set to {"Foo", "Bar"}
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable(["Foo", "Bar"]);
  await system.print(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{Foo, Bar}");
  });

  test("Pass_literalListImmutableWithCoercion", async () => {
    const code = `${testHeader}

main
  variable a set to {4.1,5,6,7,8}
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4.1, 5, 6, 7, 8]);
  await system.print(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4.1, 5, 6, 7, 8}");
  });

  test("Pass_length", async () => {
    const code = `${testHeader}

main
    variable a set to {4,5,6,7,8}
    print a.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]);
  await system.print(a.length());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_emptyListImmutable", async () => {
    const code = `${testHeader}

main
    variable a set to new ListImmutable<of Int>()
    print a.length()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.ListImmutable()._initialise());
  await system.print(a.length());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_index", async () => {
    const code = `${testHeader}

main
    variable a set to {4,5,6,7,8}
    print a[2]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]);
  await system.print(system.safeIndex(a, 2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Pass_withPut", async () => {
    const code = `${testHeader}

main
    variable a set to {"one", "two", "three"}
    set a to a.withPut(1, "TWO")
    variable b set to a.withPut(0, "ONE")
    print a
    print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable(["one", "two", "three"]);
  a = a.withPut(1, "TWO");
  let b = a.withPut(0, "ONE");
  await system.print(a);
  await system.print(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, TWO, three}{ONE, TWO, three}");
  });

  test("Fail_withPutOutOfRange", async () => {
    const code = `${testHeader}

main
    variable a set to {"one", "two", "three"}
    variable b set to a.withPut(3, "THREE")
    print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable(["one", "two", "three"]);
  let b = a.withPut(3, "THREE");
  await system.print(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 3 size: 3");
  });

  test("Pass_withInsert", async () => {
    const code = `${testHeader}

main
    variable a set to {"one", "two", "three"}
    set a to a.withInsert(1, "TWO")
    variable b set to a.withInsert(0, "ONE")
    print a
    print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable(["one", "two", "three"]);
  a = a.withInsert(1, "TWO");
  let b = a.withInsert(0, "ONE");
  await system.print(a);
  await system.print(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, TWO, two, three}{ONE, one, TWO, two, three}");
  });

  test("Pass_withRemoveAt", async () => {
    const code = `${testHeader}

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
  let a = system.listImmutable(["one", "two", "three"]);
  a = a.withRemoveAt(1);
  let b = a.withRemoveAt(0);
  await system.print(a);
  await system.print(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, three}{three}");
  });

  test("Pass_withRemoveFirst", async () => {
    const code = `${testHeader}

main
    variable a set to {"one", "two", "three", "one", "two", "three"}
    set a to a.withRemoveFirst("two")
    print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable(["one", "two", "three", "one", "two", "three"]);
  a = a.withRemoveFirst("two");
  await system.print(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, three, one, two, three}");
  });

  test("Pass_withRemoveAll", async () => {
    const code = `${testHeader}

main
    variable a set to {"one", "two", "three", "one", "two", "three"}
    set a to a.withRemoveAll("two")
    print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable(["one", "two", "three", "one", "two", "three"]);
  a = a.withRemoveAll("two");
  await system.print(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, three, one, three}");
  });

  test("Pass_Range", async () => {
    const code = `${testHeader}

main
  variable a set to {4,5,6,7,8}
  print a[2..5]
  print a[1..3]
  print a[0..2]
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]);
  await system.print(system.safeSlice(a, 2, 5));
  await system.print(system.safeSlice(a, 1, 3));
  await system.print(system.safeSlice(a, 0, 2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{6, 7, 8}{5, 6}{4, 5}");
  });

  test("Pass_addElementToListImmutable", async () => {
    const code = `${testHeader}

main
  variable a set to {4,5,6,7,8}
  variable b set to a.withAppend(9)
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]);
  let b = a.withAppend(9);
  await system.print(a);
  await system.print(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 5, 6, 7, 8}{4, 5, 6, 7, 8, 9}");
  });

  test("Fail_addElementToListImmutableWithPlus", async () => {
    const code = `${testHeader}

main
  variable a set to {4,5,6,7,8}
  variable b set to a + 9
  print a
  print b
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: ListImmutable<of Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_addListToElement", async () => {
    const code = `${testHeader}

main
  variable a set to {4,5,6,7,8}
  variable b set to 9 + a
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]);
  let b = system.concat(9, a);
  await system.print(a);
  await system.print(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: ListImmutable<of Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_addListToListUsingPlus", async () => {
    const code = `${testHeader}

main
    variable a set to {4,5,6,7,8}
    variable b set to {1,2,3}
    variable c set to a + b
    print a
    print b
    print c
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: ListImmutable<of Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_addListToListUsingPlus1", async () => {
    const code = `${testHeader}

main
    variable a set to {"a", "b"}
    variable b set to "cd"
    variable c set to a + b[0]
    print a
    print b
    print c
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Float or Int, Provided: ListImmutable<of String>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Pass_constantLists", async () => {
    const code = `${testHeader}

constant a set to {4,5,6,7,8}
main
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {
  a = system.listImmutable([4, 5, 6, 7, 8]);

};
async function main() {
  await system.print(global.a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 5, 6, 7, 8}");
  });

  test("Pass_createEmptyListUsingConstructor", async () => {
    const code = `${testHeader}

main
  variable a set to new ListImmutable<of Int>()
  print a
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(await new _stdlib.ListImmutable()._initialise());
  await system.print(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{}");
  });

  test("Pass_Default", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print f.it
end main
  
class Foo
  constructor()
  end constructor
  
  property it as ListImmutable<of Int>
  
  function asString() returns String
    return "A Foo"
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await system.print(f.it);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["it", system.initialise(_stdlib.ListImmutable.emptyInstance())]]);};

  async _initialise() {

    return this;
  }

  it = system.initialise(_stdlib.ListImmutable.emptyInstance());

  async asString() {
    return "A Foo";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{}");
  });

  test("Pass_EmptyListImmutable", async () => {
    const code = `${testHeader}

main
  variable a set to empty ListImmutable<of Int>
  variable b set to empty ListImmutable<of Int>
  set b to a.withAppend(3)
  print a
  print b
  print a is b
  print a is empty ListImmutable<of Int>
  print b is empty ListImmutable<of Int>
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.initialise(_stdlib.ListImmutable.emptyInstance());
  let b = system.initialise(_stdlib.ListImmutable.emptyInstance());
  b = a.withAppend(3);
  await system.print(a);
  await system.print(b);
  await system.print(system.objectEquals(a, b));
  await system.print(system.objectEquals(a, system.initialise(_stdlib.ListImmutable.emptyInstance())));
  await system.print(system.objectEquals(b, system.initialise(_stdlib.ListImmutable.emptyInstance())));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{}{3}falsetruefalse");
  });

  test("Pass_addListToList", async () => {
    const code = `${testHeader}

main
  variable a set to {4,5,6,7,8}
  variable b set to {1,2,3,4,5}
  variable c set to a.withAppendList(b)
  print a
  print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]);
  let b = system.listImmutable([1, 2, 3, 4, 5]);
  let c = a.withAppendList(b);
  await system.print(a);
  await system.print(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 5, 6, 7, 8}{4, 5, 6, 7, 8, 1, 2, 3, 4, 5}");
  });

  test("Pass_head", async () => {
    const code = `${testHeader}

main
    variable a set to {"one", "two", "three"}
    variable b set to ""
    set b to a.head()
    print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable(["one", "two", "three"]);
  let b = "";
  b = a.head();
  await system.print(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "one");
  });

  test("Pass_tail", async () => {
    const code = `${testHeader}

main
    variable a set to {"one", "two", "three"}
    variable b set to {""}
    set b to a.tail()
    print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable(["one", "two", "three"]);
  let b = system.listImmutable([""]);
  b = a.tail();
  await system.print(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{two, three}");
  });

  test("Pass_prependElementToList", async () => {
    const code = `${testHeader}

main
  variable a set to {4,5,6,7,8}
  variable b set to a.withPrepend(9)
  print a
  print b
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]);
  let b = a.withPrepend(9);
  await system.print(a);
  await system.print(b);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 5, 6, 7, 8}{9, 4, 5, 6, 7, 8}");
  });

  test("Pass_prependListToList", async () => {
    const code = `${testHeader}

main
  variable a set to {4,5,6,7,8}
  variable b set to {1,2,3,4,5}
  variable c set to a.withPrependList(b)
  print a
  print c
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([4, 5, 6, 7, 8]);
  let b = system.listImmutable([1, 2, 3, 4, 5]);
  let c = a.withPrependList(b);
  await system.print(a);
  await system.print(c);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{4, 5, 6, 7, 8}{1, 2, 3, 4, 5, 4, 5, 6, 7, 8}");
  });

  test("Pass_IndexFromHof", async () => {
    const code = `${testHeader}

main
  variable a set to {new Point()}
  variable b set to a.map(lambda p as Point => p)
  print b[0]
end main

record Point
end record
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([system.initialise(await new Point()._initialise())]);
  let b = (await a.map(async (p) => p));
  await system.print(system.safeIndex(b, 0));
}

class Point {
  static emptyInstance() { return system.emptyClass(Point, []);};
  async _initialise() { return this; }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Point");
  });

  test("Pass_ReturnTypeFromHof", async () => {
    const code = `${testHeader}

main
  print ff({"s"})
end main

function ff(ll as ListImmutable<of String>) returns ListImmutable<of Point>
  return ll.map(lambda l as String => new Point())
end function

record Point
end record`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.print((await global.ff(system.listImmutable(["s"]))));
}

async function ff(ll) {
  return (await ll.map(async (l) => system.initialise(await new Point()._initialise())));
}
global["ff"] = ff;

class Point {
  static emptyInstance() { return system.emptyClass(Point, []);};
  async _initialise() { return this; }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{a Point}");
  });

  test("Fail_emptyLiteralListImmutable", async () => {
    const code = `${testHeader}

main
  variable a set to []
end main
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_literalListImmutableInconsistentTypes1", async () => {
    const code = `${testHeader}

main
  variable a set to {3, "apples"}
end main
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: String.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_literalListImmutableInconsistentTypes2", async () => {
    const code = `${testHeader}

main
  variable a set to {3, 3.1}
end main
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: Int, Provided: Float.LangRef.html#TypesCompileError",
    ]);
  });

  test("Fail_OutOfRange", async () => {
    const code = `${testHeader}

main
  variable a set to {4, 5, 6, 7, 8}
  variable b set to a[5]
end main
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range index: 5 size: 5");
  });

  test("Fail_CannotPutAt", async () => {
    const code = `${testHeader}

main
  variable a set to {4, 5, 6, 7, 8}
  call a.put(0, 0)
end main
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

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'put' is not defined for type 'ListImmutable'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_CannotSetIndex", async () => {
    const code = `${testHeader}

main
  variable a set to {4, 5, 6, 7, 8}
  set a[0] to 0
end main
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

    assertDoesNotParse(fileImpl);
  });

  test("Fail_put", async () => {
    const code = `${testHeader}

main
  variable a set to {"one", "two", "three"}
  set a to a.put(1, "TWO")
  print a
end main
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'put' is not defined for type 'ListImmutable'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_add", async () => {
    const code = `${testHeader}

main
  variable a set to {"one", "two", "three"}
  call a.append("four")
  print a
end main
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'append' is not defined for type 'ListImmutable'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_insert", async () => {
    const code = `${testHeader}

main
  variable a set to {"one", "two", "three"}
  call a.insert(1, "four")
  print a
end main
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'insert' is not defined for type 'ListImmutable'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_removeAt", async () => {
    const code = `${testHeader}

main
  variable a set to {"one", "two", "three"}
  call a.removeAt(1)
  print a
end main
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'removeAt' is not defined for type 'ListImmutable'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_removeFirst", async () => {
    const code = `${testHeader}

main
  variable a set to {"one", "two", "three", "one", "two", "three"}
  call a.removeFirst("two")
  print a
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'removeFirst' is not defined for type 'ListImmutable'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_removeAll", async () => {
    const code = `${testHeader}

main
  variable a set to {"one", "two", "three", "one", "two", "three"}
  call a.removeAll("two")
  print a
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'removeAll' is not defined for type 'ListImmutable'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_withoutGenericType", async () => {
    const code = `${testHeader}

main
    variable a set to new ListImmutable()
    print a
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expected: '<of Type>'.LangRef.html#GenericParametersCompileError",
    ]);
  });

  test("Fail_typeErrorMessage", async () => {
    const code = `${testHeader}

main
    variable a set to empty List<of Int>
    variable b set to empty ListImmutable<of Int>
    set b to a
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types. Expected: ListImmutable<of Int> try converting with '.asListImmutable()', Provided: List<of Int>.LangRef.html#TypesCompileError",
    ]);
  });

  test("Pass_listOfListOfFloats", async () => {
    const code = `${testHeader}

main
  variable a set to {{0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01}, {0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85}, {0.20, -0.26, 0.23, 0.22, 0.0, 1.60, 0.07}, {-0.15, 0.28, 0.26, 0.24, 0.0, 0.44, 0.07}}
  print a
end main
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let a = system.listImmutable([system.listImmutable([0, 0, 0, 0.16, 0, 0, 0.01]), system.listImmutable([0.85, 0.04, (-0.04), 0.85, 0, 1.6, 0.85]), system.listImmutable([0.2, (-0.26), 0.23, 0.22, 0, 1.6, 0.07]), system.listImmutable([(-0.15), 0.28, 0.26, 0.24, 0, 0.44, 0.07])]);
  await system.print(a);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "{{0, 0, 0, 0.16, 0, 0, 0.01}, {0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.85}, {0.2, -0.26, 0.23, 0.22, 0, 1.6, 0.07}, {-0.15, 0.28, 0.26, 0.24, 0, 0.44, 0.07}}",
    );
  });

  test("Pass_Conversions", async () => {
    const code = `${testHeader}

main
  let a be {"one", "two", "three"}
  let b be a.asArray()
  let c be a.asList()
  let d be a.asSet()
  variable aa set to empty ListImmutable<of String>
  variable bb set to empty Array<of String>
  variable cc set to empty List<of String>
  variable dd set to empty Set<of String>
  set aa to a
  set bb to b
  set cc to c
  set dd to d
  print aa
  print bb
  print cc
  print dd
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const a = system.listImmutable(["one", "two", "three"]);
  const b = a.asArray();
  const c = a.asList();
  const d = a.asSet();
  let aa = system.initialise(_stdlib.ListImmutable.emptyInstance());
  let bb = system.initialise(_stdlib.Array.emptyInstance());
  let cc = system.initialise(_stdlib.List.emptyInstance());
  let dd = system.initialise(_stdlib.Set.emptyInstance());
  aa = a;
  bb = b;
  cc = c;
  dd = d;
  await system.print(aa);
  await system.print(bb);
  await system.print(cc);
  await system.print(dd);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "{one, two, three}[one, two, three][one, two, three]{one, two, three}",
    );
  });

  test("Fail_ListOfMutableClass", async () => {
    const code = `${testHeader}

main
    variable a set to empty ListImmutable<of Foo>
end main

class Foo
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'Foo'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ListImmutableOfList", async () => {
    const code = `${testHeader}

main
  variable a set to empty ListImmutable<of List<of Int>>
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ListOfDictionary", async () => {
    const code = `${testHeader}

main
  variable a set to empty ListImmutable<of Dictionary<of Int, Int>>
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'Dictionary<of Int, Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ListImmutableOfMutableClass", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable a set to {f}
end main

class Foo
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'Foo'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralListImmutableOfList", async () => {
    const code = `${testHeader}

main
  variable f set to empty List<of Int>
  variable a set to {f}
end main

class Foo
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralListImmutableOfDictionary", async () => {
    const code = `${testHeader}

main
  variable f set to ["a":1]
  variable a set to {f}
end main

class Foo
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'Dictionary<of String, Int>'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_LiteralListImmutableOfEmptyUnknownClass", async () => {
    const code = `${testHeader}

main
  variable f set to {empty Foo}
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Foo' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_EmptyGenericType", async () => {
    const code = `${testHeader}

main
  variable f set to empty ListImmutable
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

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expected: '<of Type>'.LangRef.html#GenericParametersCompileError",
    ]);
  });
});
