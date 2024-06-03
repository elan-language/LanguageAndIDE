import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T26_Iter", () => {
  test("Pass_List", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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
  var it = system.list([1, 5, 6]);
  printEach(it);
}

function printEach(target) {
  for (const x of target) {
    system.print(_stdlib.asString(x));
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
    await assertObjectCodeExecutes(fileImpl, "156");
  });

  test("Pass_ListToFunction", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var it set to {"one", "two"}
  print printEach(it)
end main
  
function printEach(target as Iter<of String>) return Iter<of String>
  return target
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var it = system.list(["one", "two"]);
  system.print(_stdlib.asString(printEach(it)));
}

function printEach(target) {
  return target;
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
    await assertObjectCodeExecutes(fileImpl, "ImmutableList {one, two}");
  });

  test("Pass_IterAssignToList", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var lst set to {"one", "two"}
  var it set to printEach(lst)
  set lst to it.asList()
  print lst
end main

function printEach(target as Iter<of String>) return Iter<of String>
  return target
end function`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var lst = system.list(["one", "two"]);
  var it = printEach(lst);
  lst = _stdlib.asList(it);
  system.print(_stdlib.asString(lst));
}

function printEach(target) {
  return target;
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
    await assertObjectCodeExecutes(fileImpl, "ImmutableList {one, two}");
  });

  test("Pass_Array", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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
  printEach(arr);
}

function printEach(target) {
  for (const x of target) {
    system.print(_stdlib.asString(x));
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
    await assertObjectCodeExecutes(fileImpl, "136");
  });

  test("Pass_String", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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
  printEach(s);
}

function printEach(target) {
  for (const x of target) {
    system.print(_stdlib.asString(x));
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
    await assertObjectCodeExecutes(fileImpl, "Foo");
  });

  test("Pass_Printing", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var it set to {1.0, 2, 3, 4, 5, 6, 7}
  call printAsIter(it)
  call printAsList(it)
end main
  
procedure printAsIter(target as Iter<of Float>)
  print target
end procedure
  
procedure printAsList(target as Iter<of Float>)
  var some set to target.asList()
  print some[3..]
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var it = system.list([1, 2, 3, 4, 5, 6, 7]);
  printAsIter(it);
  printAsList(it);
}

function printAsIter(target) {
  system.print(_stdlib.asString(target));
}

function printAsList(target) {
  var some = _stdlib.asList(target);
  system.print(_stdlib.asString(system.list(some.slice(3))));
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
      "ImmutableList {1, 2, 3, 4, 5, 6, 7}ImmutableList {4, 5, 6, 7}",
    );
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
  
  property it as Iter<of Int>
  
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
  static defaultInstance() { return system.defaultClass(Foo, [["it", "Iter<of Int>"]]);};
  constructor() {

  }

  it = system.emptyIter();

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
    await assertObjectCodeExecutes(fileImpl, "empty Iter");
  });

  test("Pass_EmptyIter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var foo set to new Foo()
  var foo1 set to new Foo()
  call foo.update()
  print foo.i
  print foo1.i
  print foo.i is foo1.i
  print foo.i is default Iter<of Int>
  print foo1.i is default Iter<of Int>
end main

class Foo
  constructor()

  end constructor

  property i as Iter<of Int>

  procedure update()
    set i to {1}
  end procedure
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var foo = system.initialise(new Foo());
  var foo1 = system.initialise(new Foo());
  foo.update();
  system.print(_stdlib.asString(foo.i));
  system.print(_stdlib.asString(foo1.i));
  system.print(_stdlib.asString(system.objectEquals(foo.i, foo1.i)));
  system.print(_stdlib.asString(system.objectEquals(foo.i, system.emptyIter())));
  system.print(_stdlib.asString(system.objectEquals(foo1.i, system.emptyIter())));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["i", "Iter<of Int>"]]);};
  constructor() {

  }

  i = system.emptyIter();

  update() {
    this.i = system.list([1]);
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
    await assertObjectCodeExecutes(fileImpl, "ImmutableList {1}empty Iterfalsefalsetrue");
  });

  // TODO fails
});
