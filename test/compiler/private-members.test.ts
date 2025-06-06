import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Private Members", () => {
  test("Pass_PrivatePropertyCanBeDeclared", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  print x
end main

class Foo
    constructor()
        set property.p1 to 5
        set property.p2 to "Apple"
    end constructor

    property p1 as Float

    private property p2 as String

    function asString() returns String
         return property.p2
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  await system.printLine(x);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", ""]]);};

  async _initialise() {
    this.p1 = 5;
    this.p2 = "Apple";
    return this;
  }

  p1 = 0;

  p2 = "";

  async asString() {
    return this.p2;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_PrivateProcedureCanBeDeclared", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
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

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise());
  await x.testSetP1(5);
  await system.printLine(x.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {

    return this;
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_PrivateFunctionCanBeDeclared", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print f.testFf("test")
end main
  
class Foo
  constructor()  
  end constructor
  
  private function ff(f as String) returns String
    return f
  end function
  
  function testFf(f as String) returns String
    return ff(f)
  end function
  
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await system.printLine((await f.testFf("test")));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async ff(f) {
    return f;
  }

  async testFf(f) {
    return (await this.ff(f));
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "test");
  });

  test("Fail_PrivatePropertyCannotBeAccessed", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable s set to f.p2
end main

class Foo
    constructor()
        set property.p1 to 5
        set property.p2 to "Apple"
    end constructor

    property p1 as Float

    private property p2 as String

    function asString() returns String
         return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot reference private member 'p2'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PrivatePropertyCannotBeAccessedViaAbstract", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable s set to f.p2
end main

abstract class Bar
  private property p2 as String
end class

class Foo inherits Bar
    constructor()
      set property.p1 to 5
    end constructor

    property p1 as Float
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot reference private member 'p2'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PrivateProcedureCannotBeAccessed", async () => {
    const code = `${testHeader}

main
  variable foo set to new Foo()
  call foo.setP1(5)
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  private procedure setP1(a as Int)
    set property.p1 to a
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot reference private member 'setP1'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PrivateFunctionCannotBeAccessed", async () => {
    const code = `${testHeader}

main
  variable foo set to new Foo()
  variable a set to foo.ff()
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  private function ff() returns Int
    return p1
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot reference private member 'ff'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PrivatePropertyCannotBePrinted", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print f.p2
end main

class Foo
    constructor()
        set property.p1 to 5
        set property.p2 to "Apple"
    end constructor

    property p1 as Float

    private property p2 as String

    function asString() returns String
         return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot reference private member 'p2'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_PrivateFunctionCannotBePrinted", async () => {
    const code = `${testHeader}

main
  variable foo set to new Foo()
  print foo.ff()
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  private function ff() returns Int
    return p1
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot reference private member 'ff'.LangRef.html#compile_error",
    ]);
  });
});
