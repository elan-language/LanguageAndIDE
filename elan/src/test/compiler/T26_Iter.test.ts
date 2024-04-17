import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T26_Iter', () => {

  test('Pass_List', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var it set to [1, 5, 6]
  call printEach(it)
end main
  
procedure printEach(target as Iter<of Int>)
  each x in target
    print x
  end each
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var it = system.list([1, 5, 6]);
  printEach(it);
}

function printEach(target) {
  for (const x of target) {
    system.print(_stdlib.asString(x));
  }
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "156");
  });

  test('Pass_Array', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var it set to asArray([1, 3, 6])
  call printEach(it)
end main
  
procedure printEach(target as Iter<of Int>)
  each x in target
    print x
  end each
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var it = _stdlib.asArray(system.list([1, 3, 6]));
  printEach(it);
}

function printEach(target) {
  for (const x of target) {
    system.print(_stdlib.asString(x));
  }
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "136");
  });

  test('Pass_String', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var s set to "Foo"
  call printEach(s)
end main
  
procedure printEach(target as Iter<of Char>)
  each x in target
    print x
  end each
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var s = "Foo";
  printEach(s);
}

function printEach(target) {
  for (const x of target) {
    system.print(_stdlib.asString(x));
  }
}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Foo");
  });

  test('Pass_Printing', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var it set to [1, 2, 3, 4, 5, 6, 7]
  call printAsIter(it)
  call printAsList(it)
end main
  
procedure printAsIter(target as Iter<of Int>)
  print target
end procedure
  
procedure printAsList(target as Iter<of Int>)
  var some set to asList(target)
  print some[3..]
end procedure`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
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
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "List [1, 2, 3, 4, 5, 6, 7]List [4, 5, 6, 7]");
  });

  test('Pass_Default', async () => {
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

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.print(_stdlib.asString(f.it));
}

class Foo {
  static defaultInstance = system.defaultClass(Foo, [["it", "Iter<of Int>"]]);
  constructor() {

  }

  it = system.defaultIter();

  asString() {
    return "A Foo";
  }

}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "empty Iter");
  });


  // TODO fails

});