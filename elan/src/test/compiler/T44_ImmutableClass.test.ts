import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T44_ImmutableClass", () => {
  test("Pass_BasicImmutableClass", async () => {
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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo(3));
  system.print(_stdlib.asString(f.p1));
  system.print(_stdlib.asString(f.square()));
}

class Foo {
  static emptyInstance() { return system.defaultClass(Foo, [["p1", "Float"]]);};
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
    await assertObjectCodeExecutes(fileImpl, "39");
  });

  test("Pass_AbstractImmutableClass", async () => {
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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo(3));
  system.print(_stdlib.asString(f.p1));
  system.print(_stdlib.asString(f.square()));
}

class Bar {
  static emptyInstance() { return system.defaultClass(Bar, [["p1", "Float"]]);};
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
  static emptyInstance() { return system.defaultClass(Foo, [["p1", "Float"]]);};
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
    await assertObjectCodeExecutes(fileImpl, "39");
  });

  test("Fail_ProcedureMethod", async () => {
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_ImmutableClassAsFunctionParameter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  print fun(f)
end main

immutable class Foo
  constructor()
  end constructor
  property p1 as Int
end class

function fun(foo as Foo) return Int
    return foo.p1
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.print(_stdlib.asString(fun(f)));
}

class Foo {
  static emptyInstance() { return system.defaultClass(Foo, [["p1", "Int"]]);};
  constructor() {

  }

  p1 = 0;

}

function fun(foo) {
  return foo.p1;
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_ImmutableClassAsProcedureParameter", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  call proc(f)
end main

immutable class Foo
  constructor()
  end constructor
  property p1 as Int
end class

procedure proc(foo as Foo)
    print foo.p1
end procedure
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  proc(f);
}

class Foo {
  static emptyInstance() { return system.defaultClass(Foo, [["p1", "Int"]]);};
  constructor() {

  }

  p1 = 0;

}

function proc(foo) {
  system.print(_stdlib.asString(foo.p1));
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_UpcastImmutableClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  var b set to fun(f)
  print b.p1
end main

abstract immutable class Bar
  abstract property p1 as Int
end class

immutable class Foo inherits Bar
  constructor()
  end constructor
  property p1 as Int
end class

function fun(foo as Foo) return Bar
    return foo
end function
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  var b = fun(f);
  system.print(_stdlib.asString(b.p1));
}

class Bar {
  static emptyInstance() { return system.defaultClass(Bar, [["p1", "Int"]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  asString() {
    return "empty Abstract Class Bar";
  }
}

class Foo {
  static emptyInstance() { return system.defaultClass(Foo, [["p1", "Int"]]);};
  constructor() {

  }

  p1 = 0;

}

function fun(foo) {
  return foo;
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
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Fail_DowncastImmutableClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  var b set to fun(f)
  print b.p1
end main

abstract immutable class Bar
  abstract property p1 as Int
end class

immutable class Foo inherits Bar
  constructor()
  end constructor
  property p1 as Int
end class

function fun(bar as Bar) return Foo
    return bar
end function
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Bar to Foo"]);
  });

  // remaining tests not relevant
  // Fail_ProcedureMethodOnAbstractImmutableClass
  // Fail_AbstractAndImmutableReversed
});
