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

suite("Private Members", () => {
  test("Pass_PrivatePropertyCanBeDeclared", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to new Foo()
  print x
end main

class Foo
    constructor()
        set property.p1 to 5
        set property.p2 to "Apple"
    end constructor

    property p1 as Float

    private property p2 as String

    function asString() return String
         return p2
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo());
  system.printLine(_stdlib.asString(x));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};
  constructor() {
    this.p1 = 5;
    this.p2 = "Apple";
  }

  p1 = 0;

  p2 = "";

  asString() {
    return this.p2;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_PrivateProcedureCanBeDeclared", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var x set to new Foo()
  call x.testSetP1(5)
  print x.p1
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  private procedure setP1(a as Int)
    set property.p1 to a
  end procedure

  procedure testSetP1(a as Int)
    call setP1(a)
  end procedure

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo());
  await x.testSetP1(5);
  system.printLine(_stdlib.asString(x.p1));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};
  constructor() {

  }

  p1 = 0;

  async setP1(a) {
    this.p1 = a;
  }

  async testSetP1(a) {
    await this.setP1(a);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_PrivateFunctionCanBeDeclared", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  print f.testFf("test")
end main
  
class Foo
  constructor()  
  end constructor
  
  private function ff(f as String) return String
    return f
  end function
  
  function testFf(f as String) return String
    return ff(f)
  end function
  
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.printLine(_stdlib.asString(f.testFf("test")));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  constructor() {

  }

  ff(f) {
    return f;
  }

  testFf(f) {
    return this.ff(f);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "test");
  });

  test("Fail_PrivatePropertyCannotBeAccessed", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  var s set to f.p2
end main

class Foo
    constructor()
        set property.p1 to 5
        set property.p2 to "Apple"
    end constructor

    property p1 as Float

    private property p2 as String

    function asString() return String
         return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot reference private property p2"]);
  });

  test("Fail_PrivatePropertyCannotBePrinted", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan Beta 2 valid

main
  var f set to new Foo()
  print f.p2
end main

class Foo
    constructor()
        set property.p1 to 5
        set property.p2 to "Apple"
    end constructor

    property p1 as Float

    private property p2 as String

    function asString() return String
         return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot reference private property p2"]);
  });
});
