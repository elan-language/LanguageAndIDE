import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("This and Property", () => {
  test("Pass_DisambiguateParamAndProperty", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo(7)
  print x.p1
end main

class Foo
  constructor(p1 as Float)
    set property.p1 to p1
  end constructor

  property p1 as Float

  function asString() returns String
    return ""
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let x = system.initialise(await new Foo()._initialise(7));
  await system.printLine(x.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise(p1) {
    this.p1 = p1;
    return this;
  }

  p1 = 0;

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test("Pass_UsingThisAsAnInstance", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print f.bar()
end main

function doubled(f as Foo) returns Float
    return 2 * f.p1
end function

class Foo
    constructor()
        set property.p1 to 3
    end constructor

    property p1 as Float

    function bar() returns Float
        return doubled(this)
    end function

    function asString() returns String
        return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await system.printLine((await f.bar()));
}

async function doubled(f) {
  return 2 * f.p1;
}
global["doubled"] = doubled;

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 3;
    return this;
  }

  p1 = 0;

  async bar() {
    return (await global.doubled(this));
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "6");
  });

  test("Pass_UsingPropertyAsIndex", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print f.bar()
end main

class Foo
  constructor()
    set property.p1 to 1
  end constructor

  property p1 as Int

  function bar() returns Int
    variable lst set to [1, 2]
    return lst[property.p1]
  end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await system.printLine((await f.bar()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 1;
    return this;
  }

  p1 = 0;

  async bar() {
    let lst = system.list([1, 2]);
    return system.safeIndex(lst, this.p1);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "2");
  });

  test("Pass_PrintThis", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call f.bar()
end main

class Foo
  procedure bar()
    print this
  end procedure
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.bar();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  async _initialise() { return this; }
  async bar() {
    await system.printLine(this);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  test("Fail_UsingPropertyAsIndex1", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print f.bar()
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  function bar() returns Int
    variable lst set to [1, 2]
    call lst.setAt(p1, 3)
    return lst[0]
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_NoSuchProperty", async () => {
    const code = `${testHeader}

main
    variable x set to new Foo(7)
    print x.p1
end main

class Foo
    constructor(p1 as Float)
        set property.p to p1
    end constructor

    property p1 as Float

    function asString() returns String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'p' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_MissingSelfCausesCompileErrorDueToAssigningToParam", async () => {
    const code = `${testHeader}

main
    variable x set to new Foo(7)
    print x.p1
end main

class Foo
    constructor(p1 as Float)
        set p1 to p1
    end constructor

    property p1 as Float

    function asString() returns String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "May not re-assign the parameter 'p1'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ThisOutsideClassScope", async () => {
    const code = `${testHeader}

main
  print this
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot use 'this' outside class context.LangRef.html#ThisCompileError",
    ]);
  });
});
