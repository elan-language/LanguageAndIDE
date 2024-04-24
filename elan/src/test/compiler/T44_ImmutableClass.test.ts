import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T43_Inheritance', () => {

  test('Pass_BasicImmutableClass', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo(3)
  print f.p1
  print f.square()
end main

immutable class Foo
    constructor(p1 as Int)
        set property.p1 to p1
    end constructor
    property p1 as Int
    function square() return Int
        return p1 * p1
    end function
    function asString() return String
        return ""
    end function
end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo(3));
  system.print(_stdlib.asString(f.p1));
  system.print(_stdlib.asString(f.square()));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Int"]]);};
  constructor(p1) {
    this.p1 = p1;
  }

  p1 = 0;

  square() {
    return this.p1 * this.p1;
  }

  asString() {
    return "";
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "39");
  });

  test('Pass_AbstractImmutableClass', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo(3)
  print f.p1
  print f.square()
end main

abstract immutable class Bar
  abstract property p1 as Int
  abstract function square() return Int
end class

immutable class Foo inherits Bar
    constructor(p1 as Int)
        set property.p1 to p1
    end constructor
    property p1 as Int
    function square() return Int
        return p1 * p1
    end function 
    function asString() return String
        return ""
    end function
end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo(3));
  system.print(_stdlib.asString(f.p1));
  system.print(_stdlib.asString(f.square()));
}

class Bar {
  static defaultInstance() { return system.defaultClass(Bar, [["p1", "Int"]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  square() {
    return 0;
  }

  asString() {
    return "empty Abstract Class Bar";
  }
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Int"]]);};
  constructor(p1) {
    this.p1 = p1;
  }

  p1 = 0;

  square() {
    return this.p1 * this.p1;
  }

  asString() {
    return "";
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "39");
  });

  

});