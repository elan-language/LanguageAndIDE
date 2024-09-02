import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T26_Iter", () => {
  test("Pass_List", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var it set to {1.0, 5, 6}
  call printEach(it)
end main
  
procedure printEach(target as Iter<of Float>)
  each x in target
    print x
  end each
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var it = system.immutableList([1, 5, 6]);
  await printEach(it);
}

async function printEach(target) {
  for (const x of target) {
    system.printLine(_stdlib.asString(x));
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "156");
  });

  test("Pass_ListToFunction", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var it set to {"one", "two"}
  print printEach(it)
end main
  
function printEach(target as Iter<of String>) return Iter<of String>
  return target
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var it = system.immutableList(["one", "two"]);
  system.printLine(_stdlib.asString(printEach(it)));
}

function printEach(target) {
  return target;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, two}");
  });

  test("Pass_IterAssignToList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var lst set to {"one", "two"}
  var it set to printEach(lst)
  set lst to it.asImmutableList()
  print lst
end main

function printEach(target as Iter<of String>) return Iter<of String>
  return target
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var lst = system.immutableList(["one", "two"]);
  var it = printEach(lst);
  lst = _stdlib.asImmutableList(it);
  system.printLine(_stdlib.asString(lst));
}

function printEach(target) {
  return target;
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{one, two}");
  });

  test("Pass_Array", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var arr set to [1, 3, 6]
  call printEach(arr)
end main
  
procedure printEach(target as Iter<of Float>)
  each x in target
    print x
  end each
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var arr = system.literalArray([1, 3, 6]);
  await printEach(arr);
}

async function printEach(target) {
  for (const x of target) {
    system.printLine(_stdlib.asString(x));
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "136");
  });

  test("Pass_String", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var s set to "Foo"
  call printEach(s)
end main
  
procedure printEach(target as Iter<of String>)
  each x in target
    print x
  end each
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var s = "Foo";
  await printEach(s);
}

async function printEach(target) {
  for (const x of target) {
    system.printLine(_stdlib.asString(x));
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Foo");
  });

  test("Pass_Printing", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var it set to {1.0, 2, 3, 4, 5, 6, 7}
  call printAsIter(it)
  call printasImmutableList(it)
end main
  
procedure printAsIter(target as Iter<of Float>)
  print target
end procedure
  
procedure printasImmutableList(target as Iter<of Float>)
  var some set to target.asImmutableList()
  print some.getRange(3, 7)
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var it = system.immutableList([1, 2, 3, 4, 5, 6, 7]);
  await printAsIter(it);
  await printasImmutableList(it);
}

async function printAsIter(target) {
  system.printLine(_stdlib.asString(target));
}

async function printasImmutableList(target) {
  var some = _stdlib.asImmutableList(target);
  system.printLine(_stdlib.asString(_stdlib.getRange(some, 3, 7)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "{1, 2, 3, 4, 5, 6, 7}{4, 5, 6, 7}",
    );
  });

  test("Pass_Default", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var f set to new Foo()
  print f.it
end main
  
class Foo
  constructor()
  end constructor
  
  property it as Iter<of Int>
  
  function asString() return String
    return "A Foo"
  end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.printLine(_stdlib.asString(f.it));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["it", system.emptyIter()]]);};
  constructor() {

  }

  it = system.emptyIter();

  asString() {
    return "A Foo";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "an Iterable");
  });

  test("Pass_EmptyIter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var foo set to new Foo()
  var foo1 set to new Foo()
  call foo.update()
  print foo.i
  print foo1.i
  print foo.i is foo1.i
  print foo.i is empty Iter<of Int>
  print foo1.i is empty Iter<of Int>
end main

class Foo
  constructor()

  end constructor

  property i as Iter<of Int>

  procedure update()
    set property.i to {1}
  end procedure
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var foo = system.initialise(new Foo());
  var foo1 = system.initialise(new Foo());
  await foo.update();
  system.printLine(_stdlib.asString(foo.i));
  system.printLine(_stdlib.asString(foo1.i));
  system.printLine(_stdlib.asString(system.objectEquals(foo.i, foo1.i)));
  system.printLine(_stdlib.asString(system.objectEquals(foo.i, system.emptyIter())));
  system.printLine(_stdlib.asString(system.objectEquals(foo1.i, system.emptyIter())));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["i", system.emptyIter()]]);};
  constructor() {

  }

  i = system.emptyIter();

  async update() {
    this.i = system.immutableList([1]);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1}an Iterablefalsefalsetrue");
  });

  test("Fail_NoGenericType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main

end main

procedure printEach(target as Iter)
  each x in target
    print x
  end each
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Generic parameters expected: 1 got: 0"]);
  });

  test("Fail_PassArgumentWithWrongGenericType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var it set to {1,2,3,4,5,6,7}
  call printEach(it)
end main

procedure printEach(target as Iter<of String>)
  each x in target
    print x
  end each
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_Indexing1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var it set to {1,2,3,4,5,6,7}
  call printEach(it)
end main

procedure printEach(target as Iter<of Int>)
  print target[0]
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot index Iter<of Int>"]);
  });

  test("Fail_Indexing2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 1 valid

main
  var it set to {1,2,3,4,5,6,7}
  call printEach(it)
end main

procedure printEach(target as Iter<of Int>)
  print target[2..4]
end procedure`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot range Iter<of Int>"]);
  });
});
