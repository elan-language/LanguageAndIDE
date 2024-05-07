import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T53_Self', () => {

  test('Pass_DisambiguateParamAndProperty', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo(7)
  print x.p1
end main

class Foo
  constructor(p1 as Float)
    set property.p1 to p1
  end constructor

  property p1 as Float

  function asString() return String
    return ""
  end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo(7));
  system.print(_stdlib.asString(x.p1));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"]]);};
  constructor(p1) {
    this.p1 = p1;
  }

  p1 = 0;

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
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test('Pass_UsingThisAsAnInstance', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  print f.bar()
end main

function doubled(f as Foo) return Float
    return 2 * f.p1
end function

class Foo
    constructor()
        set p1 to 3
    end constructor

    property p1 as Float

    function bar() return Float
        return doubled(this)
    end function

    function asString() return String
        return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.print(_stdlib.asString(f.bar()));
}

function doubled(f) {
  return 2 * f.p1;
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"]]);};
  constructor() {
    this.p1 = 3;
  }

  p1 = 0;

  bar() {
    return doubled(this);
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
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test('Fail_NoSuchProperty', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var x set to new Foo(7)
    print x.p1
end main

class Foo
    constructor(p1 as Float)
        set property.p to p1
    end constructor

    property p1 as Float

    function asString() return String
        return ""
    end function

end class`;



    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Undeclared variable property.p"]);
  });

  test('Fail_MissingSelfCausesCompileErrorDueToAssigningToParam', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var x set to new Foo(7)
    print x.p1
end main

class Foo
    constructor(p1 as Float)
        set p1 to p1
    end constructor

    property p1 as Float

    function asString() return String
        return ""
    end function

end class`;



    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate parameter"]);
  });



});
