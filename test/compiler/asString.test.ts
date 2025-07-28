import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("asString", () => {
  test("Pass_SimpleExtension", async () => {
    const code = `${testHeader}

main
  variable f set to 1
  print f.asString()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = 1;
  await system.printLine((await _stdlib.asString(f)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_ClassHasNoAsString", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable s set to f.asString()
  print s
end main

class Foo
  constructor()
      set property.p1 to 5
  end constructor

  property p1 as Float

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let s = (await _stdlib.asString(f));
  await system.printLine(s);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  test("Pass_emptyClassAsString", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable p set to f.p1
  variable s set to p.asString()
  print s
end main

class Foo
  constructor()
  end constructor

  property p1 as Foo
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let p = f.p1;
  let s = (await _stdlib.asString(p));
  await system.printLine(s);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  _p1;
  get p1() {
    return this._p1 ??= Foo.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
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

  // this behaviour has changed from c# compiler
  test("Pass_emptyClassReplacesAsString", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable s1 set to f.asString()
  variable p set to f.p1
  variable s2 set to p.asString()
  print s1
  print s2
end main

class Foo
  constructor()
  end constructor

  property p1 as Foo

  function asString() returns String
     return "Custom asString"
end function 
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let s1 = (await f.asString());
  let p = f.p1;
  let s2 = (await p.asString());
  await system.printLine(s1);
  await system.printLine(s2);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  _p1;
  get p1() {
    return this._p1 ??= Foo.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  async asString() {
    return "Custom asString";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Custom asStringCustom asString");
  });

  test("Pass_AsStringMayBeCalled", async () => {
    const code = `${testHeader}

main
    variable f set to new Foo()
    variable s set to f.asString()
    print s
end main

class Foo
    constructor()
        set property.p1 to 5
        set property.p2 to "Apple"
    end constructor

    property p1 as Float

    property p2 as String

    function asString() returns String
         return property.p2
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let s = (await f.asString());
  await system.printLine(s);
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

  test("Pass_AsStringCalledWhenObjectPrinted", async () => {
    const code = `${testHeader}

main
    variable f set to new Foo()
    print f
end main

class Foo
    constructor()
        set property.p1 to 5
        set property.p2 to "Apple"
    end constructor

    property p1 as Float

    property p2 as String

    function asString() returns String
         return property.p2
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await system.printLine(f);
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

  test("Pass_AsStringOnVariousDataTypes", async () => {
    const code = `${testHeader}

main
    variable l set to {1,2,3}
    variable sl set to l.asString()
    print sl
    variable a set to {1,2,3}.asList()
    variable sa set to a.asString()
    print sa
    variable d set to ["a":1, "b":3, "z":10]
    variable sd set to d.asString()
    print sd
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let l = system.listImmutable([1, 2, 3]);
  let sl = (await _stdlib.asString(l));
  await system.printLine(sl);
  let a = system.listImmutable([1, 2, 3]).asList();
  let sa = (await _stdlib.asString(a));
  await system.printLine(sa);
  let d = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  let sd = (await _stdlib.asString(d));
  await system.printLine(sd);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{1, 2, 3}[1, 2, 3][a:1, b:3, z:10]");
  });
});
