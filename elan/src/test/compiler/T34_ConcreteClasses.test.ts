import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";

suite('T34_ConcreteClasses', () => {

  test('Pass_Class_SimpleInstantiation_PropertyAccess_Methods', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo()
  print x.p1
  print x.p2
  print x.asString()
end main

class Foo
  constructor()
      set p1 to 5
  end constructor

  property p1 as Int

  property p2 as String

  function asString() return String
        return ""
  end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo());
  system.print(_stdlib.asString(x.p1));
  system.print(_stdlib.asString(x.p2));
  system.print(_stdlib.asString(x.asString()));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Int"], ["p2", "String"]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  p2 = "";

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
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test('Pass_ConstructorWithParm', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo(7, "Apple")
  print x.p1
  print x.p2
end main

class Foo
    constructor(p_1 as Number,  p_2 as String)
        set p1 to p_1
        set p2 to p_2
    end constructor

    property p1 as Number
    property p2 as String
    function asString() return String
        return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo(7, "Apple"));
  system.print(_stdlib.asString(x.p1));
  system.print(_stdlib.asString(x.p2));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Number"], ["p2", "String"]]);};
  constructor(p_1, p_2) {
    this.p1 = p_1;
    this.p2 = p_2;
  }

  p1 = 0;

  p2 = "";

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
    await assertObjectCodeExecutes(fileImpl, "7Apple");
  });

  test('Pass_ReferenceProperty', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var foo set to new Foo()
  var bar set to foo.bar
  print bar.p1
  print bar.p2
  var foo2 set to bar.foo
  var bar2 set to foo2.bar
  print bar2.p1
  print bar2.p2
end main

class Foo
  constructor()
  end constructor

  property bar as Bar

  function asString() return String
        return ""
  end function

end class

class Bar
  constructor()
  end constructor

  property p1 as Int

  property p2 as String

  property foo as Foo

  function asString() return String
        return ""
  end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var foo = system.initialise(new Foo());
  var bar = foo.bar;
  system.print(_stdlib.asString(bar.p1));
  system.print(_stdlib.asString(bar.p2));
  var foo2 = bar.foo;
  var bar2 = foo2.bar;
  system.print(_stdlib.asString(bar2.p1));
  system.print(_stdlib.asString(bar2.p2));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["bar", "Bar"]]);};
  constructor() {

  }

  _bar;
  get bar() {
    return this._bar ??= Bar.defaultInstance();
  }
  set bar(bar) {
    this._bar = bar;
  }

  asString() {
    return "";
  }

}

class Bar {
  static defaultInstance() { return system.defaultClass(Bar, [["p1", "Int"], ["p2", "String"], ["foo", "Foo"]]);};
  constructor() {

  }

  p1 = 0;

  p2 = "";

  _foo;
  get foo() {
    return this._foo ??= Foo.defaultInstance();
  }
  set foo(foo) {
    this._foo = foo;
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
    await assertObjectCodeExecutes(fileImpl, "00");
  });

  test('Fail_NoConstructor', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo

  property p1 as Int
  property p2 as String
  
  function asString() return String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_InitialisePropertyInLine', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo

    property p1 as Int set to 3
    property p2 as String
   
    function asString() return String
        return ""
    end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_AttemptToModifyAPropertyDirectly', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo()
  set x.p1 to 3
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  function asString() return String
      return ""
  end function
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_OverloadedConstructor', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo
  constructor()
  end constructor

  constructor(val as Int)
      set p1 to val
  end constructor

  property p1 as Int

  function asString() return String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_InstantiateWithoutRequiredArgs', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo()
end main

class Foo
  constructor(val as Int)
      set p1 to val
  end constructor

  property p1 as Int

  function asString() return String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Missing parameter 0"]);
  });

  test('Fail_InstantiateWithWrongArgType', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo(7.1)
end main

class Foo
  constructor(val as Int)
      set p1 to val
  end constructor

  property p1 as Int

  function asString() return String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Cannot assign Number to Int "]);
  });

  test('Fail_SupplyingArgumentNotSpecified', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo(7)
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  function asString() return String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Too many parameters 0"]);
  });

  test('Fail_MissingNewOnInstantiation', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to Foo()
  print x.p1
  print x.p2
  print x.asString()
end main

class Foo
  constructor()
      set p1 to 5
  end constructor

  property p1 as Int

  property p2 as String

  function asString() return String
      return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

});