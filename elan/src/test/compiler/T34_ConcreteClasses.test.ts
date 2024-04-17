import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

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
  static defaultInstance = system.defaultClass(Foo, [["p1", "Int"], ["p2", "String"]]);
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

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

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
    constructor(p_1 as Int,  p_2 as String)
        set p1 to p_1
        set p2 to p_2
    end constructor

    property p1 as Int
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
  static defaultInstance = system.defaultClass(Foo, [["p1", "Int"], ["p2", "String"]]);
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

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7Apple");
  });

  test('Fail_NoConstructor', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo

  property p1 Int
  property p2 String
  
  function asString() as String
      return """"
  end function

end class`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_InitialisePropertyInLine', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo

    property p1 Int set to 3
    property p2 String
   
    function asString() as String
        return """"
    end function

end class`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_AttemptToModifyAPropertyDirectly', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo()
  set x.p1 to 3
end main

class Foo
  constructor()
  end constructor

  property p1 Int

  function asString() as String
      return """"
  end function
end class`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_OverloadedConstructor', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

class Foo
  constructor()
  end constructor

  constructor(val Int)
      set p1 to val
  end constructor

  property p1 Int

  function asString() as String
      return """"
  end function

end class`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_InstantiateWithoutRequiredArgs', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo()
end main

class Foo
  constructor(val Int)
      set p1 to val
  end constructor

  property p1 Int

  function asString() as String
      return """"
  end function

end class`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_InstantiateWithWrongArgType', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo(7.1)
end main

class Foo
  constructor(val Int)
      set p1 to val
  end constructor

  property p1 Int

  function asString() as String
      return """"
  end function

end class`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_SupplyingArgumentNotSpecified', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo(7)
end main

class Foo
  constructor()
  end constructor

  property p1 Int

  function asString() as String
      return """"
  end function

end class`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_MissingNewOnInstantiation', () => {
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
  property p1 Int

  property p2 String

  function asString() as String
      return """"
  end function

end class`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

});