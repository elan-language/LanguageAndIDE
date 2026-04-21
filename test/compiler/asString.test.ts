import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Profile } from "../../src/ide/frames/profile";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("toString", () => {
  test("Pass_SimpleExtension", async () => {
    const code = `${testHeader}

main
  variable f set to 1
  call printNoLine(f.toString())
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = 1;
  await _stdlib.printNoLine((await _stdlib.toString(f)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_EmptyClassIsCreatedWithDefaultConstructorAndToString", async () => {
    const code = `${testHeader}

main

end main

class Foo

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "undefined";
  }

}
return [main, _tests];}`;

    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
  });

  test("Pass_emptyClassAsString", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable p set to f.p1
  variable s set to p.toString()
  call printNoLine(s)
end main

class Foo
  constructor()
    set this.p1 to new Maybe<of Foo>()
  end constructor
  function toString() returns String
    return ""
  end function

  property p1 as Maybe<of Foo>
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let p = f.p1;
  let s = (await _stdlib.toString(p));
  await _stdlib.printNoLine(s);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    this.p1 = system.initialise(await new _stdlib.Maybe()._initialise());
    return this;
  }

  async toString() {
    return "";
  }

  elan_p1;
  get p1() {
    return this.elan_p1 ??= system.initialise(_stdlib.Maybe.emptyInstance());
  }
  set p1(p1) {
    this.elan_p1 = p1;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "a Maybe");
  });

  // this behaviour has changed from c# compiler
  test("Pass_emptyClassReplacesAsString", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable s1 set to f.toString()
  variable p set to f.p1
  variable s2 set to p.toString()
  call printNoLine(s1)
  call printNoLine(s2)
end main

class Foo
  constructor()
    set this.p1 to new Maybe<of Foo>()
  end constructor

  property p1 as Maybe<of Foo>

  function toString() returns String
     return "Custom toString"
  end function 
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let s1 = (await f.toString());
  let p = f.p1;
  let s2 = (await _stdlib.toString(p));
  await _stdlib.printNoLine(s1);
  await _stdlib.printNoLine(s2);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {
    this.p1 = system.initialise(await new _stdlib.Maybe()._initialise());
    return this;
  }

  elan_p1;
  get p1() {
    return this.elan_p1 ??= system.initialise(_stdlib.Maybe.emptyInstance());
  }
  set p1(p1) {
    this.elan_p1 = p1;
  }

  async toString() {
    return "Custom toString";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Custom toStringa Maybe");
  });

  test("Pass_AsStringMayBeCalled", async () => {
    const code = `${testHeader}

main
    variable f set to new Foo()
    variable s set to f.toString()
    call printNoLine(s)
end main

class Foo
    constructor()
        set this.p1 to 5
        set this.p2 to "Apple"
    end constructor

    property p1 as Float

    property p2 as String

    function toString() returns String
         return this.p2
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let s = (await f.toString());
  await _stdlib.printNoLine(s);
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

  async toString() {
    return this.p2;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
    call printNoLine(f)
end main

class Foo
    constructor()
        set this.p1 to 5
        set this.p2 to "Apple"
    end constructor

    property p1 as Float

    property p2 as String

    function toString() returns String
         return this.p2
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await _stdlib.printNoLine(f);
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

  async toString() {
    return this.p2;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_AsStringOnVariousDataTypes", async () => {
    const code = `${testHeader}

main
    variable l set to [1,2,3]
    variable sl set to l.toString()
    call printNoLine(sl)
    variable a set to [1,2,3]
    variable sa set to a.toString()
    call printNoLine(sa)
    variable d set to ["a":1, "b":3, "z":10]
    variable sd set to d.toString()
    call printNoLine(sd)
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let l = system.list([1, 2, 3]);
  let sl = (await _stdlib.toString(l));
  await _stdlib.printNoLine(sl);
  let a = system.list([1, 2, 3]);
  let sa = (await _stdlib.toString(a));
  await _stdlib.printNoLine(sa);
  let d = system.dictionary([["a", 1], ["b", 3], ["z", 10]]);
  let sd = (await _stdlib.toString(d));
  await _stdlib.printNoLine(sd);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "[1, 2, 3][1, 2, 3][a:1, b:3, z:10]");
  });
});
