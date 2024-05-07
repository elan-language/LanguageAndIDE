import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T44_ImmutableClass', () => {

  test('Pass_BasicImmutableClass', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo(3)
  print f.p1
  print f.square()
end main

immutable class Foo
    constructor(p1 as Float)
        set property.p1 to p1
    end constructor
    property p1 as Float
    function square() return Float
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
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"]]);};
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
  abstract property p1 as Float
  abstract function square() return Float
end class

immutable class Foo inherits Bar
    constructor(p1 as Float)
        set property.p1 to p1
    end constructor
    property p1 as Float
    function square() return Float
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
  static defaultInstance() { return system.defaultClass(Bar, [["p1", "Float"]]);};
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
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"]]);};
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

  ignore_test('Fail_ProcedureMethod', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

immutable class Foo
  constructor(p1 as Int)
    set property.p1 to p1
  end constructor

  property p1 as Int

  procedure setP1(p1 as Int)
    set property.p1 to p1
  end procedure

  function asString() return String
    return ""
  end function
end class`;



    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  // remaining tests not relevant
  // Fail_ProcedureMethodOnAbstractImmutableClass
  // Fail_AbstractAndImmutableReversed

});