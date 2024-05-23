import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T55_asString", () => {
  test("Pass_SimpleExtension", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to 1
  print f.asString()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = 1;
  system.print(_stdlib.asString(_stdlib.asString(f)));
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
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_ClassHasNoAsString", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  var s set to f.asString()
  print s
end main

class Foo
  constructor()
      set p1 to 5
  end constructor

  property p1 as Float

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  var s = _stdlib.asString(f);
  system.print(_stdlib.asString(s));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

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
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  test("Pass_DefaultClassAsString", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  var p set to f.p1
  var s set to p.asString()
  print s
end main

class Foo
  constructor()
  end constructor

  property p1 as Foo
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  var p = f.p1;
  var s = _stdlib.asString(p);
  system.print(_stdlib.asString(s));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Foo"]]);};
  constructor() {

  }

  _p1;
  get p1() {
    return this._p1 ??= Foo.defaultInstance();
  }
  set p1(p1) {
    this._p1 = p1;
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
    await assertObjectCodeExecutes(fileImpl, "a Foo");
  });

  // this behaviour has changed from c# compiler
  test("Pass_DefaultClassReplacesAsString", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  var s1 set to f.asString()
  var p set to f.p1
  var s2 set to p.asString()
  print s1
  print s2
end main

class Foo
  constructor()
  end constructor

  property p1 as Foo

  function asString() return String
     return "Custom asString"
end function 
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  var s1 = f.asString();
  var p = f.p1;
  var s2 = p.asString();
  system.print(_stdlib.asString(s1));
  system.print(_stdlib.asString(s2));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Foo"]]);};
  constructor() {

  }

  _p1;
  get p1() {
    return this._p1 ??= Foo.defaultInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  asString() {
    return "Custom asString";
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
    await assertObjectCodeExecutes(fileImpl, "Custom asStringCustom asString");
  });

  test("Pass_AsStringMayBeCalled", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var f set to new Foo()
    var s set to f.asString()
    print s
end main

class Foo
    constructor()
        set p1 to 5
        set p2 to "Apple"
    end constructor

    property p1 as Float

    property p2 as String

    function asString() return String
         return p2
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  var s = f.asString();
  system.print(_stdlib.asString(s));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"], ["p2", "String"]]);};
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
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_AsStringCalledWhenObjectPrinted", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var f set to new Foo()
    print f
end main

class Foo
    constructor()
        set p1 to 5
        set p2 to "Apple"
    end constructor

    property p1 as Float

    property p2 as String

    function asString() return String
         return p2
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.print(_stdlib.asString(f));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"], ["p2", "String"]]);};
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
    await assertObjectCodeExecutes(fileImpl, "Apple");
  });

  test("Pass_AsStringUsingDefaultHelper", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var f set to new Foo()
    print f
end main

class Foo
    constructor()
        set p1 to 5
        set p2 to "Apple"
    end constructor

    property p1 as Float

    property p2 as String

    function asString() return String
      return typeAndProperties(this)
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.print(_stdlib.asString(f));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"], ["p2", "String"]]);};
  constructor() {
    this.p1 = 5;
    this.p2 = "Apple";
  }

  p1 = 0;

  p2 = "";

  asString() {
    return _stdlib.typeAndProperties(this);
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
    await assertObjectCodeExecutes(fileImpl, 'Foo ["p1":5, "p2":Apple]');
  });

  test("Pass_AsStringOnVariousDataTypes", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var l set to {1,2,3}
    var sl set to l.asString()
    print sl
    var a set to {1,2,3}.asArray()
    var sa set to a.asString()
    print sa
    var d set to {"a":1, "b":3, "z":10}
    var sd set to d.asString()
    print sd
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var l = system.list([1, 2, 3]);
  var sl = _stdlib.asString(l);
  system.print(_stdlib.asString(sl));
  var a = _stdlib.asArray(system.list([1, 2, 3]));
  var sa = _stdlib.asString(a);
  system.print(_stdlib.asString(sa));
  var d = {"a" : 1, "b" : 3, "z" : 10};
  var sd = _stdlib.asString(d);
  system.print(_stdlib.asString(sd));
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
    await assertObjectCodeExecutes(
      fileImpl,
      "ImmutableList [1, 2, 3]ArrayList [1, 2, 3]Dictionary [a:1, b:3, z:10]",
    );
  });
});
